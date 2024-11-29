import { FC, ReactElement } from 'react';

import css from '../styles/rechargeTips.module.scss';
import { useTranslation } from 'next-i18next';
import { Modal } from 'antd';
import { Button } from '@/components';

type IProps = {
    onClose: Function;
};
const RechargeTipsModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    return (
        <Modal open={true} footer={null} className={css.view} onCancel={() => onClose()}>
            <h2>{t('common:my:RechargeTips')}</h2>
            <section>
                <img src="/images/my/success.svg" alt="" />
                <p>
                    {t('common:my:RechargeTipsContent')}
                    <span>{t('common:my:RechargeTipsContent2')}</span>
                    {t('common:my:RechargeTipsContent3')}
                </p>
                <Button onClick={onClose}>{t('common:my:IKnow')}</Button>
            </section>
        </Modal>
    );
};

export default RechargeTipsModal;
