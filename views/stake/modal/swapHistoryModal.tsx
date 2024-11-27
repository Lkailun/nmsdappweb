import { FC, ReactElement, useState } from 'react';
import { $BigNumber, $clearNoNum, $onlyNumber } from '@/utils/met';
import css from '../styles/swapHistory.module.scss';
import { Modal } from 'antd';
import classNames from 'classnames';
import moment from 'moment';

type IProps = {
    list: any[];
    onClose: Function;
};
const SwapHistoryModal: FC<IProps> = ({ onClose, list }: IProps): ReactElement => {
    const getStatus = (status: string | number) => {
        let info = { font: '', class: '' };
        switch (status) {
            case 'review':
                info = { font: '審核中', class: 'approve' };
                break;
            case 'success':
                info = { font: '已發放', class: 'send' };
                break;
            case 'reject':
                info = { font: '已駁回', class: 'back' };
                break;
        }
        return info;
    };
    list = [
        { createtime: '2024-07-12 12:21:12', amount: '12121.231', got: 232.24 },
        { createtime: '2024-07-12 12:21:12', amount: '12121.231', got: 232.24 },
        { createtime: '2024-07-12 12:21:12', amount: '12121.231', got: 232.24 },
        { createtime: '2024-07-12 12:21:12', amount: '12121.231', got: 232.24 }
    ];
    return (
        <Modal open={true} footer={null} onCancel={() => onClose()} className={css.view}>
            <h2>闪兑记录</h2>
            <div className={css.content}>
                <div className={css.nav}>
                    <div>闪兑时间</div>
                    <div>卖出NMM</div>
                    <div>获得USDT</div>
                </div>
                <div className={classNames(css.cont, 'hidden-scroll')}>
                    {list.map((ele, index) => (
                        <div key={index} className={classNames(css.nav, css.list)}>
                            <div>{moment(ele.createtime).format('YYYY.MM.DD HH:mm')}</div>
                            <div>
                                -{$BigNumber(ele.amount).toFixed(2, 1)}
                                <img src="/images/stake/point.svg" alt="" />
                            </div>
                            <div>
                                +{ele.got}
                                <img src={`/images/symbol/USDT.svg`} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {list.length === 0 && <p>暂无数据</p>}
        </Modal>
    );
};

export default SwapHistoryModal;
