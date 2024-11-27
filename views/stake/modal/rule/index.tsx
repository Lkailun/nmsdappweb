import { FC, ReactElement } from 'react';

import css from '../../styles/rule.module.scss';
import { Modal } from 'antd';

type IProps = {
    onClose: Function;
};
const RuleModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
    return (
        <Modal open={true} footer={null} className={css.view} onCancel={() => onClose()}>
            <h2>质押规则</h2>
            <section>
                <div>
                    <span>1</span>1份质押 = 100USDT + 100U价值游戏积分
                </div>
                <div>
                    <span>2</span>每天上午9点产出1%USDT金本位价值的游戏代币NMM
                </div>
                <div>
                    <span>3</span>游戏代币可随时根据当天价格闪兑成USDT,游戏代币价格将在每天上午8点更新
                </div>
            </section>
        </Modal>
    );
};

export default RuleModal;
