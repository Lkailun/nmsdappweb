import { FC, ReactElement, useState } from 'react';
import { $BigNumber, $clearNoNum, $copy, $hash, $onlyNumber } from '@/utils/met';
import css from '../styles/rechargeHistory.module.scss';
import { Modal } from 'antd';
import classNames from 'classnames';
import moment from 'moment';

type IProps = {
    list: any[];
    onClose: Function;
};
const RechargeHistoryModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
    const getStatus = (status: string | number) => {
        let info = { font: '', class: '' };
        switch (status) {
            case 'review':
                info = { font: '上链中', class: 'pending' };
                break;
            case 'success':
                info = { font: '已完成', class: 'success' };
                break;
            case 'fail':
                info = { font: '失败', class: 'fail' };
                break;
        }
        return info;
    };
    const list = [
        { createtime: '2024-07-12 12:21:12', amount: '12121.231', status: 'review', symbol: 'USDT' },
        { createtime: '2024-07-12 12:21:12', amount: '12121.231', status: 'success', symbol: 'NMS' },
        { createtime: '2024-07-12 12:21:12', amount: '12121.231', status: 'fail', symbol: 'NMS' },
        { createtime: '2024-07-12 12:21:12', amount: '12121.231', status: 'review', symbol: 'USDT' },
        { createtime: '2024-07-12 12:21:12', amount: '12121.231', status: 'success', symbol: 'NMS' },
        { createtime: '2024-07-12 12:21:12', amount: '12121.231', status: 'fail', symbol: 'NMS' },
        { createtime: '2024-07-12 12:21:12', amount: '12121.231', status: 'success', symbol: 'USDT' }
    ];
    return (
        <Modal open={true} footer={null} onCancel={() => onClose()} className={css.view}>
            <h2>充值记录</h2>
            <div className={css.content}>
                <div className={css.nav}>
                    <div>充值时间</div>
                    <div>充值金额</div>
                    <div>状态</div>
                </div>
                <div className={classNames(css.cont, 'hidden-scroll')}>
                    {list.map((ele, index) => (
                        <div key={index} className={classNames(css.nav, css.list)}>
                            <div>{moment(ele.createtime).format('YYYY.MM.DD HH:mm')}</div>
                            <div>
                                -{$BigNumber(ele.amount).toFixed(2, 1)}
                                <img src={`/images/symbol/${ele.symbol}.svg`} alt="" />
                            </div>
                            <div className={css[getStatus(ele.status).class]}>{getStatus(ele.status).font}</div>
                        </div>
                    ))}
                </div>
            </div>
            {list.length === 0 && <p>暂无数据</p>}
        </Modal>
    );
};

export default RechargeHistoryModal;
