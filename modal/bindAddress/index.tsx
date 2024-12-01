import { FC, ReactElement, useEffect, useLayoutEffect, useState } from 'react';

import css from './index.module.scss';
import { message, Modal } from 'antd';
import Button from '@/components/Button';
import { $trim } from '@/utils/met';
import { useWallet, useSign } from '@/hooks';
import { useAuth, useInviter, useUser } from '@/state/user/hooks';
import { useBindModal } from '@/state/base/hooks';
import Server from '@/service/api';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

type IProps = {
    onClose: Function;
};
const BindAddressModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [inviter] = useInviter();
    const [address, setAddress] = useState<string>(inviter);
    const [loading, setLoading] = useState<boolean>(false);
    const [auth] = useAuth();
    const { account } = useWallet();
    const [, { fetchUser }] = useUser();
    const [, setBindModal] = useBindModal();

    const handBind = async () => {
        try {
            if (Date.now() > auth.expired) throw new Error(t('common:base:SignatureExpired'));
            setLoading(true);
            const params = {
                address: account!,
                inviter: address
            };
            const sign = { message: auth.message, signature: auth.signature };
            const { code, data, msg }: any = await Server.register(params, sign);
            if (code !== 200) throw new Error(msg);
            message.success(msg || t('common:base:BindingSuccessful'));
            fetchUser(account!, sign);
            setBindModal(false);
        } catch (e: any) {
            message.error(e.message || t('common:base:BindingFailed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={true} footer={null} className="bind-modal" onCancel={() => message.warning(t('common:base:PleaseBindInviterFirst'))}>
            <div className={css.view}>
                <header>{t('common:base:BindingInviter')}</header>

                <p className={css.label}>{t('common:base:CurrentlyBindingInviter')}:</p>
                <div className={css.input}>
                    <input type="text" maxLength={42} value={address.length == 42 ? `${address.slice(0, 12)}...${address.slice(-12)}` : address} placeholder={t("common:base:PleaseEnterTheInviter'sAddress")} onChange={(e: any) => setAddress($trim(e))} />
                </div>
                <Button disabled={address.length !== 42} loading={loading} onClick={() => handBind()}>
                    <img className={css.icon} src="/images/base/bind.svg" alt="" />
                    {t('common:base:ConfirmBinding')}
                </Button>
            </div>
        </Modal>
    );
};

export default BindAddressModal;
