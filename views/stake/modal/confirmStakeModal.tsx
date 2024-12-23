import { FC, ReactElement, useState } from 'react';

import css from '../styles/confirmStake.module.scss';
import { message, Modal } from 'antd';
import { Button } from '@/components';
import { $BigNumber } from '@/utils/met';
import { useAuth, useUser } from '@/state/user/hooks';
import { useSign, useWallet } from '@/hooks';
import Server from '@/service/api';
import { useTranslation } from 'next-i18next';

type IProps = {
    onClose: Function;
    amount: number;
};
const ConfirmStakeModal: FC<IProps> = ({ onClose, amount }: IProps): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [loading, setLoading] = useState<boolean>(false);

    const [{ userinfo }, { updateUser }] = useUser();
    const [auth, handAuth] = useAuth();
    const { account } = useWallet();
    const signMessage = useSign();

    const handStake = async () => {
        try {
            if ($BigNumber(amount * 100).gt(userinfo.usdtbalance)) throw new Error(t('common:base:InsufficientBalance'));
            if ($BigNumber(amount * 100).gt(userinfo.integralbalance)) throw new Error(t('common:base:InsufficientBalance'));
            setLoading(true);

            const params = {
                address: account!,
                amount: Number(amount * 100)
            };

            let result: any;

            const _message = `Auth NMS at:${Date.now()}`;
            const signature = await signMessage(_message);
            handAuth({ message: _message, signature });
            result = await Server.stakingintegral(params, { message: _message, signature });
            const { code, data, msg }: any = result;
            if (code !== 200) throw new Error(msg);
            updateUser(data);
            message.success('质押成功');
            onClose();
        } catch (e: any) {
            message.error(e.message || 'error');
        } finally {
            setLoading(false);
        }
    };
    return (
        <Modal open={true} footer={null} className={css.view} onCancel={() => onClose()}>
            <h2>{t('common:stake:ConfirmOperation')}</h2>
            <section>
                <p>{t('common:stake:IHaveKnownTheStakeRule')}</p>
                <p className={css.tip}>
                    {100 * amount} USDT + {100 * amount} {t('common:stake:Integral')}
                </p>
                <p>{t('common:stake:GoStake')}</p>
                <Button onClick={handStake} loading={loading}>
                    {t('common:stake:ConfirmStake')}
                </Button>
            </section>
        </Modal>
    );
};

export default ConfirmStakeModal;
