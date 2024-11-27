import { FC, ReactElement, useEffect, useMemo, useState } from 'react';

import css from '../styles/transferModal.module.scss';
import { message, Modal } from 'antd';
import Button from '@/components/Button';
import { $BigNumber, $clearNoNum, $filterNumber, $onlyNumber } from '@/utils/met';
import { useAuth, useUser } from '@/state/user/hooks';
import { useProcessModal } from '@/state/base/hooks';
import { useWallet, useSign } from '@/hooks';
import Server from '@/service/api';
import CountUp from 'react-countup';
import moment from 'moment';
import useTransfer from '@/hooks/useTransfer';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

type IProps = {
    onClose: Function;
};
const TransferModal: FC<IProps> = ({ onClose }): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [{ userinfo, config }, { updateUser }] = useUser();
    const [, { handProcessModal, handMaxProcessTime }] = useProcessModal();

    const [loading, setLoading] = useState<boolean>(false);
    const { sendTransfer } = useTransfer();
    const { account } = useWallet();
    const [auth, handAuth] = useAuth();
    const signMessage = useSign();

    const [address, setAddress] = useState<string>('');
    const [amount, setAmount] = useState<string | number>('');
    const [check, setCheck] = useState<number>(0);
    const roteList: any[] = [
        { label: '50%', value: 0.5 },
        { label: '100%', value: 1 }
    ];
    const balance = useMemo(() => userinfo.bankbalance, [userinfo]);

    const btnDisable = useMemo(() => {
        if (!amount || $BigNumber(balance).isZero() || address.length !== 42) return true;
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
                amount: Number(amount)
            };

            let result: any;

            const _message = `Auth FLOKI at:${Date.now()}`;
            const signature = await signMessage(_message);
            handAuth({ message: _message, signature });
            result = await Server.transfer(params, { message: _message, signature });
            const { code, data, msg }: any = result;
            if (code !== 200) throw new Error(msg);
            updateUser(data);
            message.success('积分转移成功');
            onClose();
        } catch (e: any) {
            message.error(e.message || 'error');
        } finally {
            setLoading(false);
            handProcessModal(false);
        }
    };

    return (
        <Modal open={true} footer={null} onCancel={() => onClose()}>
            <div className={css.view}>
                <header>
                    积分转移 <img src="/images/stake/color-point.svg" alt="" />
                </header>

                <div className={css.item}>
                    <div className={css.label}>目标地址:</div>
                    <div className={css.input}>
                        <input type="text" value={address} placeholder="请输入转入的目标地址" onChange={(e: any) => setAddress(e.target.value)} />
                    </div>
                </div>

                <div className={classNames(css.item, css.last)}>
                    <div className={css.label}>
                        转移数量:
                        <div>
                            积分余额:999
                            <img src="/images/stake/color-point.svg" alt="" />
                        </div>
                    </div>
                    <div className={css.input}>
                        <input type="text" value={amount} placeholder="0.0" onChange={(e: any) => setAmount($clearNoNum(e.target.value))} />
                        <div className={css.rate}>
                            {roteList.map((ele) => (
                                <div key={ele.value} className={check === ele.value ? css.active : ''} onClick={() => handSet(ele.value)}>
                                    {ele.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Button disabled={btnDisable} loading={loading} onClick={() => hand()}>
                    转移
                </Button>
            </div>
        </Modal>
    );
};

export default TransferModal;
