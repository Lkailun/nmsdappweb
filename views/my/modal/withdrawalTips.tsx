import { FC, ReactElement } from 'react';

import css from '../styles/rechargeTips.module.scss';

import { Modal } from 'antd';
import { Button } from '@/components';

type IProps = {
    onClose: Function;
};
const WithdrawalTipsModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
    return (
        <Modal open={true} footer={null} className={css.view} onCancel={() => onClose()}>
            <h2>提现提示</h2>
            <section>
                <img src="/images/my/success.svg" alt="" />
                <p>
                    您的提现申请已成功提交,目前正在上链中,<span>预计1-3分钟到账,</span>请耐心等待!!!
                </p>
                <Button onClick={onClose}>我知道了</Button>
            </section>
        </Modal>
    );
};

export default WithdrawalTipsModal;
