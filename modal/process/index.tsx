import { FC, ReactElement, useEffect, useState } from 'react';

import css from './index.module.scss';
import { Modal } from 'antd';
import { useProcessModal } from '@/state/base/hooks';

const ProcessModal: FC = (): ReactElement => {
    const [{ time }, { handProcessModal, handProcess }] = useProcessModal();

    useEffect(() => {
        handProcess();
    }, []);
    return (
        <Modal open={true} footer={null} onCancel={() => handProcessModal(false)} className={css.view}>
            <header>链上数据确认中</header>
            <img src="/images/loadding.svg" alt="" />
            <p className={css.tips}>预计链上确认时间{time}秒</p>
        </Modal>
    );
};

export default ProcessModal;
