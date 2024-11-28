import { FC, ReactElement } from 'react';

import css from '../../styles/confirm.module.scss';

import { Modal } from 'antd';
import { Button } from '@/components';
import classNames from 'classnames';

type IProps = {
    onClose: Function;
};
const ConfirmModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
    const params = {
        type: 'fall' // rise:看涨 fall:看跌
    };
    const handStake = () => {
        onClose();
    };
    return (
        <Modal open={true} footer={null} className={css.view} onCancel={() => onClose()}>
            <h2>确认下注</h2>
            <section>
                <img src="/images/rise-fall/confirm_title.png" alt="" />
                <p>我已知悉游戏规则</p>
                <p className={classNames(css.tip, css[params.type])}>确定下注0.05NMS看涨</p>
                <p className={css.fontWeight}>下一根3分钟K线</p>
                <Button onClick={handStake}>确认下注</Button>
            </section>
        </Modal>
    );
};

export default ConfirmModal;
