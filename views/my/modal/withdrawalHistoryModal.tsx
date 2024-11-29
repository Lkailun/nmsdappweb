import { FC, ReactElement, useState } from 'react';
import { $BigNumber, $clearNoNum, $onlyNumber } from '@/utils/met';
import css from '../styles/withdrawalHistory.module.scss';
import { Modal } from 'antd';
import classNames from 'classnames';
import moment from 'moment';
import { useUser } from '@/state/user/hooks';
import { NoData } from '@/components';

type IProps = {
    list: any[];
    onClose: Function;
};
const WithdrawalHistoryModal: FC<IProps> = ({ onClose, list }: IProps): ReactElement => {
    const [{ withdrawrecords }] = useUser();

    const getStatus = (status: string | number) => {
        let info = { font: '', class: '' };
        switch (status) {
            case 'pending':
                info = { font: '上链中', class: 'pending' };
                break;
            case 'success':
                info = { font: '已完成', class: 'success' };
                break;
            case 'failed':
                info = { font: '失败', class: 'fail' };
                break;
        }
        return info;
    };
    list = [
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
            <h2>提现记录</h2>
            <div className={css.content}>
                <div className={css.nav}>
                    <div>提现时间</div>
                    <div>提现金额</div>
                    <div>状态</div>
                </div>
                <div className={classNames(css.cont, 'hidden-scroll')}>
                    {withdrawrecords.map((ele: any) => (
                        <div key={ele._id} className={classNames(css.nav, css.list)}>
                            <div>{moment(ele.createtime).format('YYYY.MM.DD HH:mm')}</div>
                            <div>
                                -{$BigNumber(ele.amount).toFixed(2, 1)}
                                <img src={`/images/symbol/${ele.tokenname.toUpperCase()}.svg`} alt="" />
                            </div>
                            <div className={css[getStatus(ele.state).class]}>{getStatus(ele.state).font}</div>
                        </div>
                    ))}
                </div>
            </div>
            {list.length === 0 && <NoData />}
        </Modal>
    );
};

export default WithdrawalHistoryModal;
