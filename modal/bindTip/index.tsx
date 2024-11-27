import { FC, ReactElement, useState } from 'react';

import css from './index.module.scss';
import { message, Modal } from 'antd';
import Button from '@/components/Button';
import { $trim } from '@/utils/met';
import { useWallet } from '@/hooks';
import { useInviter, useUser } from '@/state/user/hooks';
import { useBindInviteTipModal, useBindModal } from '@/state/base/hooks';
import Server from '@/service/api';

type IProps = {
    onClose: Function;
    onOk: Function;
};
const BindTipModal: FC<IProps> = ({ onClose, onOk }: IProps): ReactElement => {
    return (
        <Modal open={true} footer={null} className="bind-modal" onCancel={() => onClose()}>
            <div className={css.view}>
                <img className={css.icon} src="/images/warn.svg" alt="" />
                <div className={css.tip}>
                    <span>注意:</span>
                    当前帐户没有邀请人,
                    <br />
                    请通过邀请链接进入完成绑定
                </div>
                <Button onClick={onOk}>继续购买</Button>
            </div>
        </Modal>
    );
};

export default BindTipModal;
