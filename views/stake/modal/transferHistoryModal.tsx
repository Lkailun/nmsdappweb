import { FC, ReactElement, useState } from 'react';
import { $BigNumber, $clearNoNum, $copy, $hash, $onlyNumber } from '@/utils/met';
import css from '../styles/transferHistory.module.scss';
import { Modal } from 'antd';
import classNames from 'classnames';
import moment from 'moment';

type IProps = {
    list: any[];
    onClose: Function;
};
const TransferHistoryModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
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
    const list = [
        { createtime: '2024-07-12 12:21:12', amount: '121.21', receive: '0x0B8996cA85955f6545bFAa63c931b7328886Db69', type: 'in' },
        { createtime: '2024-07-12 12:21:12', amount: '121.21', receive: '0x0B8996cA85955f6545bFAa63c931b7328886Db69', type: 'out' },
        { createtime: '2024-07-12 12:21:12', amount: '121.21', receive: '0x0B8996cA85955f6545bFAa63c931b7328886Db69', type: 'in' },
        { createtime: '2024-07-12 12:21:12', amount: '121.21', receive: '0x0B8996cA85955f6545bFAa63c931b7328886Db69', type: 'in' },
        { createtime: '2024-07-12 12:21:12', amount: '121.21', receive: '0x0B8996cA85955f6545bFAa63c931b7328886Db69', type: 'out' },
        { createtime: '2024-07-12 12:21:12', amount: '121.21', receive: '0x0B8996cA85955f6545bFAa63c931b7328886Db69', type: 'in' },
        { createtime: '2024-07-12 12:21:12', amount: '121.21', receive: '0x0B8996cA85955f6545bFAa63c931b7328886Db69', type: 'in' },
        { createtime: '2024-07-12 12:21:12', amount: '121.21', receive: '0x0B8996cA85955f6545bFAa63c931b7328886Db69', type: 'out' },
        { createtime: '2024-07-12 12:21:12', amount: '121.21', receive: '0x0B8996cA85955f6545bFAa63c931b7328886Db69', type: 'in' },
        { createtime: '2024-07-12 12:21:12', amount: '121.21', receive: '0x0B8996cA85955f6545bFAa63c931b7328886Db69', type: 'in' },
        { createtime: '2024-07-12 12:21:12', amount: '121.21', receive: '0x0B8996cA85955f6545bFAa63c931b7328886Db69', type: 'out' },
        { createtime: '2024-07-12 12:21:12', amount: '121.21', receive: '0x0B8996cA85955f6545bFAa63c931b7328886Db69', type: 'in' },
        { createtime: '2024-07-12 12:21:12', amount: '121.21', receive: '0x0B8996cA85955f6545bFAa63c931b7328886Db69', type: 'in' },
        { createtime: '2024-07-12 12:21:12', amount: '121.21', receive: '0x0B8996cA85955f6545bFAa63c931b7328886Db69', type: 'out' },
        { createtime: '2024-07-12 12:21:12', amount: '121.21', receive: '0x0B8996cA85955f6545bFAa63c931b7328886Db69', type: 'in' },
        { createtime: '2024-07-12 12:21:12', amount: '121.21', receive: '0x0B8996cA85955f6545bFAa63c931b7328886Db69', type: 'in' },
        { createtime: '2024-07-12 12:21:12', amount: '121.21', receive: '0x0B8996cA85955f6545bFAa63c931b7328886Db69', type: 'out' },
        { createtime: '2024-07-12 12:21:12', amount: '121.21', receive: '0x0B8996cA85955f6545bFAa63c931b7328886Db69', type: 'in' },
        { createtime: '2024-07-12 12:21:12', amount: '121.21', receive: '0x0B8996cA85955f6545bFAa63c931b7328886Db69', type: 'out' }
    ];
    return (
        <Modal open={true} footer={null} onCancel={() => onClose()} className={css.view}>
            <h2>积分转移记录</h2>
            <div className={css.content}>
                <div className={css.nav}>
                    <div>充值时间</div>
                    <div>充值金额</div>
                    <div>状态</div>
                </div>
                <div className={classNames(css.cont, 'hidden-scroll')}>
                    {list.map((ele, index) => (
                        <div key={index} className={classNames(css.nav, css.list)}>
                            <div>{moment(ele.createtime).format('MM.DD HH:mm')}</div>
                            <div className={css[ele.type]}>{ele.type === 'in' ? '转入' : '转出'}</div>
                            <div>
                                {$hash(ele.receive, 4, 3)} <img className={css.copy} onClick={() => $copy(ele.receive)} src="/images/my/copy1.svg" alt="" />
                            </div>
                            <div>
                                {ele.amount} <img className={css.symbol} src="/images/stake/color-point.svg" alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {list.length === 0 && <p>暂无数据</p>}
        </Modal>
    );
};

export default TransferHistoryModal;
