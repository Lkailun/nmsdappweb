import { FC, ReactElement, useEffect, useMemo, useRef, useState } from 'react';

import css from '../styles/transferModal.module.scss';
import { message, Modal } from 'antd';
import Button from '@/components/Button';
import { $BigNumber, $clearNoNum, $filterNumber, $onlyNumber } from '@/utils/met';
import { useAuth, useUser } from '@/state/user/hooks';
import { useProcessModal } from '@/state/base/hooks';
import { useWallet, useSign, useBalance } from '@/hooks';
import Server from '@/service/api';
import CountUp from 'react-countup';
import moment from 'moment';
import useTransfer from '@/hooks/useTransfer';
import { useTranslation } from 'react-i18next';

type IProps = {
    onClose: Function;
    type: string;
};
const TransferModal: FC<IProps> = ({ onClose, type }): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [{ userinfo, platforminfo }, { updateUser }] = useUser();
    const [, { handProcessModal, handMaxProcessTime }] = useProcessModal();
    const [, getBalance] = useBalance();
    const { chainId } = useWallet();

    const [symbol, setSymbol] = useState<'USDT' | 'NMS'>('USDT');
    const [showSymbol, setShowSymbol] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const { sendTransfer } = useTransfer();
    const { account } = useWallet();
    const [auth, handAuth] = useAuth();
    const signMessage = useSign();

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const [amount, setAmount] = useState<string | number>('');
    const [check, setCheck] = useState<number>(0);
    const [balanceInfo, setBalanceInfo] = useState<{ NMS: string; USDT: string }>({
        NMS: '--',
        USDT: '--'
    });
    const roteList: any[] = [
        { label: '50%', value: 0.5 },
        { label: '100%', value: 1 }
    ];

    const balance = useMemo(() => balanceInfo[symbol], [balanceInfo, symbol]);

    const btnDisable = useMemo(() => {
        if (!amount || $BigNumber(balance).isZero()) return true;
        return $BigNumber(amount).gt(balance);
    }, [balance, amount]);

    const handSet = (value: number) => {
        setAmount(Number($BigNumber(balance).multipliedBy(value).toFixed(2, 1)));
        setCheck(value);
    };

    const hand = async () => {
        try {
            if ($BigNumber(amount).gt(balance)) throw new Error(t('common:base:InsufficientBalance'));
            setLoading(true);

            let result: any;
            if (type === 'recharge') {
                // handMaxProcessTime(20);
                await sendTransfer({ token: symbol === 'USDT' ? platforminfo.usdttoken : platforminfo.nmstoken, to: platforminfo.receive, value: amount });
            } else {
                const params = {
                    address: account!,
                    tokenname: symbol.toLowerCase(),
                    withdrawamount: Number(amount)
                };

                const _message = `Auth NMS at:${Date.now()}`;
                const signature = await signMessage(_message);
                handAuth({ message: _message, signature });
                result = await Server.withdrawassets(params, { message: _message, signature });
                if (result.code !== 200) throw new Error(result.message);
                updateUser(result.data);
                message.success('提现成功');
            }
            onClose(true, type);
        } catch (e: any) {
            message.error(e.message || 'error');
        } finally {
            setLoading(false);
            handProcessModal(false);
        }
    };

    const handSetSymbol = (token: any) => {
        setSymbol(token);
        setShowSymbol(false);
    };

    const getBalanceInfo = async () => {
        try {
            let info = {
                NMS: userinfo.nmsbalance,
                USDT: userinfo.usdtbalance
            };
            if (type === 'recharge') {
                const [NMS, USDT] = await Promise.all([getBalance(platforminfo.nmstoken), getBalance(platforminfo.usdttoken)]);
                info = { NMS, USDT };
            }
            setBalanceInfo(info);
        } catch (e: any) {
            message.error(e.message || 'error');
        }
    };

    const handleDocumentClick = (event: MouseEvent) => {
        if (showSymbol && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowSymbol(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [showSymbol]);

    useEffect(() => {
        if (chainId && userinfo.address) {
            getBalanceInfo();
        }
    }, [chainId, userinfo.address]);

    return (
        <Modal open={true} footer={null} onCancel={() => onClose()}>
            <div className={css.view}>
                <header>{type === 'recharge' ? '充值' : '提现'}</header>
                <div className={css.input}>
                    <div className={css.symbol} ref={dropdownRef}>
                        <div className={css.cont} onClick={() => setShowSymbol(true)}>
                            <img className={css.token} src={`/images/symbol/${symbol}.svg`} alt="" />
                            <span>{symbol}</span>
                            <img className={css.icon} src="/images/my/down.svg" alt="" />
                        </div>
                        {showSymbol && (
                            <div className={css.dialog}>
                                {['NMS', 'USDT'].map((ele) => (
                                    <div key={ele} onClick={() => handSetSymbol(ele)}>
                                        <img src={`/images/symbol/${ele}.svg`} alt="" />
                                        {ele}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <input type="text" value={amount} placeholder={type === 'recharge' ? '输入充值数量' : '输入提现数量'} onChange={(e: any) => setAmount($clearNoNum(e.target.value))} />
                </div>
                <div className={css.tip}>
                    <div className={css.balance}>
                        我的余额:
                        <CountUp decimals={1} end={Number(balance)} />
                        <img src={`/images/symbol/${symbol}.svg`} alt="" />
                    </div>
                    <div className={css.rate}>
                        {roteList.map((ele) => (
                            <div key={ele.value} className={check === ele.value ? css.active : ''} onClick={() => handSet(ele.value)}>
                                {ele.label}
                            </div>
                        ))}
                    </div>
                </div>
                <Button disabled={btnDisable} loading={loading} onClick={() => hand()}>
                    {type === 'recharge' ? '充值' : '提现'}
                </Button>
            </div>
        </Modal>
    );
};

export default TransferModal;
