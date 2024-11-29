import { FC, ReactElement, useState } from 'react';
import { $BigNumber, $clearNoNum, $copy, $hash, $onlyNumber } from '@/utils/met';
import css from '../styles/rechargeHistory.module.scss';
import { Modal } from 'antd';
import classNames from 'classnames';
import moment from 'moment';
import { useUser } from '@/state/user/hooks';
import { NoData } from '@/components';

type IProps = {
    list: any[];
    onClose: Function;
};
const RechargeHistoryModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
    const [{ depositrecords }] = useUser();

    const openLink = (url: string) => {
        typeof window !== 'undefined' && window.open(`https://bscscan.com/tx/${url}`);
    };

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
                    {depositrecords.map((ele: any) => (
                        <div key={ele._id} className={classNames(css.nav, css.list)}>
                            <div>{moment(ele.createtime).format('YYYY.MM.DD HH:mm')}</div>
                            <div>
                                +{$BigNumber(ele.amount).toFixed(2, 1)}
                                <img src={`/images/symbol/${ele.tokenname.toUpperCase()}.svg`} alt="" />
                            </div>
                            <div className={css.success} onClick={() => openLink(ele.hash)}>
                                已完成
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {depositrecords.length === 0 && <NoData />}
        </Modal>
    );
};

export default RechargeHistoryModal;
