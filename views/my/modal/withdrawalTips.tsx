import { FC, ReactElement } from 'react';

import css from '../styles/rechargeTips.module.scss';
import { useTranslation } from 'next-i18next';
import { Modal } from 'antd';
import { Button } from '@/components';

type IProps = {
    onClose: Function;
};
const WithdrawalTipsModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    return (
        <Modal open={true} footer={null} className={css.view} onCancel={() => onClose()}>
            <h2>{t('common:my:WithdrawalTips')}</h2>
            <section>
                <img src="/images/my/success.svg" alt="" />
                <p>
                    {t('common:my:WithdrawalTipsContent')}
                    <span>{t('common:my:WithdrawalTipsContent2')}</span>
                    {t('common:my:WithdrawalTipsContent3')}
                </p>
                <Button onClick={onClose}>{t('common:my:IKnow')}</Button>
            </section>
        </Modal>
    );
};

export default WithdrawalTipsModal;
