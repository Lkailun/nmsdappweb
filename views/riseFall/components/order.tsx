import { FC, ReactElement, useState } from 'react';
import css from '../styles/order.module.scss';
import { Button, NoData } from '@/components';
import moment from 'moment';

import { useTranslation } from 'react-i18next';
import { useBtc } from '@/state/game/hooks';

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
                return '等待开奖';
            case 'success':
                return '已中奖';
            case 'failed':
                return '未中奖';
            default:
                return '无人获奖';
        }
    };

    return (
        <div className={css.view}>
            <header>
                我的游戏记录
                <span>(最近30条下注记录)</span>
            </header>
            <div className={css.section}>
                {btcgamerecords.map((ele: any, index: number) => (
                    <div className={css.item} key={index}>
                        <div className={css.line}>
                            <div className={css.left}>
                                <span className={css.label}>竞猜时间::</span>
                                <div>{moment(ele.createtime).format('YYYY.MM.DD HH:mm')}</div>
                            </div>
                            <div className={css.right}>
                                <span className={css.label}>开奖状态:</span>
                                <div className={ele.status === 'success' ? css.success : ele.state === 'failed' ? css.fail : ele.state === 'pending' ? css.pending : css.know}>{getFont(ele.state)}</div>
                            </div>
                        </div>
                        <div className={css.line}>
                            <div className={css.left}>
                                <span className={css.label}>竞猜金额:</span>
                                <div>
                                    -{ele.amount}
                                    <img src="/images/symbol/NMS.svg" alt="" />
                                    <img src={`/images/rise-fall/${ele.direction === 'up' ? 'up' : 'down'}.svg`} alt="" />
                                </div>
                            </div>
                            <div className={css.right}>
                                <span className={css.label}>获得奖励:</span>
                                <div>
                                    {ele.state === 'pending' ? (
                                        '--'
                                    ) : (
                                        <>
                                            +{ele.state === 'success' ? ele.rewardamount : ele.integralreward} <img src={ele.state === 'success' ? '/images/stake/color-point.svg' : '/images/symbol/NMS.svg'} alt="" />
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
