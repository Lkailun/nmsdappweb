import { FC, ReactElement, useState } from 'react';

import css from '../../styles/confirm.module.scss';

import { message, Modal } from 'antd';
import { Button } from '@/components';
import classNames from 'classnames';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'next-i18next';
import { useAuth, useUser } from '@/state/user/hooks';
import { useBtc } from '@/state/game/hooks';
import { useSign } from '@/hooks';
import Server from '@/service/api';
import { omit } from 'lodash';

type IProps = {
    onClose: Function;
    amount: number;
    direction: 'up' | 'down';
};
const ConfirmModal: FC<IProps> = ({ onClose, amount, direction }: IProps): ReactElement => {
    const [loading, setLoading] = useState<boolean>(false);
    const { t }: any = useTranslation<any>(['common']);
    const [{ userinfo }, { updateUser }] = useUser();
    const [{ btcgamerecords }, { updateGameData }] = useBtc();

    const [, handAuth] = useAuth();
    const signMessage = useSign();

    const handStake = async () => {
        try {
            if (BigNumber(amount).gt(userinfo.nmsbalance)) throw new Error(t('common:base:InsufficientBalance'));
            setLoading(true);
            const params = {
                symbol: 'BTC',
                address: userinfo.address,
                amount,
                direction
            };

            let result: any;

            const _message = `Auth NMS at:${Date.now()}`;
            const signature = await signMessage(_message);
            handAuth({ message: _message, signature });
            result = await Server.betrisefall(params, { message: _message, signature });
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
                <img src="/images/rise-fall/confirm_title.png" alt="" />
                <p>我已知悉游戏规则</p>
                <p className={classNames(css.tip, css[direction])}>确定下注{amount}NMS看涨</p>
                <p className={css.fontWeight}>下一根3分钟K线</p>
                <Button onClick={handStake}>确认下注</Button>
            </section>
        </Modal>
    );
};

export default ConfirmModal;
