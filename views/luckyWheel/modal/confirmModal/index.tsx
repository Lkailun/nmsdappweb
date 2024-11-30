import { FC, ReactElement, useState } from 'react';

import css from '../../styles/confirm.module.scss';

import { message, Modal } from 'antd';
import { Button } from '@/components';
import { useAuth, useUser } from '@/state/user/hooks';
import { useTranslation } from 'next-i18next';
import BigNumber from 'bignumber.js';
import Server from '@/service/api';
import { useLuck } from '@/state/game/hooks';
import { omit } from 'lodash';

type IProps = {
    onClose: Function;
    amount: number;
    checkIndex: number;
};
const ConfirmModal: FC<IProps> = ({ onClose, checkIndex, amount }: IProps): ReactElement => {
    const [loading, setLoading] = useState<boolean>(false);
    const { t }: any = useTranslation<any>(['common']);
    const [{ userinfo }, { updateUser }] = useUser();
    const [{}, { updateGameData }] = useLuck();

    const [auth] = useAuth();

    const handStake = async () => {
        try {
            if (BigNumber(amount).gt(userinfo.nmsbalance)) throw new Error(t('common:base:InsufficientBalance'));
            setLoading(true);
            const params = {
                address: userinfo.address,
                amount,
                betindex: checkIndex
            };

            let result: any;

            result = await Server.betluckgame(params, auth);
            const { code, data, msg }: any = result;
            if (code !== 200) throw new Error(msg);
            updateGameData(omit(data, 'userinfo'));
            updateUser(data.userinfo);
            message.success(t('common:game:BetSuccess'));
            onClose();
        } catch (e: any) {
            message.error(e.message || 'error');
        } finally {
            setLoading(false);
        }
    };
    return (
        <Modal open={true} footer={null} className={css.view} onCancel={() => onClose()}>
            <h2>{t('common:game:ConfirmStake')}</h2>
            <section>
                <img src="/images/luckWheel/confirm_title.png" alt="" />
                <p>{t('common:game:IHaveReadTheGameRules')}</p>
                <p className={css.tip}>
                    {t('common:game:ConfirmThisStake')} {amount}NMS
                </p>
                <Button onClick={handStake}>{t('common:game:ConfirmStake')}</Button>
            </section>
        </Modal>
    );
};

export default ConfirmModal;
