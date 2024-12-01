import { FC, ReactElement, useState } from 'react';
import { $BigNumber, $clearNoNum, $onlyNumber } from '@/utils/met';
import css from '../styles/withdrawalHistory.module.scss';
import { Modal } from 'antd';
import classNames from 'classnames';
import moment from 'moment';
import { useUser } from '@/state/user/hooks';
import { NoData } from '@/components';
import { useTranslation } from 'next-i18next';
type IProps = {
    list: any[];
    onClose: Function;
};
const WithdrawalHistoryModal: FC<IProps> = ({ onClose, list }: IProps): ReactElement => {
    const [{ withdrawrecords }] = useUser();
    const { t }: any = useTranslation<any>(['common']);
    const getStatus = (status: string | number) => {
        let info = { font: '', class: '' };
        switch (status) {
            case 'pending':
                info = { font: t('common:my:Pending'), class: 'pending' };
                break;
            case 'success':
                info = { font: t('common:my:Completed'), class: 'success' };
                break;
            case 'failed':
                info = { font: t('common:my:Failed'), class: 'fail' };
                break;
        }
        return info;
    };

    const openLink = (url: string) => {
        if (!url || typeof window === 'undefined') return;
        window.open(`https://bscscan.com/tx/${url}`);
    };

    return (
        <Modal open={true} footer={null} onCancel={() => onClose()} className={css.view}>
            <h2>{t('common:my:WithdrawalRecord')}</h2>
            <div className={css.content}>
                <div className={css.nav}>
                    <div>{t('common:my:WithdrawalTime')}</div>
                    <div>{t('common:my:WithdrawalAmount')}</div>
                    <div>{t('common:my:Status')}</div>
                </div>
                <div className={classNames(withdrawrecords?.length > 0 ? css.cont : '', 'hidden-scroll')}>
                    {withdrawrecords.map((ele: any) => (
                        <div key={ele._id} className={classNames(css.nav, css.list)}>
                            <div>{moment(ele.createtime).format('YYYY.MM.DD HH:mm')}</div>
                            <div>
                                -{$BigNumber(ele.amount).toFixed(2, 1)}
                                <img src={`/images/symbol/${ele.tokenname.toUpperCase()}.svg`} alt="" />
                            </div>
                            <div className={css[getStatus(ele.state).class]} onClick={() => openLink(ele.claimhash)}>
                                {getStatus(ele.state).font}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {withdrawrecords.length === 0 && <NoData />}
        </Modal>
    );
};

export default WithdrawalHistoryModal;
