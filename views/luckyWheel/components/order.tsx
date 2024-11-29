import { FC, ReactElement, useState } from 'react';
import css from '../styles/order.module.scss';
import { Button, NoData } from '@/components';
import moment from 'moment';
import { $BigNumber, $diffDate, $toFixed } from '@/utils/met';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';
import { useLuck } from '@/state/game/hooks';
import BigNumber from 'bignumber.js';

const Order: FC = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [{ luckgamerecords }] = useLuck();
    const [list, setList] = useState([
        { status: 'pending' }, //
        { status: 'success' },
        { status: 'fail' },
        { status: 'know' },
        { status: 'success' },
        { status: 'success' },
        { status: 'fail' },
        { status: 'know' },
        { status: 'success' },
        { status: 'fail' },
        { status: 'know' }
    ]);

    const getReward = (data: any) => {
        switch (data.state) {
            case 'pending':
                return '--';
            case 'success':
                return 20;
            case 'failed':
                return '--';
            default:
                return '--';
        }
    };

    const getFont = (status: string) => {
        switch (status) {
            case 'pending':
                return t('common:game:WaitingForResults');
            case 'success':
                return t('common:game:Winning');
            case 'failed':
                return t('common:game:Failed');
            default:
                return t('common:game:NoOneWon');
        }
    };

    return (
        <div className={css.view}>
            <header>
                <h5>{t('common:game:MyGameRecords')}</h5>
                <p>{t('common:game:Recent20BetRecords')}</p>
            </header>
            <div className={css.section}>
                {luckgamerecords.map((ele: any, index: number) => (
                    <div className={css.item} key={index}>
                        <div className={css.line}>
                            <div className={css.left}>
                                <span className={css.label}>{t('common:game:BetTime')}:</span>
                                <div>{moment(ele.createtime).format('YYYY.MM.DD HH:mm')}</div>
                            </div>
                            <div className={css.right}>
                                <span className={css.label}>{t('common:game:LotteryStatus')}:</span>
                                <div className={ele.state === 'success' ? css.success : ele.state === 'failed' ? css.fail : ele.state === 'pending' ? css.pending : css.know}>{getFont(ele.state)}</div>
                            </div>
                        </div>
                        <div className={css.line}>
                            <div className={css.left}>
                                <span className={css.label}>{t('common:game:BetAmount')}:</span>
                                <div>
                                    -{Number(BigNumber(ele.betamount).toFixed(3, 1))} <img src="/images/symbol/NMS.svg" alt="" />
                                </div>
                            </div>
                            <div className={css.right}>
                                <span className={css.label}>{t('common:game:Reward')}:</span>
                                <div>
                                    {ele.state === 'pending' ? (
                                        '--'
                                    ) : (
                                        <>
                                            +{ele.rewardamount} <img src={ele.state === 'success' ? '/images/stake/color-point.svg' : '/images/symbol/NMS.svg'} alt="" />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {luckgamerecords.length === 0 && <NoData />}
            </div>
        </div>
    );
};

export default Order;
