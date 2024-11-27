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

// declare var klinecharts: any;

const list = [
    { label: 'You', amount: '0.05', icon: 1 },
    { label: '0xqw..123', amount: '0.05', icon: 2 },
    { label: '0xqw..123', amount: '0.05', icon: 3 },
    { label: '', amount: '', icon: 4 },
    { label: '', amount: '', icon: 5 },
    { label: '', amount: '', icon: 6 },
    { label: '', amount: '', icon: 7 },
    { label: '', amount: '', icon: 8 },
    { label: '', amount: '', icon: 9 },
    { label: '', amount: '', icon: 10 },
    { label: '', amount: '', icon: 11 },
    { label: '', amount: '', icon: 12 },
    { label: '', amount: '', icon: 13 },
    { label: '', amount: '', icon: 14 },
    // { label: '', amount: '', icon: 15 },
    // { label: '', amount: '', icon: 16 },
    { label: '0xqw..123', amount: '0.05', icon: 15 },
    { label: '', amount: '', icon: 16 }
];

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

    const [transferType, setTransferType] = useState<string>('in');
    const [direction, setDirection] = useState<string>('up');
    const chart = useRef<Chart | null>();

    const [{ userinfo }] = useUser();
    const router = useRouter();

    const handDirection = (type: string) => {
        setDirection(type);
    };

    useLayoutEffect(() => {
        chart.current = init('k-line');
        chart.current?.applyNewData(generatedDataList());
        chart.current?.setStyles('dark');
        chart.current?.setLocale('en-US');
        chart.current?.setStyles(getTooltipOptions() as any); // 自定义配置
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
                        <b>BTC/USDT</b>
                        <div className={css.right}>
                            <p>29,440.6</p>
                            <div className={css.desc}>
                                ≈￥206,163.3
                                <div>
                                    <img src="/images/rise-fall/direction.svg" alt="" />
                                    -0.5%
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={css.content} id="k-line"></div>
                </div>
                <div className={css.action}>
                    <div className={classNames(css.down, direction === 'up' ? css.active : '')} onClick={() => handDirection('up')}>
                        看涨{direction === 'up' && <img src="/images/rise-fall/check.svg" alt="" />}
                    </div>
                    <div className={classNames(css.up, direction === 'down' ? css.active : '')} onClick={() => handDirection('down')}>
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
                            <div key={ele} className={classNames(index === 0 ? css.active : '', direction === 'up' ? css.up : '')}>
                                {ele}
                                <img className={css.icon} src={`/images/symbol/NMS.svg`} alt="" />
                            </div>
                        ))}
                    </section>
                </div>
                <Button className={css.btn}>下注竞猜</Button>
                <div className={css.rule}>
                    <img className={css.icon} src={`/images/luckWheel/warn.svg`} alt="" />
                    <span onClick={() => setShowRule(true)}>竞猜规则</span>
                </div>
            </div>
            {showRule && <RuleModal onClose={() => setShowRule(false)} />}
        </>
    );
};

export default Header;
