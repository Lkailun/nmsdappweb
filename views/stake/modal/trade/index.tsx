import { FC, ReactElement, useMemo, useState } from 'react';

import css from '../../styles/trade.module.scss';
import { message, Modal } from 'antd';
import Button from '@/components/Button';
import { $BigNumber, $diffDate } from '@/utils/met';
import { usePrice, useUser } from '@/state/user/hooks';
import { useWallet, useSign } from '@/hooks';
import Server from '@/service/api';
import CountUp from 'react-countup';

type IProps = {
    onClose: Function;
    data: Record<string, any>;
};
const TradeModal: FC<IProps> = ({ onClose, data }): ReactElement => {
    const [{ userinfo, config }, { updateUser }] = useUser();
    const price = usePrice();
    const { account } = useWallet();
    const signMessage = useSign();

    const [loading, setLoading] = useState<boolean>(false);

    const interval = useMemo(() => $diffDate(data.createtime), [data]);
    const feeRate = useMemo(() => {
        if (interval < 30) {
            return config.spower30feerate;
        } else if (interval < 60) {
            return config.spower60feerate;
        } else {
            return 0;
        }
    }, [data, interval, config]);

    const outFlokiNum = useMemo(() => Number($BigNumber(data.usdtnum).multipliedBy($BigNumber(1).minus(feeRate)).dividedBy(price).toFixed(1, 1)), [feeRate, price, data]);

    const hand = async () => {
        try {
            if (!config.cansellpower || !userinfo.cansellpower) throw new Error('暂不支持出售!');
            setLoading(true);
            const _messsage = `Sell Power at:${Date.now()}`;
            const signature = await signMessage(_messsage);
            const params = {
                address: account,
                orderid: data._id
            };

            const { code, data: _data, msg }: any = await Server.trade(params, { message: _messsage, signature });
            if (code !== 200) throw new Error(msg);
            updateUser(_data);
            message.success('出售成功');
            onClose();
        } catch (e: any) {
            message.error(e.message || '出售失败');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={true} footer={null} onCancel={() => onClose()} className={css.view}>
            <header>算力出售</header>
            <section>
                <p>
                    预计获得数量
                    <div>
                        <b>
                            +<CountUp decimals={1} end={outFlokiNum as number} />
                        </b>{' '}
                        FLOKI
                    </div>
                </p>
                <p>
                    当前FLOKI价格(U)
                    <div className={css.font}>
                        $<CountUp decimals={6} end={price as number} />
                    </div>
                </p>
                <p>
                    手续费(%)
                    <div className={css.font}>
                        <CountUp decimals={2} end={Number(feeRate * 100)} />%
                    </div>
                </p>
            </section>
            <Button loading={loading} onClick={() => hand()}>
                <img className={css.icon} src="/images/prow/car.svg" alt="" />
                确认出售
            </Button>
        </Modal>
    );
};

export default TradeModal;
