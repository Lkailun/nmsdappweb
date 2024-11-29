import { FC, ReactElement, useState } from 'react';
import css from '../styles/order.module.scss';
import { Button, NoData } from '@/components';
import { useUser } from '@/state/user/hooks';
import moment from 'moment';
import { $diffDate, $toFixed } from '@/utils/met';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';

const Order: FC = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    // const [{ orderinfo }] = useUser();
    const [list, setList] = useState([
        { status: 'pending', direction: 'up' }, //
        { status: 'success', direction: 'down' },
        { status: 'fail', direction: 'up' },
        { status: 'know', direction: 'up' },
        { status: 'success', direction: 'down' },
        { status: 'success', direction: 'down' },
        { status: 'fail', direction: 'up' },
        { status: 'know', direction: 'down' },
        { status: 'success', direction: 'down' },
        { status: 'fail', direction: 'up' },
        { status: 'know', direction: 'up' }
    ]);

    const getFont = (status: string) => {
        switch (status) {
            case 'pending':
                return '等待开奖';
            case 'success':
                return '已中奖';
            case 'fail':
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
                {list.map((ele: any, index: number) => (
                    <div className={css.item} key={index}>
                        <div className={css.line}>
                            <div className={css.left}>
                                <span className={css.label}>竞猜时间::</span>
                                <div>2024.10.12 12:00</div>
                            </div>
                            <div className={css.right}>
                                <span className={css.label}>开奖状态:</span>
                                <div className={ele.status === 'success' ? css.success : ele.status === 'fail' ? css.fail : ele.status === 'pending' ? css.pending : css.know}>{getFont(ele.status)}</div>
                            </div>
                        </div>
                        <div className={css.line}>
                            <div className={css.left}>
                                <span className={css.label}>竞猜金额:</span>
                                <div>
                                    -0.005
                                    <img src="/images/symbol/NMS.svg" alt="" />
                                    <img src={`/images/rise-fall/${ele.direction === 'up' ? 'up' : 'down'}.svg`} alt="" />
                                </div>
                            </div>
                            <div className={css.right}>
                                <span className={css.label}>获得奖励:</span>
                                <div>
                                    {ele.status === 'pending' ? (
                                        '--'
                                    ) : (
                                        <>
                                            +1.3 <img src="/images/stake/color-point.svg" alt="" />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {list.length === 0 && <NoData />}
            </div>
        </div>
    );
};

export default Order;
