import { FC, ReactElement, useMemo } from 'react';
import css from '../styles/invite.module.scss';
import { IconCopy } from '@/components/Icon';
import { useWallet } from '@/hooks';
import { useUser } from '@/state/user/hooks';
import { $BigNumber, $copy, $hash } from '@/utils/met';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

const Invite: FC = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [{ userinfo, orderinfo }] = useUser();
    const { account } = useWallet();

    const inviteLink = useMemo(() => {
        if (typeof window === 'undefined') return '';
        return `${window.location.origin}?inviter=${account}`;
    }, [account]);

    return (
        <div className={classNames(css.view, 'animate__animated animate__flipInX')}>
            <h4>{t('common:team:MyInvitationLink')}</h4>
            <div className={css.content}>
                <div className={css.text}>{$hash(orderinfo.length !== 0 ? inviteLink : t('common:team:NoEffectiveComputingPower'), 24, 7)}</div>
                <div className={css.copy}>
                    <IconCopy onClick={() => orderinfo.length !== 0 && $copy(inviteLink)} />
                </div>
            </div>
        </div>
    );
};

export default Invite;
