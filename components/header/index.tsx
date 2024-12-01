'use client';

import { FC, ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react';
import css from './index.module.scss';
import { useChainModal, useConnectModal, useAccountModal } from '@rainbow-me/rainbowkit';
import { useWallet, useThrottled } from '@/hooks';
import { $hash } from '@/utils/met';
import { useUser } from '@/state/user/hooks';
import { useTranslation } from 'next-i18next';
import { useWalletClient } from 'wagmi';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { Storage } from '@/utils/storage';
import { useVoice } from '@/state/base/hooks';

const langs = [
    { icon: 'zh', title: '中文', key: 'zh' },
    { icon: 'en', title: 'EN', key: 'en' }
];

const Header: FC<any> = (): ReactElement => {
    const { t, i18n }: any = useTranslation<any>(['common']);
    const contentRef = useRef<any>(null);
    const domRef = useRef<any>(null);
    const [show, setShow] = useState<boolean>(false);
    const [voice, handVoice] = useVoice();
    const router = useRouter();

    const { openConnectModal } = useConnectModal();
    const { openChainModal } = useChainModal();
    const { openAccountModal } = useAccountModal();
    const { ready, account } = useWallet();
    const [, { login }] = useUser();

    const action = async () => {
        if (ready) {
            openAccountModal!();
        } else if (account) {
            openChainModal!();
        } else {
            openConnectModal!();
        }
    };

    const handleDocumentClick = async (event: MouseEvent) => {
        if (show && domRef.current && !domRef.current.contains(event.target as Node)) {
            setShow(false);
        }
    };

    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang);
        setShow(false);
    };

    useLayoutEffect(() => {
        if (!ready) return;
        login();
    }, [ready, account]);

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [show]);
    useEffect(() => {
        i18n.changeLanguage('zh');
    }, []);

    // useEffect(() => {
    //     console.log('router', router);
    // }, [router]);

    return (
        <header className={classNames(css.header, ['/rise-fall', '/lucky-wheel'].includes(router.pathname) ? css.opacity : '')}>
            <img className={css.logo} src="/images/logo-title.png" alt="" />
            <div className={css.content}>
                <img onClick={() => handVoice(voice === 'open' ? 'close' : 'open')} className={css.voice} src={`/images/base/${voice === 'open' ? 'voice' : 'mute'}.svg`} alt="" />
                <div className={css.lang} ref={domRef}>
                    <img onClick={() => setShow(!show)} src="/images/lang.svg" alt="" />
                    <div
                        className={css.modal}
                        ref={contentRef}
                        style={{
                            height: show ? contentRef.current?.scrollHeight + 'px' : '0'
                        }}
                    >
                        <section>
                            {langs.map((item) => (
                                <div key={item.key} onClick={() => changeLang(item.key)}>
                                    <img src={`/images/langs/${item.icon}.svg`} alt="" />
                                    {item.title}
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
                <div className={css.wallet} onClick={() => action()}>
                    <img src="/images/wallet.svg" alt="" />
                    {ready ? $hash(account, 4, 6) : account ? t('common:base:SwitchChain') : t('common:base:connectWallet')}
                </div>
            </div>
        </header>
    );
};

export default Header;
