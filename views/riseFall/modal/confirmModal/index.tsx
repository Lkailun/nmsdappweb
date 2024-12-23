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
    const [{}, { updateGameData }] = useBtc();

    const [auth] = useAuth();

    const handStake = async () => {
        try {
            if (BigNumber(amount).gt(userinfo.nmsbalance)) throw new Error(t('common:base:InsufficientNMSBalance'));
            setLoading(true);
            const params = {
                symbol: 'BTC',
                address: userinfo.address,
                amount,
                direction
            };

            let result: any;

            result = await Server.betrisefall(params, auth);
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
            <h2>{t('common:game:ConfirmThisStake')}</h2>
            <section>
                <img src="/images/rise-fall/confirm_title.png" alt="" />
                <p>{t('common:game:IKnowTheGameRules')}</p>
                <p className={classNames(css.tip, css[direction])}>{t('common:game:ConfirmThisStake')} {amount}NMS {direction === 'up' ? t('common:game:Rise') : t('common:game:Fall')}</p>
                <p className={css.fontWeight}>{t('common:game:Next3MinuteKLine')}</p>
                <Button onClick={handStake}>{t('common:game:ConfirmThisStake')}</Button>
            </section>
        </Modal>
    );
};

export default ConfirmModal;
