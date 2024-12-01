import { FC, ReactElement, useEffect, useMemo, useRef, useState } from 'react';

import css from '../styles/header.module.scss';
import { useUser } from '@/state/user/hooks';
import { $diffDate, $hash, $sleep, MomentUnit } from '@/utils/met';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { message } from 'antd';
import RuleModal from '../modal/rule';
import ResultModal from '../modal/result';
import { useRouter } from 'next/router';
import { ConfirmModal } from '../modal';
import { useLuck } from '@/state/game/hooks';
import { useImmer } from 'use-immer';
import { useVoice } from '@/state/base/hooks';
import { Storage } from '@/utils/storage';

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
    const [gameStatusInfo, setGameStatusInfo] = useImmer<{ [key: string]: any }>({
        open: false,
        status: 'waitingPrize' // waitingPrize 、  start 、prizeIng
    });
    const [{ userinfo }] = useUser();
    const [{ luckgameinfo, openLuckGameResult, marqueeIndex, prizeIng }, { closeResultModal, handOpenPrizeIng }] = useLuck();
    const router = useRouter();
    const [voice] = useVoice();
    const timer = useRef<any>(null);
    const remindAudio = useRef<HTMLAudioElement | null>(null);
    const lotteryAudio = useRef<HTMLAudioElement | null>(null);
    const countAudio = useRef<any>(null);

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
        const list = luckgameinfo[0]?.betaddresslist || [];
        // console.log(list, list[index]);
        if (list[index]) return;
        if (list.includes(userinfo.address)) {
            message.warning(t('common:game:YouHaveJoinedThisRound'));
            return;
        }
        setCheckIndex(index);
        setShowConfirm(true);
    };

    const handClose = () => {
        closeResultModal();
        setGameStatusInfo({ open: true, status: 'start' });
        setTimeout(() => {
            setGameStatusInfo((draft) => {
                draft.open = false;
            });
        }, 3000);
    };

    const loopTime = () => {
        timer.current = setInterval(() => {
            const seconds = $diffDate(luckgameinfo[0].gametime, MomentUnit.seconds, 'start');
            setTime(seconds < 10 ? `0${seconds}` : `${seconds}`);
            const _voice = Storage.getItem('voice');
            if (seconds <= 0) {
                clearInterval(timer.current);
                setTime('00');
                countAudio.current?.pause();
                countAudio.current = null;
                handOpenPrizeIng();
            } else if (seconds < 15 && countAudio.current === null) {
                countAudio.current = new Audio('/voice/countdown.mp3');
                countAudio.current.loop = true;
                _voice === 'open' && countAudio.current.play();
            }
        }, 1000);
    };

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
        if (openLuckGameResult.open) {
            setGameStatusInfo((draft) => {
                draft.open = false;
            });
        }
    }, [openLuckGameResult.open]);

    useEffect(() => {
        if (voice === 'open') {
            countAudio.current?.play();
            remindAudio.current?.play();
            lotteryAudio.current?.play();
        } else {
            countAudio.current?.pause();
            remindAudio.current?.pause();
            lotteryAudio.current?.pause();
        }
    }, [voice]);

    useEffect(() => {
        if (time === '00') {
            remindAudio.current?.pause();
            remindAudio.current = null;
        } else if (time !== '00' && !remindAudio.current) {
            setGameStatusInfo({
                open: true,
                status: 'waitingPrize'
            });
            remindAudio.current = new Audio('/voice/remind.mp3');
            remindAudio.current.play();
            setTimeout(() => {
                remindAudio.current?.pause();
                setGameStatusInfo((draft) => {
                    draft.open = false;
                });
            }, 5000);
        }
    }, [time]);

    useEffect(() => {
        if (marqueeIndex === -1) {
            lotteryAudio.current?.pause();
            lotteryAudio.current = null;
        } else if (!lotteryAudio.current) {
            const _voice = Storage.getItem('voice');
            lotteryAudio.current = new Audio('/voice/lottery.mp3');
            _voice === 'open' && lotteryAudio.current.play();
        }
    }, [marqueeIndex]);

    useEffect(() => {
        if (prizeIng) {
            setGameStatusInfo({
                open: true,
                status: 'prizeIng'
            });
        } else {
            setGameStatusInfo((draft) => {
                draft.open = false;
            });
        }
    }, [prizeIng]);

    useEffect(() => {
        return () => {
            timer.current && clearInterval(timer.current);
            countAudio.current?.pause();
            remindAudio.current?.pause();
            lotteryAudio.current?.pause();
        };
    }, []);

    return (
        <>
            <div
                className={css.back}
                onClick={() => {
                    router.push('/');
                }}
            >
                <img src="/images/luckWheel/back.svg" alt="" />
            </div>
            <div className={css.main}>
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
                                    <div key={index} onClick={() => handStake(ele.index)} className={classNames(css.item, marqueeIndex === ele.index ? css.hover : '', joinInfo[ele.index]?.address ? css.active : '')}>
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

            {gameStatusInfo.open && (
                <div className={css.game_status}>
                    <div className={css.mask}></div>
                    <div className={css.content}>
                        <img src="/images/luckWheel/gametip.gif" alt="" />
                        <div>{gameStatusInfo.status === 'waitingPrize' ? '游戏即将开奖!!' : gameStatusInfo.status === 'prizeIng' ? '正在开奖中!!' : '新一轮游戏开始!!'}</div>
                    </div>
                </div>
            )}

            {showRule && <RuleModal onClose={() => setShowRule(false)} />}
            {openLuckGameResult.open && <ResultModal onClose={() => handClose()} />}
            {showConfirm && <ConfirmModal amount={amount} checkIndex={checkIndex} onClose={() => setShowConfirm(false)} />}
        </>
    );
};

export default Header;
