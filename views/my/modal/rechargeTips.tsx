import { FC, ReactElement } from 'react';

import css from '../styles/rechargeTips.module.scss';

import { Modal } from 'antd';
import { Button } from '@/components';

type IProps = {
    onClose: Function;
};
const RechargeTipsModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
    return (
        <Modal open={true} footer={null} className={css.view} onCancel={() => onClose()}>
            <h2>充值提示</h2>
            <section>
                <img src="/images/my/success.svg" alt="" />
                <p>
                    您的充值正在上链,服务器正在处理中,<span>预计1-3分钟到账,</span>稍后您可通过刷新查看具体信息!!
                </p>
                <Button onClick={onClose}>我知道了</Button>
            </section>
        </Modal>
    );
};

export default RechargeTipsModal;
