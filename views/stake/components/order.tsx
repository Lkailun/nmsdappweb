import { FC, ReactElement, useEffect, useState } from 'react';
import css from '../styles/order.module.scss';
import { Button, NoData } from '@/components';
import { useUser } from '@/state/user/hooks';
import moment from 'moment';
import CountUp from 'react-countup';
import { $BigNumber } from '@/utils/met';
import { useTranslation } from 'react-i18next';

const Item: FC<{ [key: string]: any }> = ({ data }): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);

    return (
        <>
            <div className={css.item}>
                <div className={css.line}>
                    <div className={css.date}>
                        <span className={css.label}>开始时间:</span>
                        {moment(data.createtime).format('YYYY.MM.DD HH:mm')}
                    </div>
                    <div className={css.days}>
                        <span className={css.label}>已产天数:</span>
                        {/* {moment(data.createtime).endOf('m').fromNow()} */}
                        { Math.floor((Date.now() - data.createtime) / (1000 * 60 * 60 * 24)) }天
                    </div>
                </div>
                <div className={css.line}>
                    <div className={css.amount}>
                        <span className={css.label}>质押数量:</span>
                        <div>
                            {data.usdtamount}
                            <img src="/images/symbol/USDT.svg" alt="" />+{data.usdtamount}
                            <img className={css.pointsvg} src="/images/stake/color-point.svg" alt="" />
                        </div>
                    </div>
                    <div className={css.reward}>
                        <span className={css.label}>已产收益:</span>
                        <div>
                            <b>{$BigNumber(data.totalrelease).toFixed(3, 1)} </b> <img src="/images/stake/point.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Order: FC = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [{ stakingrecords }] = useUser();
    useEffect(() => {
        moment.locale('zh-cn');
    }, []);
    return (
        <div className={css.view}>
            <header>我的质押记录:</header>
            <div className={css.section}>
                {stakingrecords.map((ele: any, index: number) => (
                    <Item key={index} data={ele} />
                ))}
                {stakingrecords.length === 0 && <NoData />}
            </div>
        </div>
    );
};

export default Order;
