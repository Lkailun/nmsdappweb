import { FC, ReactElement } from 'react';

import css from '../../styles/rule.module.scss';
import { Modal } from 'antd';

type IProps = {
    onClose: Function;
};
const RuleModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
    return (
        <Modal open={true} footer={null} className={css.view} onCancel={() => onClose()}>
            <h2>等级说明</h2>
            <p>RM:拥有5个直推有效账户,团队算计达到5万T,可以获得团队所有账户默认值产出10%的FLOKI</p>
            <p>MD:在不同线拥有2个RM等级,团队算力达到15万T,可以获得团队所有账户默认值产出20%的FLOKI</p>
            <p>VP:在不同线拥有2个MD等级,团队算力达到50万T,可以获得团队所有账户默认值产出30%的FLOKI</p>
            <p>GM:在不同线拥有2个VP等级,团队算力达到300万T,可以获得团队所有账户默认值产出40%的FLOKI</p>
            <p>CEO:在不同线拥有2个GM等级,团队算力达到600万T,可以获得团队所有账户默认值产出50%的FLOKI</p>
        </Modal>
    );
};

export default RuleModal;
