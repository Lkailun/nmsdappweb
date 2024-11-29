import { FC, ReactElement, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { init, dispose, Chart } from 'klinecharts';
import css from '../styles/header.module.scss';
import { useLogs, usePrice, useUser } from '@/state/user/hooks';
import { $BigNumber, $toFixed } from '@/utils/met';
import CountUp from 'react-countup';
import { useTranslation } from 'next-i18next';
import moment from 'moment';
import classNames from 'classnames';
import { Button } from '@/components';
import { message } from 'antd';
import generatedDataList from './generatedDataList';
import RuleModal from '../modal/rule';
import { useRouter } from 'next/router';
import { ConfirmModal, ResultModal } from '../modal';
import { useBtc } from '@/state/game/hooks';

const stakeList = [0.05, 0.1, 0.3, 0.6, 1, 3, 10, 20];

function getTooltipOptions() {
    return {
        candle: {
            tooltip: {
                showType: 'standard',
                showRule: 'none',
                custom: (data: any) => {
                    const { prev, current } = data;
                    const prevClose = prev?.close ?? current.open;
                    const change = ((current.close - prevClose) / prevClose) * 100;
                    return [
                        // { title: 'open', value: current.open.toFixed(2) },
                        // { title: 'close', value: current.close.toFixed(2) },
                        // {
                        //     title: 'Change: ',
                        //     value: {
                        //         text: `${change.toFixed(2)}%`,
                        //         color: change < 0 ? '#EF5350' : '#26A69A',
                        //     },
                        // },
                    ];
                }
            }
        },
        indicator: {
            tooltip: {
                showRule: 'always'
            }
        }
    };
}

const Header: FC = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [showRule, setShowRule] = useState<boolean>(false);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [direction, setDirection] = useState<'up' | 'down'>('up');
    const [amount, setAmount] = useState<number>(stakeList[0]);
    const chart = useRef<Chart | null>();

    const [{ userinfo }] = useUser();
    const [{ klines, openBtcGameResult }, { closeResultModal }] = useBtc();

    const router = useRouter();

    const change = useMemo(() => {
        if (klines.length === 0) return 0;
        const first = klines[klines.length - 1],
            now = klines[0];
        return $BigNumber(first[4] - now[1])
            .dividedBy(now[1])
            .multipliedBy(100)
            .toFixed(2, 1);
    }, [klines]);

    useEffect(() => {
        if (klines.length > 0) {
            const kline_data = klines.map((ele: any[]) => ({
                open: Number(ele[1]),
                low: Number(ele[3]),
                high: Number(ele[2]),
                close: Number(ele[4]),
                volume: Number(ele[5]),
                timestamp: Number(ele[0])
            }));
            chart.current?.applyNewData(kline_data);
        }
    }, [klines]);

    useLayoutEffect(() => {
        chart.current = init('k-line');
        chart.current?.setStyles('dark');
        chart.current?.setLocale('en-US');
        chart.current?.setStyles(getTooltipOptions() as any); // 自定义配置
        // chart.current?.applyNewData(generatedDataList());
        return () => {
            dispose('k-line');
        };
    }, []);

    return (
        <>
            <div className={css.main}>
                <div className={css.back} onClick={() => router.push('/')}>
                    <img src="/images/luckWheel/back.svg" alt="" />
                </div>
                <img className={css.title} src="/images/rise-fall/bg.png" alt="" />
                <div className={css.kline}>
                    <div className={css.info}>
                        <b>
                            BTC/USDT <span>3m</span>
                        </b>
                        <div className={classNames(css.right, Number(change) < 0 ? css.down : '')}>
                            <p>{$BigNumber(klines[0]?.[4]).toFixed(1, 1)}</p>
                            <div className={css.desc}>
                                ≈￥
                                {$BigNumber(klines[0]?.[4] ?? 0)
                                    .multipliedBy(7.2)
                                    .toFixed(2, 1)}
                                <div>
                                    <img src="/images/rise-fall/direction.svg" alt="" />
                                    {change}%
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={css.content} id="k-line"></div>
                </div>
                <div className={css.action}>
                    <div className={classNames(css.down, direction === 'up' ? css.active : '')} onClick={() => setDirection('up')}>
                        看涨{direction === 'up' && <img src="/images/rise-fall/check.svg" alt="" />}
                    </div>
                    <div className={classNames(css.up, direction === 'down' ? css.active : '')} onClick={() => setDirection('down')}>
                        看跌{direction === 'down' && <img src="/images/rise-fall/check.svg" alt="" />}
                    </div>
                </div>
                <div className={css.cont}>
                    <div className={css.top}>
                        <img src={`/images/luckWheel/right.svg`} alt="" />
                        <span>选择下注数量(NMS)</span>
                        <img src={`/images/luckWheel/left.svg`} alt="" />
                    </div>
                    <section>
                        {stakeList.map((ele, index) => (
                            <div key={ele} onClick={() => setAmount(ele)} className={classNames(amount === ele ? css.active : '', direction === 'up' ? css.up : '')}>
                                {ele}
                                <img className={css.icon} src={`/images/symbol/NMS.svg`} alt="" />
                            </div>
                        ))}
                    </section>
                </div>
                <Button className={css.btn} onClick={() => setShowConfirm(true)}>
                    下注竞猜
                </Button>
                <div className={css.rule}>
                    <img className={css.icon} src={`/images/luckWheel/warn.svg`} alt="" />
                    <span onClick={() => setShowRule(true)}>竞猜规则</span>
                </div>
            </div>
            {showRule && <RuleModal onClose={() => setShowRule(false)} />}
            {openBtcGameResult.open && <ResultModal onClose={() => closeResultModal()} />}
            {showConfirm && <ConfirmModal direction={direction} amount={amount} onClose={() => setShowConfirm(false)} />}
        </>
    );
};

export default Header;
