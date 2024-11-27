import { FC, ReactElement } from 'react';

import css from '../../../stake/styles/rule.module.scss';
import { Modal } from 'antd';

type IProps = {
    onClose: Function;
};
const RuleModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
    return (
        <Modal open={true} footer={null} className={css.view} onCancel={() => onClose()}>
            <h2>幸运转转转游戏规则</h2>
            <section>
                <div>
                    <span>1</span>每局16个空位,每个空位仅限1人,可押注不同金额
                </div>
                <div>
                    <span>2</span>每局封顶16人,满3人后激活开奖倒计时30秒
                </div>
                <div>
                    <span>3</span>每局在16个位置中随机选择1个作为赢家,如果中奖位置为空,押注金额全额退还
                </div>
                <div>
                    <span>4</span>赢家将获得押注金额U价值50%等值的游戏积分
                </div>
                <div>
                    <span>5</span>赢家押注金额的80%将被瓜分给未中奖玩家(根据下注金额比例)
                </div>
                <div>
                    <span>6</span>赢家押注金额的5%将用于推荐返佣，15%将直接销毁
                </div>
            </section>
        </Modal>
    );
};

export default RuleModal;
