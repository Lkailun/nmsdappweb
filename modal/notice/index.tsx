import { FC, ReactElement, useEffect, useState } from 'react';

import css from './index.module.scss';
import { Modal } from 'antd';
import { useNoticeModal } from '@/state/base/hooks';
import { useUser } from '@/state/user/hooks';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

const NoticeModal: FC = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [{ config }] = useUser();
    const [, handleNoticeModal] = useNoticeModal();
    const [announcement, setAnnouncement] = useState('');
    useEffect(() => {
        const announcement = config.announcement[0].replace(/\n/g, '<br>');
        setAnnouncement(announcement);
    }, [config.announcement]);
    return (
        <Modal open={true} footer={null} className={classNames(css.view, '_notice')} onCancel={() => config[2] && handleNoticeModal(false)}>
            <header>
                <img src="/images/base/notice-dark.png" alt="" />
                <h4>{t('common:base:Notice')}</h4>
            </header>
            <section>
                {/* <p>{announcement}</p> */}
                <p dangerouslySetInnerHTML={{ __html: announcement }}></p>
                {config.announcement[2] && <div onClick={() => handleNoticeModal(false)}>{t('common:base:Known')}</div>}
            </section>
        </Modal>
    );
};

export default NoticeModal;
