import { FC, ReactElement } from 'react';

import css from '../../styles/confirm.module.scss';

import { Modal } from 'antd';
import { Button } from '@/components';

type IProps = {
    onClose: Function;
};
const ConfirmModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
    const params = {
        amount: '',
        index: 10
    };
    const handStake = () => {
        onClose();
    };
    return (
        <Modal open={true} footer={null} className={css.view} onCancel={() => onClose()}>
            <h2>确认下注</h2>
            <section>
                <img src="/images/luckWheel/confirm_title.png" alt="" />
                <p>我已知悉游戏规则</p>
                <p className={css.tip}>确定本局下注0.05NMS</p>
                <Button onClick={handStake}>确认下注</Button>
            </section>
        </Modal>
    );
};

export default ConfirmModal;
