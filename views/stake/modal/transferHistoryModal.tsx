import { FC, ReactElement, useState } from 'react';
import { $BigNumber, $clearNoNum, $copy, $hash, $onlyNumber } from '@/utils/met';
import css from '../styles/transferHistory.module.scss';
import { Modal } from 'antd';
import classNames from 'classnames';
import moment from 'moment';
import { useWallet } from '@/hooks';
import { useUser } from '@/state/user/hooks';
import { NoData } from '@/components';
import { useTranslation } from 'next-i18next';
type IProps = {
    list: any[];
    onClose: Function;
};
const TransferHistoryModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [{ integraltransferrecords }] = useUser();
    const { account } = useWallet();
    return (
        <Modal open={true} footer={null} onCancel={() => onClose()} className={css.view}>
            <h2>{t('common:stake:TransferRecord')}</h2>
            <div className={css.content}>
                <div className={css.nav}>
                    <div>{t('common:stake:StartTime')}</div>
                    <div>{t('common:stake:Type')}</div>
                    <div>{t('common:stake:OppositeAddress')}</div>
                    <div>{t('common:stake:TransferAmount')}</div>
                </div>
                <div className={classNames(integraltransferrecords?.length > 0 ? css.cont : '', 'hidden-scroll')}>
                    {integraltransferrecords.map((ele: any, index: number) => (
                        <div key={index} className={classNames(css.nav, css.list)}>
                            <div>{moment(ele.createtime).format('YYYY.MM.DD HH:mm')}</div>
                            <div className={css[ele.from === account?.toLowerCase() ? 'out' : 'in']}>{ele.from === account?.toLowerCase() ? t('common:stake:TransferOut') : t('common:stake:TransferIn')}</div>
                            <div>
                                {$hash(ele.from === account?.toLowerCase() ? ele.to : ele.from, 3, 5)}
                                <img className={css.copy} onClick={() => $copy(ele.from)} src="/images/my/copy1.svg" alt="" />
                            </div>
                            <div>
                                {ele.amount} <img className={css.symbol} src="/images/stake/color-point.svg" alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {integraltransferrecords.length === 0 && <NoData />}
        </Modal>
    );
};

export default TransferHistoryModal;
