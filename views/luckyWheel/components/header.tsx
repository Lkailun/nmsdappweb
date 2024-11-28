import { FC, ReactElement, useMemo, useState } from 'react';

import css from '../styles/header.module.scss';
import { useLogs, usePrice, useUser } from '@/state/user/hooks';
import { $BigNumber, $toFixed } from '@/utils/met';
import CountUp from 'react-countup';
import { useTranslation } from 'next-i18next';
import moment from 'moment';
import classNames from 'classnames';
import { Button } from '@/components';
import { message } from 'antd';
import RuleModal from '../modal/rule';
import ResultModal from '../modal/result';
import { useRouter } from 'next/router';
import { ConfirmModal } from '../modal';

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
    { label: '0xqw..123', amount: '0.05', icon: 15 },
    { label: '', amount: '', icon: 16 }
];

const stakeList = [0.05, 0.1, 0.3, 0.5, 1, 3, 5, 10, 20];

const Header: FC = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [showRule, setShowRule] = useState<boolean>(false);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [{ userinfo }] = useUser();
    const router = useRouter();

    return (
        <>
            <div className={css.main}>
                <div className={css.back} onClick={() => router.push('/')}>
                    <img src="/images/luckWheel/back.svg" alt="" />
                </div>
                {/* <div className={css.title}>
                </div> */}
                <img className={css.title} src="/images/luckWheel/title.png" alt="" />
                <img className={css.bg} src="/images/luckWheel/bg.png" alt="" />

                <div className={css.info}>
                    <div className={css.item}>
                        <div className={css.label}>本局参与人数</div>
                        <div className={css.content}>
                            <span>01</span>
                            <span className={classNames(css.active, css.tr)}>/</span>
                            <span className={css.active}>16</span>
                        </div>
                    </div>
                    <div className={css.item}>
                        <div className={css.label}>剩余倒计时</div>
                        <div className={css.content}>
                            <span>10</span>:<span>10</span>:<span className={css.active}>10</span>
                        </div>
                    </div>
                </div>

                <div className={css.card}>
                    <div className={css.view}>
                        <div className={css.mask_bg}>
                            <div className={css.list}>
                                {list.map((ele, index) => (
                                    <div key={index} onClick={() => setShowConfirm(true)} className={classNames(css.item, ele.amount ? css.active : '')}>
                                        {ele.amount && (
                                            <div>
                                                下注:{ele.amount}
                                                <img src={`/images/symbol/NMS.svg`} alt="" />
                                            </div>
                                        )}

                                        <img className={css.icon} src={`/images/luckWheel/${ele.icon}.png`} alt="" />
                                        {ele.amount && <p>{ele.label}</p>}
                                    </div>
                                ))}
                            </div>
                            <div className={css.content}>
                                <h5>游戏进行中...</h5>
                                <div className={css.cont}>
                                    <div className={css.label}>
                                        <img src={`/images/luckWheel/right.svg`} alt="" />
                                        <span>选择下注数量(NMS)</span>
                                        <img src={`/images/luckWheel/left.svg`} alt="" />
                                    </div>
                                    <section>
                                        {stakeList.map((ele, index) => (
                                            <div key={ele} className={index === 3 ? css.active : ''}>
                                                {ele}
                                                <img className={css.icon} src={`/images/symbol/NMS.svg`} alt="" />
                                            </div>
                                        ))}
                                    </section>
                                </div>
                                <div className={css.tip}>
                                    <img className={css.icon} src={`/images/luckWheel/warn.svg`} alt="" />
                                    选择下注金额后点击任一格子 即可完成进行下注! <span onClick={() => setShowRule(true)}>查看游戏规则</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showRule && <RuleModal onClose={() => setShowRule(false)} />}
            {showResult && <ResultModal onClose={() => setShowResult(false)} data={{}} />}
            {showConfirm && <ConfirmModal onClose={() => setShowConfirm(false)} />}
        </>
    );
};

export default Header;
