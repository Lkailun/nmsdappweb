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
    const [{ config, userinfo, orderinfo }] = useUser();
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [list, setList] = useState<any[]>([]);
    const chartRef = useRef<any>(null);

    const mockList = [
        {
            id: 'cm3qosi7g000hp9tgk638p3vk',
            amount: '1',
            settleAt: '2024-11-07T00:00:00.000Z',
            interval: 'd',
            userId: 'cm36ysdjq00067xoufyhmkf1u',
            createdAt: '2024-11-21T02:21:58.445Z',
            updatedAt: '2024-11-21T02:21:58.445Z',
            _id: 'cm3qosi7g000hp9tgk638p3vk',
            date: '2024-11-07'
        },
        {
            id: 'cm3qosk9d000xp9tgthw90n4b',
            amount: '0.0035417900000000004',
            settleAt: '2024-11-08T00:00:00.000Z',
            interval: 'd',
            userId: 'cm36ysdjq00067xoufyhmkf1u',
            createdAt: '2024-11-21T02:22:01.105Z',
            updatedAt: '2024-11-21T02:22:09.056Z',
            _id: 'cm3qosk9d000xp9tgthw90n4b',
            date: '2024-11-08'
        },
        {
            id: 'cm3qosqtq002lp9tgoyug2tb0',
            amount: '0.00109991',
            settleAt: '2024-11-10T00:00:00.000Z',
            interval: 'd',
            userId: 'cm36ysdjq00067xoufyhmkf1u',
            createdAt: '2024-11-21T02:22:09.615Z',
            updatedAt: '2024-11-21T02:22:10.733Z',
            _id: 'cm3qosqtq002lp9tgoyug2tb0',
            date: '2024-11-10'
        },
        {
            id: 'cm3qoss4d002xp9tgq46bldwg',
            amount: '0.0094802400000000004',
            settleAt: '2024-11-11T00:00:00.000Z',
            interval: 'd',
            userId: 'cm36ysdjq00067xoufyhmkf1u',
            createdAt: '2024-11-21T02:22:11.293Z',
            updatedAt: '2024-11-21T02:22:26.099Z',
            _id: 'cm3qoss4d002xp9tgq46bldwg',
            date: '2024-11-11'
        },
        {
            id: 'cm3qot4eo0061p9tg3bqb6ufy',
            amount: '0.0101359300000000003',
            settleAt: '2024-11-12T00:00:00.000Z',
            interval: 'd',
            userId: 'cm36ysdjq00067xoufyhmkf1u',
            createdAt: '2024-11-21T02:22:27.216Z',
            updatedAt: '2024-11-21T02:22:36.998Z',
            _id: 'cm3qot4eo0061p9tg3bqb6ufy',
            date: '2024-11-12'
        },
        {
            id: 'cm3qotcte0085p9tgqe63003l',
            amount: '0.0090759200000000004',
            settleAt: '2024-11-13T00:00:00.000Z',
            interval: 'd',
            userId: 'cm36ysdjq00067xoufyhmkf1u',
            createdAt: '2024-11-21T02:22:38.115Z',
            updatedAt: '2024-11-21T02:22:46.817Z',
            _id: 'cm3qotcte0085p9tgqe63003l',
            date: '2024-11-13'
        },
        {
            id: 'cm3qotjym009xp9tgkpib8q8x',
            amount: '0.0030044700000000002',
            settleAt: '2024-11-14T00:00:00.000Z',
            interval: 'd',
            userId: 'cm36ysdjq00067xoufyhmkf1u',
            createdAt: '2024-11-21T02:22:47.374Z',
            updatedAt: '2024-11-21T02:22:49.606Z',
            _id: 'cm3qotjym009xp9tgkpib8q8x',
            date: '2024-11-14'
        },
        {
            id: 'cm3qotm4400ahp9tgv5f2xyz7',
            amount: '0.00022814000000000001',
            settleAt: '2024-11-16T00:00:00.000Z',
            interval: 'd',
            userId: 'cm36ysdjq00067xoufyhmkf1u',
            createdAt: '2024-11-21T02:22:50.165Z',
            updatedAt: '2024-11-21T02:22:51.282Z',
            _id: 'cm3qotm4400ahp9tgv5f2xyz7',
            date: '2024-11-16'
        },
        {
            id: 'cm3qotnep00atp9tgphkx02nt',
            amount: '0.00180557000000000016',
            settleAt: '2024-11-18T00:00:00.000Z',
            interval: 'd',
            userId: 'cm36ysdjq00067xoufyhmkf1u',
            createdAt: '2024-11-21T02:22:51.841Z',
            updatedAt: '2024-11-21T02:23:06.822Z',
            _id: 'cm3qotnep00atp9tgphkx02nt',
            date: '2024-11-18'
        },
        {
            id: 'cm3qotzec00dpp9tgo2mm8dww',
            amount: '0.0000765',
            settleAt: '2024-11-19T00:00:00.000Z',
            interval: 'd',
            userId: 'cm36ysdjq00067xoufyhmkf1u',
            createdAt: '2024-11-21T02:23:07.380Z',
            updatedAt: '2024-11-21T02:23:07.380Z',
            _id: 'cm3qotzec00dpp9tgo2mm8dww',
            date: '2024-11-19'
        },
        {
            id: 'cm3wq77gj000l9lc8dyi1j5tn',
            amount: '0.001522260000000000005',
            settleAt: '2024-11-25T00:00:00.000Z',
            interval: 'd',
            userId: 'cm36ysdjq00067xoufyhmkf1u',
            createdAt: '2024-11-25T07:48:00.994Z',
            updatedAt: '2024-11-25T07:57:31.661Z',
            _id: 'cm3wq77gj000l9lc8dyi1j5tn',
            date: '2024-11-25'
        },
        {
            id: 'cm3y34mnz000x10m1s82gy3tx',
            amount: '0.000657899999999999998',
            settleAt: '2024-11-26T00:00:00.000Z',
            interval: 'd',
            userId: 'cm36ysdjq00067xoufyhmkf1u',
            createdAt: '2024-11-26T06:37:41.924Z',
            updatedAt: '2024-11-26T07:20:07.750Z',
            _id: 'cm3y34mnz000x10m1s82gy3tx',
            date: '2024-11-26'
        }
    ];

    const deal = () => {
        const _max = max(list),
            _min = min(list);
    };

    const getOptions = (xData: any[], yData: any[]) => {
        return {
            tooltip: {
                // show: false
                formatter: (params: { value: number }[]) => `${params[0].value} USD`,
                position: 'top',
                backgroundColor: '#0f172a',
                classNames: 'tooltip',
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
                left: '2%',
                right: '2%',
                top: '1%',
                bottom: '0%',
                containLabel: true
            },
            xAxis: {
                show: false, // 不显示x轴
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            // yAxis: {
            //     show: false // 不显示y轴
            // },
            yAxis: [
                {
                    name: 'price',
                    show: false // 不显示y轴
                },
                {
                    name: 'kline',
                    show: false // 不显示y轴
                }
            ],
            // xAxis: {
            //     type: 'category',
            //     axisLine: {
            //         lineStyle: {
            //             color: '#E7E8E8'
            //         }
            //     },
            //     axisTick: {
            //         show: false,
            //         alignWithLabel: true
            //     },
            //     axisLabel: {
            //         color: '#626E7F',
            //         fontSize: 12
            //         // fontFamily: "Poppins"
            //     },
            //     data: xData
            // },
            // yAxis: {
            //     name: 'USD',
            //     type: 'value',
            //     scale: true,
            //     nameTextStyle: {
            //         fontSize: 12,
            //         fontFamily: 'Poppins',
            //         color: '#9DABB7'
            //     },

            //     axisLine: {
            //         show: true,
            //         lineStyle: {
            //             color: '#E7E8E8'
            //         }
            //     },
            //     // axisTick: {
            //     //     show: false
            //     // },
            //     axisLabel: {
            //         color: '#626E7F',
            //         fontSize: 12
            //         // fontFamily: "Poppins",
            //         // align: "left",
            //         // margin: 30,
            //     },
            //     splitLine: {
            //         show: false
            //     }
            // },
            series: [
                {
                    // data: yData.map((ele) => new BigNumber(ele).multipliedBy(0.5).toNumber()),
                    data: yData,
                    name: 'price',
                    type: 'bar',
                    yAxisIndex: 0,
                    // barWidth: 26,
                    // barGap: '2px',
                    itemStyle: {
                        // color: '#9DABB7',
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#6FF0F7' },
                            { offset: 0.3, color: '#486FCF' },
                            { offset: 1, color: '#192B5C' }
                        ]),
                        borderRadius: 6
                        // opacity: 0.32
                    }
                },
                {
                    type: 'line',
                    name: 'kline',
                    yAxisIndex: 1,
                    smooth: 0.6,
                    symbol: 'none',
                    lineStyle: {
                        color: '#5ED675',
                        width: 2
                    },
                    // data: yData.map((ele) => new BigNumber(ele).multipliedBy(1).toNumber())
                    data: yData
                    // areaStyle: {},
                }
            ]
        };
    };

    useEffect(() => {
        if (list.length > 0 && chartRef.current) {
            // const xData: any[] = [],
            //     yData: any[] = [];
            // list.forEach((ele) => {
            //     xData.push(moment(ele.settleAt).format('YYYY-MM-DD'));
            //     yData.push(Number(BigNumber(ele.amount).toFixed(5, 1)));
            // });
            // const options = getOptions(xData, yData);
            const options = getOptions(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]);
            chartRef.current.hideLoading();
            chartRef.current.setOption(options);
            console.log('=======');
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

            setList(mockList);
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
                        NMM当日价格: <b>$3.2</b> <span>+0.2%</span>
                    </div>
                    <div className={css.kline} ref={chartRef}></div>
                </div>
                <div className={css.content}>
                    <div className={css.action}>-</div>
                    <div className={css.text}>
                        <h4>
                            <b>×</b>1
                        </h4>
                        <div>
                            (100U
                            <img src="/images/stake/USDT.svg" alt="" />
                            +100积分
                            <img src="/images/stake/color-point.svg" alt="" />)
                        </div>
                    </div>
                    <div className={css.action}>+</div>
                </div>
                <Button onClick={() => setShowConfirm(true)}>质押</Button>
                <p className={css.rule}>
                    <img src="/images/stake/rule.svg" alt="" />
                    <span onClick={() => setShow(true)}>质押规则</span>
                </p>
            </div>
            {show && <RuleModal onClose={() => setShow(false)} />}
            {showConfirm && <ConfirmStakeModal onClose={() => setShowConfirm(false)} />}
        </>
    );
};

export default Stake;
