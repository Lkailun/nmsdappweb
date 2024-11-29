import { FC, ReactElement, useState } from 'react';

import css from '../../styles/confirm.module.scss';

import { message, Modal } from 'antd';
import { Button } from '@/components';
import { useAuth, useUser } from '@/state/user/hooks';
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';
import { useSign } from '@/hooks';
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
    const [{ luckgameinfo }, { updateGameData }] = useLuck();

    const [, handAuth] = useAuth();
    const signMessage = useSign();

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

            const _message = `Auth NMS at:${Date.now()}`;
            const signature = await signMessage(_message);
            handAuth({ message: _message, signature });
            result = await Server.betluckgame(params, { message: _message, signature });
            const { code, data, msg }: any = result;
            if (code !== 200) throw new Error(msg);
            updateGameData(omit(data, 'userinfo'));
            updateUser(data.userinfo);
            message.success('下注成功');
            onClose();
        } catch (e: any) {
            message.error(e.message || 'error');
        } finally {
            setLoading(false);
        }
    };
    return (
        <Modal open={true} footer={null} className={css.view} onCancel={() => onClose()}>
            <h2>确认下注</h2>
            <section>
                <img src="/images/luckWheel/confirm_title.png" alt="" />
                <p>我已知悉游戏规则</p>
                <p className={css.tip}>确定本局下注{amount}NMS</p>
                <Button onClick={handStake}>确认下注</Button>
            </section>
        </Modal>
    );
};

export default ConfirmModal;
