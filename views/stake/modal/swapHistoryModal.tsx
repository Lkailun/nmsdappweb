import { FC, ReactElement, useState } from 'react';
import { $BigNumber, $clearNoNum, $onlyNumber } from '@/utils/met';
import css from '../styles/swapHistory.module.scss';
import { Modal } from 'antd';
import classNames from 'classnames';
import moment from 'moment';
import { useUser } from '@/state/user/hooks';
import { NoData } from '@/components';

type IProps = {
    list: any[];
    onClose: Function;
};
const SwapHistoryModal: FC<IProps> = ({ onClose, list }: IProps): ReactElement => {
    const [{ swaprecords }] = useUser();

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
                    {swaprecords.map((ele: any, index: number) => (
                        <div key={index} className={classNames(css.nav, css.list)}>
                            <div>{moment(ele.createtime).format('YYYY.MM.DD HH:mm')}</div>
                            <div>
                                {$BigNumber(ele.nmmamount).toFixed(2, 1)}
                                <img src="/images/stake/point.svg" alt="" />
                            </div>
                            <div>
                                +{$BigNumber(ele.usdtamount).toFixed(4, 1)}
                                <img src={`/images/symbol/USDT.svg`} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {swaprecords.length === 0 && <NoData />}
        </Modal>
    );
};

export default SwapHistoryModal;
