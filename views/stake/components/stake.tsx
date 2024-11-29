import { FC, ReactElement, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import css from '../styles/stake.module.scss';
import { usePrice, useUser } from '@/state/user/hooks';
import { ConfirmStakeModal, RuleModal } from '../modal';
import { IconWarning } from '@/components/Icon';
import classNames from 'classnames';
import { $BigNumber } from '@/utils/met';
import CountUp from 'react-countup';
import { useImmer } from 'use-immer';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components';
import { max, maxBy, min, set } from 'lodash';
import moment from 'moment';
import * as echarts from 'echarts';

const Stake: FC = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [{ userinfo, platforminfo }] = useUser();
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const chartRef = useRef<any>(null);
    const price = usePrice();
    const [amount, setAmount] = useState(1);

    const list = useMemo(() => {
        return Object.keys(platforminfo.nmmpricehistory)
            .sort()
            .map((ele) => ({ date: Number(ele), price: Number(platforminfo.nmmpricehistory[ele]) }));
    }, [platforminfo.nmmpricehistory]);

    const getOptions = (xData: any[], yData: any[]) => {
        return {
            tooltip: {
                formatter: (params: { value: number }[]) => `${params[0].value} USD`,
                position: 'top',
                backgroundColor: '#0f172a',
                padding: [5, 9],
                textStyle: {
                    fontSize: 12,
                    fontFamily: 'Poppins',
                    color: '#fff'
                },
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    shadowStyle: {
                        color: 'rgba(14, 1, 52, 0.02)'
                    }
                }
            },
            grid: {
                left: '-2%',
                right: '-2%', 
                top: '2%',
                bottom: '0%',
                containLabel: true
            },
            xAxis: {
                show: false,
                data: xData
            },
            yAxis: [
                {
                    name: 'price',
                    show: false,
                    scale: true,
                    min: function(value: { min: number }) {
                        return value.min * 0.95;
                    }
                },
                {
                    name: 'kline', 
                    show: false,
                    scale: true,
                    min: function(value: { min: number }) {
                        return value.min * 0.95;
                    }
                }
            ],
            series: [
                {
                    data: yData,
                    name: 'price',
                    type: 'bar',
                    yAxisIndex: 0,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#6FF0F7' },
                            { offset: 0.35, color: '#486FCF' },
                            { offset: 1, color: '#192B5C' }
                        ]),
                        borderRadius: 6
                    }
                },
                {
                    type: 'line', 
                    name: 'kline',
                    yAxisIndex: 1,
                    smooth: 0.3,
                    symbol: 'none',
                    lineStyle: {
                        color: '#5ED675',
                        width: 2
                    },
                    data: yData.map(v => v * 1.3)
                }
            ]
        };
    };

    useEffect(() => {
        if (list.length > 0 && chartRef.current) {
            const xData: any[] = [],
                yData: any[] = [];
            list.forEach((ele) => {
                xData.push(moment(ele.date).format('YYYY-MM-DD'));
                yData.push(Number(BigNumber(ele.price).toFixed(5, 1)));
            });

            const options = getOptions(xData, yData);
            chartRef.current.hideLoading();
            chartRef.current.setOption(options);
        }
    }, [list, chartRef.current]);

    const init = () => {
        try {
            chartRef.current = chartRef.current && echarts.init(chartRef.current);
            chartRef.current.showLoading({
                text: 'loading',
                color: '#0f172a',
                lineWidth: 4,
                spinnerRadius: 17,
                textColor: '#0f172a',
                maskColor: 'rgba(255, 255, 255, 0.2)',
                fontSize: 20,
                fontWeight: 500,
                zlevel: 0
            });
        } catch (e: any) {
            console.error(e);
        }
    };

    useLayoutEffect(() => {
        init();
    }, []);

    return (
        <>
            <div className={css.view}>
                <div className={css.dashboard}>
                    <div className={css.tip}>
                        {t('common:stake:NMMPrice')}: <b>${BigNumber(price).toFixed(4, 1)}</b> <span>+{ BigNumber(platforminfo?.nmmriserate).multipliedBy(100).toFixed(2, 1) }%</span>
                    </div>
                    <div className={css.kline} ref={chartRef}></div>
                </div>
                <div className={css.content}>
                    <div className={css.action} onClick={() => setAmount(Math.max(1, amount - 1))}>
                        -
                    </div>
                    <div className={css.text}>
                        <h4>
                            <b>×</b>
                            {amount}
                        </h4>
                        <div>
                            ({100 * amount}U
                            <img src="/images/stake/USDT.svg" alt="" />+{100 * amount} {t('common:stake:Integral')}
                            <img src="/images/stake/color-point.svg" alt="" />)
                        </div>
                    </div>
                    <div className={css.action} onClick={() => setAmount(amount + 1)}>
                        +
                    </div>
                </div>
                <Button onClick={() => setShowConfirm(true)}>{t('common:stake:Stake')}</Button>
                <p className={css.rule}>
                    <img src="/images/stake/rule.svg" alt="" />
                    <span onClick={() => setShow(true)}>{t('common:stake:StakeRule')}</span>
                </p>
            </div>
            {show && <RuleModal onClose={() => setShow(false)} />}
            {showConfirm && <ConfirmStakeModal onClose={() => setShowConfirm(false)} amount={amount} />}
        </>
    );
};

export default Stake;
