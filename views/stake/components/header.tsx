import { FC, ReactElement, useMemo, useState } from 'react';

import css from '../styles/header.module.scss';
import { useLogs, usePrice, useUser } from '@/state/user/hooks';
import { $BigNumber, $toFixed } from '@/utils/met';
import CountUp from 'react-countup';
import { useTranslation } from 'next-i18next';
import moment from 'moment';
import classNames from 'classnames';
import { Button } from '@/components';
import { SwapHistoryModal, SwapModal, TransferHistoryModal, TransferModal } from '../modal';
import { message } from 'antd';

const Header: FC = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [show, setShow] = useState<boolean>(false);
    const [showSwap, setShowSwap] = useState<boolean>(false);
    const [showSwapHistory, setShowSwapHistory] = useState<boolean>(false);
    const [showTransferHistory, setShowTransferHistory] = useState<boolean>(false);
    const [transferType, setTransferType] = useState<string>('in');

    const [{ userinfo }] = useUser();
    const price = usePrice();
    const logs = useLogs();

    const handTransfer = (type: string) => {
        setShow(true);
        setTransferType(type);
    };

    return (
        <>
            <div className={classNames(css.view, 'animate__animated animate__zoomIn')}>
                <div className={css.item}>
                    <div className={css.title}>
                        积分余额 <img src="/images/stake/white-point.svg" alt="" />
                    </div>
                    <h5>
                        <CountUp decimals={1} end={100} />
                    </h5>

                    <Button onClick={() => setShow(true)}>
                        <img src="/images/stake/transfer.svg" alt="" /> 转移
                    </Button>
                    <span onClick={() => setShowTransferHistory(true)}>转移记录</span>
                </div>
                <div className={css.item}>
                    <div className={css.title}>
                        USDT余额 <img src="/images/stake/point.svg" alt="" />
                    </div>
                    <h5>
                        <CountUp decimals={1} end={100} />
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
