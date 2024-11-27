import { FC, ReactElement, useState } from 'react';
import css from '../styles/order.module.scss';
import { Button, NoData } from '@/components';
import { TradeModal } from '../modal';
import { useUser } from '@/state/user/hooks';
import moment from 'moment';
import { $diffDate, $toFixed } from '@/utils/met';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';

const Item: FC<{ [key: string]: any }> = ({ data }): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <div className={css.item}>
                <div className={css.line}>
                    <div className={css.date}>
                        <span className={css.label}>开始时间</span>2024.10.12 12:00
                    </div>
                    <div className={css.days}>
                        <span className={css.label}>已产天数</span>99 天
                    </div>
                </div>
                <div className={css.line}>
                    <div className={css.amount}>
                        <span className={css.label}>质押数量</span>
                        <div>
                            100
                            <img src="/images/symbol/USDT.svg" alt="" />
                            +100
                            <img src="/images/stake/color-point.svg" alt="" />
                        </div>
                    </div>
                    <div className={css.reward}>
                        <span className={css.label}>已产收益</span>
                        <div>
                            <b>123 </b> <img src="/images/stake/point.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Order: FC = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    // const [{ orderinfo }] = useUser();
    const [list, setList] = useState(new Array(10).fill(0));

    return (
        <div className={css.view}>
            <header>我的质押记录:</header>
            <div className={css.section}>
                {list.map((ele: any, index: number) => (
                    <Item key={index} data={ele} />
                ))}
                {list.length === 0 && <NoData />}
            </div>
        </div>
    );
};

export default Order;
