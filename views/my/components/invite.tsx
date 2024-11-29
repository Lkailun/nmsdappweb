import { FC, ReactElement, useMemo } from 'react';

import css from '../styles/invite.module.scss';
import { $copy, $hash } from '@/utils/met';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { useWallet } from '@/hooks';

const Invite: FC = (): ReactElement => {
    const { t }: any = useTranslation<any>(['my']);
    const { account } = useWallet();

    const inviteLink = useMemo(() => {
        if (typeof window === 'undefined') return '';
        return `${window.location.origin}?inviter=${account}`;
    }, [account]);

    return (
        <div className={classNames(css.view)}>
            <h4>{t('common:my:MyInviteLink')}</h4>
            <div className={css.content}>
                <div className={css.text}>{$hash(inviteLink, 18, 12)}</div>
                <div className={css.copy} onClick={() => $copy(inviteLink)}>
                    <img src="/images/my/copy.svg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Invite;
