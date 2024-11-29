import { FC, ReactElement, useEffect, useMemo, useState } from 'react';

import css from '../styles/header.module.scss';
import { useUser, useUserRecords } from '@/state/user/hooks';
import CountUp from 'react-countup';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { Button } from '@/components';
import { SwapHistoryModal, SwapModal, TransferHistoryModal, TransferModal } from '../modal';

const Header: FC = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [show, setShow] = useState<boolean>(false);
    const [showSwap, setShowSwap] = useState<boolean>(false);
    const [showSwapHistory, setShowSwapHistory] = useState<boolean>(false);
    const [showTransferHistory, setShowTransferHistory] = useState<boolean>(false);

    const [{ userinfo }] = useUser();
    const [getUserRecords] = useUserRecords();

    useEffect(() => {
        if (userinfo.address) {
            getUserRecords();
        }
    }, [userinfo.address]);

    return (
        <>
            <div className={classNames(css.view, 'animate__animated animate__zoomIn')}>
                <div className={css.item}>
                    <div className={css.title}>
                        积分余额 <img src="/images/stake/white-point.svg" alt="" />
                    </div>
                    <h5>
                        <CountUp decimals={1} end={Number(userinfo.integralbalance)} />
                    </h5>

                    <Button onClick={() => setShow(true)}>
                        <img src="/images/stake/transfer.svg" alt="" /> 转移
                    </Button>
                    <span onClick={() => setShowTransferHistory(true)}>转移记录</span>
                </div>
                <div className={css.item}>
                    <div className={css.title}>
                        NMM余额 <img src="/images/stake/point.svg" alt="" />
                    </div>
                    <h5>
                        <CountUp decimals={1} end={Number(userinfo.nmmbalance)} />
                    </h5>

                    <Button className={css.recharge} onClick={() => setShowSwap(true)}>
                        <img src="/images/stake/swap.svg" alt="" /> 闪兑
                    </Button>
                    <span onClick={() => setShowSwapHistory(true)}>闪兑记录</span>
                </div>
            </div>
            {show && <TransferModal onClose={() => setShow(false)} />}
            {showSwap && <SwapModal onClose={() => setShowSwap(false)} />}
            {showSwapHistory && <SwapHistoryModal onClose={() => setShowSwapHistory(false)} list={[]} />}
            {showTransferHistory && <TransferHistoryModal onClose={() => setShowTransferHistory(false)} list={[]} />}
        </>
    );
};

export default Header;
