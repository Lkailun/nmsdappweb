import { FC, ReactElement } from 'react';

import css from '../styles/confirmStake.module.scss';
import { Modal } from 'antd';
import { Button } from '@/components';

type IProps = {
    onClose: Function;
};
const ConfirmStakeModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
    const handStake = () => {
        onClose();
    };
    return (
        <Modal open={true} footer={null} className={css.view} onCancel={() => onClose()}>
            <h2>确认操作</h2>
            <section>
                <p>我已知悉质押规则,确定将 </p>
                <p className={css.tip}>100USDT+100游戏积分</p>
                <p>进行质押</p>
                <Button onClick={handStake}>确认质押</Button>
            </section>
        </Modal>
    );
};

export default ConfirmStakeModal;
