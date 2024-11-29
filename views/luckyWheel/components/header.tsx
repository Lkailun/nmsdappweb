import { FC, ReactElement, useEffect, useMemo, useRef, useState } from 'react';

import css from '../styles/header.module.scss';
import { useLogs, usePrice, useUser } from '@/state/user/hooks';
import { $BigNumber, $diffDate, $hash, $momentTimes, $toFixed, MomentUnit } from '@/utils/met';
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
import { useLuck } from '@/state/game/hooks';

const list = [
    { icon: 1, index: 0 },
    { icon: 2, index: 1 },
    { icon: 3, index: 2 },
    { icon: 4, index: 3 },
    { icon: 5, index: 4 },
    { icon: 6, index: 15 },
    { icon: 7, index: 5 },
    { icon: 8, index: 14 },
    { icon: 9, index: 6 },
    { icon: 10, index: 13 },
    { icon: 11, index: 7 },
    { icon: 12, index: 12 },
    { icon: 13, index: 11 },
    { icon: 14, index: 10 },
    { icon: 15, index: 9 },
    { icon: 1, index: 8 }
];

const stakeList = [0.05, 0.1, 0.3, 0.5, 1, 3, 5, 10, 20];

const Header: FC = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [showRule, setShowRule] = useState<boolean>(false);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [time, setTime] = useState<string>('00');
    const [amount, setAmount] = useState<number>(stakeList[0]);
    const [checkIndex, setCheckIndex] = useState<number>(-1);
    const [{ userinfo }] = useUser();
    const [{ luckgameinfo, openLuckGameResult }, { closeResultModal }] = useLuck();
    const router = useRouter();
    const timer = useRef<any>(null);

    const joined = useMemo(() => {
        return (luckgameinfo[0]?.betaddresslist || []).filter((ele: string) => ele).length;
    }, [luckgameinfo[0]]);

    const joinInfo = useMemo(() => {
        const info: { [key: string]: any } = {};
        (luckgameinfo[0]?.betaddresslist || []).forEach((ele: string, index: number) => {
            info[index] = {
                address: ele,
                amount: (luckgameinfo[0]?.betamountlist || [])[index]
            };
        });
        return info;
    }, [luckgameinfo[0]]);

    const handStake = (index: number) => {
        if ((luckgameinfo[0]?.betaddresslist || []).includes(userinfo.address)) {
            message.warning(t('common:game:YouHaveJoinedThisRound'));
            return;
        }
        setCheckIndex(index);
        setShowConfirm(true);
    };

    const loopTime = () => {
        timer.current = setInterval(() => {
            const seconds = $diffDate(luckgameinfo[0].gametime, MomentUnit.seconds, 'start');
            console.log('loopTime:::::', seconds);
            setTime(seconds < 10 ? `0${seconds}` : `${seconds}`);
            if (seconds <= 0) {
                clearInterval(timer.current);
            }
        }, 1000);
    };

    useEffect(() => {
        return () => {
            clearInterval(timer.current);
        };
    }, []);

    useEffect(() => {
        if (luckgameinfo[0] && luckgameinfo[0].gametime) {
            clearInterval(timer.current);
            loopTime();
        } else {
            setTime('00');
            timer.current && clearInterval(timer.current);
        }
    }, [luckgameinfo[0]]);

    useEffect(() => {
        return () => {
            timer.current && clearInterval(timer.current);
        };
    }, []);

    return (
        <>
            <div className={css.main}>
                <div className={css.back} onClick={() => router.push('/')}>
                    <img src="/images/luckWheel/back.svg" alt="" />
                </div>
                <img className={css.title} src="/images/luckWheel/title.png" alt="" />
                <img className={css.bg} src="/images/luckWheel/bg.png" alt="" />

                <div className={css.info}>
                    <div className={css.item}>
                        <div className={css.label}>{t('common:game:ThisRoundParticipants')}</div>
                        <div className={css.content}>
                            <span className={joined > 0 ? css.active : ''}>{joined < 10 ? `0${joined}` : `${joined}`}</span>
                            <span className={classNames(css.active, css.tr)}>/</span>
                            <span className={css.active}>16</span>
                        </div>
                    </div>
                    <div className={css.item}>
                        <div className={css.label}>{t('common:game:RemainingCountdown')}</div>
                        <div className={css.content}>
                            {time === '00' ? (
                                <>
                                    <span className={css.active}>--</span>:<span className={css.active}>--</span>:<span className={css.active}>--</span>
                                </>
                            ) : (
                                <>
                                    <span>00</span>:<span>00</span>:<span className={luckgameinfo[0]?.gametime ? css.active : ''}>{time}</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className={css.card}>
                    <div className={css.view}>
                        <div className={css.mask_bg}>
                            <div className={css.list}>
                                {list.map((ele, index) => (
                                    <div key={index} onClick={() => handStake(ele.index)} className={classNames(css.item, joinInfo[ele.index]?.address ? css.active : '')}>
                                        {joinInfo[ele.index]?.address && (
                                            <>
                                                <div>
                                                    {t('common:game:Bet')}:{joinInfo[ele.index].amount}
                                                    <img src={`/images/symbol/NMS.svg`} alt="" />
                                                </div>
                                                <p>{joinInfo[ele.index].address === userinfo.address ? 'You' : $hash(joinInfo[ele.index].address, 4, 3)}</p>
                                            </>
                                        )}

                                        <img className={css.icon} src={`/images/luckWheel/${ele.icon}.png`} alt="" />
                                    </div>
                                ))}
                            </div>
                            <div className={css.content}>
                                <h5>{t('common:game:GameInProgress')}</h5>
                                <div className={css.cont}>
                                    <div className={css.label}>
                                        <img src={`/images/luckWheel/right.svg`} alt="" />
                                        <span>{t('common:game:SelectStakeAmount')}</span>
                                        <img src={`/images/luckWheel/left.svg`} alt="" />
                                    </div>
                                    <section>
                                        {stakeList.map((ele) => (
                                            <div key={ele} className={amount === ele ? css.active : ''} onClick={() => setAmount(ele)}>
                                                {ele}
                                                <img className={css.icon} src={`/images/symbol/NMS.svg`} alt="" />
                                            </div>
                                        ))}
                                    </section>
                                </div>
                                <div className={css.tip}>
                                    <img className={css.icon} src={`/images/luckWheel/warn.svg`} alt="" />
                                    {t('common:game:AfterSelectingStakeAmountClickAnyCellToCompleteStake')} <span onClick={() => setShowRule(true)}>{t('common:game:ViewGameRules')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showRule && <RuleModal onClose={() => setShowRule(false)} />}
            {openLuckGameResult.open && <ResultModal onClose={() => closeResultModal()} />}
            {showConfirm && <ConfirmModal amount={amount} checkIndex={checkIndex} onClose={() => setShowConfirm(false)} />}
        </>
    );
};

export default Header;
