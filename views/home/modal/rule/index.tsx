import { FC, ReactElement } from 'react';

import css from '../../styles/rule.module.scss';
import { Modal } from 'antd';

type IProps = {
    onClose: Function;
};
const RuleModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
    return (
        <Modal open={true} footer={null} className={css.view} onCancel={() => onClose()}>
            <h2>算力说明</h2>
            <p>USDT购买算力,1 USDT = 1 T</p>
            <p>质押算力空投 Floki 币</p>
            <p>单个账户最低算力为 100 T,最高 3000 T</p>
            <p>每日产出算力 0.7%-1% 的 Floki 币(金本位)</p>
        </Modal>
    );
};

export default RuleModal;
