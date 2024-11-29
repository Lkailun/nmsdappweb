import { FC, ReactElement, useEffect, useMemo, useState } from 'react';

import css from '../styles/swapModal.module.scss';
import { message, Modal } from 'antd';
import Button from '@/components/Button';
import { $BigNumber, $clearNoNum, $filterNumber, $onlyNumber } from '@/utils/met';
import { useAuth, usePrice, useUser } from '@/state/user/hooks';
import { useProcessModal } from '@/state/base/hooks';
import { useWallet, useSign } from '@/hooks';
import Server from '@/service/api';
import CountUp from 'react-countup';
import moment from 'moment';
import useTransfer from '@/hooks/useTransfer';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import BigNumber from 'bignumber.js';

type IProps = {
    onClose: Function;
};
const SwapModal: FC<IProps> = ({ onClose }): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [{ userinfo }, { updateUser }] = useUser();

    const [loading, setLoading] = useState<boolean>(false);
    const { account } = useWallet();
    const price = usePrice();
    const [auth, handAuth] = useAuth();
    const signMessage = useSign();

    const [amount, setAmount] = useState<string | number>('');
    const [check, setCheck] = useState<number>(0);
    const roteList: any[] = [
        { label: '50%', value: 0.5 },
        { label: '100%', value: 1 }
    ];
    const balance = useMemo(() => userinfo.nmmbalance, [userinfo]);
    const gotAmount = useMemo(
        () =>
            Number(
                new BigNumber(
                    $BigNumber(amount || 0)
                        .multipliedBy(price)
                        .toFixed(4, 1)
                )
            ),
        [price, amount]
    );

    const btnDisable = useMemo(() => {
        if (!amount || $BigNumber(balance).isZero()) return true;
        return $BigNumber(amount).gt(balance);
    }, [balance, amount]);

    const handSet = (value: number) => {
        setAmount(Number($BigNumber(balance).multipliedBy(value).toFixed(1, 1)));
        setCheck(value);
    };

    const hand = async () => {
        try {
            if ($BigNumber(amount).gt(balance)) throw new Error(t('common:base:InsufficientBalance'));
            setLoading(true);

            const params = {
                address: account!,
                nmmamount: Number(amount)
            };

            let result: any;

            const _message = `Auth NMS at:${Date.now()}`;
            const signature = await signMessage(_message);
            handAuth({ message: _message, signature });
            result = await Server.swapnmmtousdt(params, { message: _message, signature });
            const { code, data, msg }: any = result;
            if (code !== 200) throw new Error(msg);
            updateUser(data);
            message.success(t('common:stake:SwapSuccess'));
            onClose();
        } catch (e: any) {
            message.error(e.message || 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={true} footer={null} onCancel={() => onClose()}>
            <div className={css.view}>
                <header>{t('common:stake:Swap')}</header>

                <div className={css.item}>
                    <div className={css.label}>
                        <div className={css.left}>
                            {t('common:stake:SellNMM')}
                            <img src="/images/stake/point.svg" alt="" />
                        </div>
                        <div className={css.right}>
                            {t('common:stake:NMMBalance')}:
                            <CountUp decimals={1} end={Number(userinfo.nmmbalance)} />
                        </div>
                    </div>
                    <div className={css.input}>
                        <input
                            type="text"
                            value={amount}
                            placeholder={t('common:stake:InputSellNMM')}
                            onChange={(e: any) => setAmount($clearNoNum(e.target.value))}
                        />
                        <div className={css.rate}>
                            {roteList.map((ele) => (
                                <div key={ele.value} className={check === ele.value ? css.active : ''} onClick={() => handSet(ele.value)}>
                                    {ele.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <img className={css.got} src="/images/stake/got.png" alt="" />
                <div className={classNames(css.item, css.last)}>
                    <div className={css.label}>
                        <div className={css.left}>
                            {t('common:stake:ExpectedGetUSDT')}
                            <img src="/images/symbol/USDT.svg" alt="" />
                        </div>
                        <div className={css.right}>
                            {t('common:stake:USDTBalance')}:
                            <CountUp decimals={1} end={Number(userinfo.usdtbalance)} />
                        </div>
                    </div>
                    <div className={css.input}>≈ {gotAmount}</div>
                </div>

                <Button disabled={btnDisable} loading={loading} onClick={() => hand()}>
                    {t('common:stake:Swap')}
                </Button>
            </div>
        </Modal>
    );
};

export default SwapModal;
