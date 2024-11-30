import { FC, ReactElement, useEffect, useMemo, useState } from 'react';

import css from '../styles/header.module.scss';
import { useAssets, useLogs, usePrice, useUser, useUserRecords } from '@/state/user/hooks';
import { $BigNumber, $toFixed } from '@/utils/met';
import CountUp from 'react-countup';
import { useTranslation } from 'next-i18next';
import moment from 'moment';
import classNames from 'classnames';
import { Button } from '@/components';
import { RechargeHistoryModal, RechargeTipsModal, TransferModal, WithdrawalHistoryModal, WithdrawalTipsModal } from '../modal';
import { message } from 'antd';

const Header: FC = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [show, setShow] = useState<boolean>(false);
    const [showRechargeTips, setShowRechargeTips] = useState<boolean>(false);
    const [showWithdrawalTips, setShowWithdrawalTips] = useState<boolean>(false);
    const [showRechargeHistory, setShowRechargeHistory] = useState<boolean>(false);
    const [showWithdrawalHistory, setShowWithdrawalHistory] = useState<boolean>(false);
    const [transferType, setTransferType] = useState<string>('recharge');

    const [{ userinfo }] = useUser();
    const [getUserRecords] = useUserRecords();
    const [loading, refreshAssets] = useAssets();

    const handTransfer = (type: string) => {
        setShow(true);
        setTransferType(type);
    };

    // useEffect(() => {
    //     if (userinfo.address) {
    //         getUserRecords();
    //     }
    // }, [userinfo.address]);

    return (
        <>
            <div className={classNames(css.view, 'animate__animated animate__zoomIn')}>
                <div className={css.item}>
                    <div className={css.title}>
                        {t('common:my:NMSBalance')} <img src="/images/symbol/NMS.svg" alt="" />
                    </div>
                    <h5>
                        <CountUp decimals={5} end={Number(userinfo.nmsbalance)} /> <img className={loading ? css.loading : ''} onClick={() => refreshAssets()} src="/images/my/reload.svg" alt="" />
                    </h5>

                    <Button onClick={() => handTransfer('withdrawal')}>{t('common:my:Withdrawal')}</Button>
                    <span
                        onClick={() => {
                            getUserRecords();
                            setShowWithdrawalHistory(true);
                        }}
                    >
                        {t('common:my:WithdrawalRecord')}
                    </span>
                </div>
                <div className={css.item}>
                    <div className={css.title}>
                        {t('common:my:USDTBalance')} <img src="/images/symbol/USDT.svg" alt="" />
                    </div>
                    <h5>
                        <CountUp decimals={1} end={Number(userinfo.usdtbalance)} /> <img className={loading ? css.loading : ''} onClick={() => refreshAssets()} src="/images/my/reload.svg" alt="" />
                    </h5>

                    <Button className={css.recharge} onClick={() => handTransfer('recharge')}>
                        {t('common:my:Recharge')}
                    </Button>
                    <span
                        onClick={() => {
                            getUserRecords();
                            setShowRechargeHistory(true);
                        }}
                    >
                        {t('common:my:RechargeRecord')}
                    </span>
                </div>
            </div>
            {show && (
                <TransferModal
                    onClose={(flag: any, type: string) => {
                        if (type === 'recharge') {
                            flag && setShowRechargeTips(true);
                        } else {
                            flag && setShowWithdrawalTips(true);
                        }

                        setShow(false);
                    }}
                    type={transferType}
                />
            )}
            {showRechargeHistory && <RechargeHistoryModal onClose={() => setShowRechargeHistory(false)} list={[]} />}
            {showWithdrawalHistory && <WithdrawalHistoryModal onClose={() => setShowWithdrawalHistory(false)} list={[]} />}
            {showRechargeTips && <RechargeTipsModal onClose={() => setShowRechargeTips(false)} />}
            {showWithdrawalTips && <WithdrawalTipsModal onClose={() => setShowWithdrawalTips(false)} />}
        </>
    );
};

export default Header;
