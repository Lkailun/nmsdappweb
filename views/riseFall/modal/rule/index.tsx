import { FC, ReactElement } from 'react';

import css from '../../../stake/styles/rule.module.scss';

import { Modal } from 'antd';

type IProps = {
    onClose: Function;
};
const RuleModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
    return (
        <Modal open={true} footer={null} className={css.view} onCancel={() => onClose()}>
            <h2>BTC猜涨跌游戏规则</h2>
            <section>
                <div>
                    <span>1</span>只竞猜下一根3分钟K线，竞猜结果将在下一根3分钟K线结束后10秒内公布
                </div>
                <div>
                    <span>2</span>可押注不同金额的NMS,下一根3分钟K线开始前30秒内不可下注
                </div>
                <div>
                    <span>3</span>竞猜失败获得押注金额U价值50%等值的游戏积分(1积分=1U)
                </div>
                <div>
                    <span>4</span>竞猜成功获得80%的押注金额奖励,5%将用于推荐返佣,15%将直接销毁
                </div>
            </section>
        </Modal>
    );
};

export default RuleModal;
