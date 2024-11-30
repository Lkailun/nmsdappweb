import { FC, ReactElement, useState } from 'react';
import css from '../styles/order.module.scss';
import { Button, NoData } from '@/components';
import moment from 'moment';

import { useTranslation } from 'next-i18next';
import { useBtc } from '@/state/game/hooks';
import BigNumber from 'bignumber.js';

const Order: FC = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [{ btcgamerecords }] = useBtc();

    const [list, setList] = useState([
        { status: 'pending', direction: 'up' }, //
        { status: 'success', direction: 'down' },
        { status: 'failed', direction: 'up' },
        { status: 'know', direction: 'up' },
        { status: 'success', direction: 'down' },
        { status: 'success', direction: 'down' },
        { status: 'failed', direction: 'up' },
        { status: 'know', direction: 'down' },
        { status: 'success', direction: 'down' },
        { status: 'failed', direction: 'up' },
        { status: 'know', direction: 'up' }
    ]);

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
                {t('common:game:MyGameRecords')}
                <span>{t('common:game:Recent30BetRecords')}</span>
            </header>
            <div className={css.section}>
                {btcgamerecords.map((ele: any, index: number) => (
                    <div className={css.item} key={index}>
                        <div className={css.line}>
                            <div className={css.left}>
                                <span className={css.label}>{t('common:game:BetTime')}:</span>
                                <div>{moment(ele.createtime).format('YYYY.MM.DD HH:mm')}</div>
                            </div>
                            <div className={css.right}>
                                <span className={css.label}>{t('common:game:LotteryStatus')}:</span>
                                <div className={ele.status === 'success' ? css.success : ele.state === 'failed' ? css.fail : ele.state === 'pending' ? css.pending : css.know}>{getFont(ele.state)}</div>
                            </div>
                        </div>
                        <div className={css.line}>
                            <div className={css.left}>
                                <span className={css.label}>{t('common:game:BetAmount')}:</span>
                                <div>
                                    -{ele.amount}
                                    <img src="/images/symbol/NMS.svg" alt="" />
                                    <img src={`/images/rise-fall/${ele.direction === 'up' ? 'up' : 'down'}.svg`} alt="" />
                                </div>
                            </div>
                            <div className={css.right}>
                                <span className={css.label}>{t('common:game:Reward')}:</span>
                                <div>
                                    {ele.state === 'pending' ? (
                                        '--'
                                    ) : (
                                        <>
                                            +{Number(BigNumber(ele.state === 'success' ? ele.rewardamount : ele.integralreward).toFixed(3, 1))} <img src={ele.state === 'success' ? '/images/symbol/NMS.svg' : '/images/stake/color-point.svg'} alt="" />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {btcgamerecords.length === 0 && <NoData />}
            </div>
        </div>
    );
};

export default Order;
