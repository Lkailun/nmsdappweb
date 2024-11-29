'use client';

import { FC, ReactElement, useState } from 'react';
import css from './index.module.scss';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

const Footer: FC<any> = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const navList = [
        { title: 'game', href: '/', icon: 'game', includesPath: ['/', '/lucky-wheel', '/rise-fall'] },
        { title: 'stake', href: '/stake', icon: 'stake', includesPath: ['/stake'] },
        { title: 'my', href: '/my', icon: 'my', includesPath: ['/my'] }
    ];

    const handleNavClick = async (href: string) => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            await router.push(href);
        } catch (error) {
            console.error('Navigation failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && (
                <div className={css.loading}>
                    <div className={css.spinner}></div>
                </div>
            )}
            <footer className={css.footer}>
                {navList.map((ele) => (
                    <div
                        key={ele.href}
                        className={classNames({
                            [css.active]: ele.includesPath.includes(router.pathname),
                            [css.disabled]: isLoading
                        })}
                        onClick={() => handleNavClick(ele.href)}
                    >
                        <img src={`/images/nav/${ele.icon}.svg`} />
                        <span>{t(`common:nav:${ele.title}`)}</span>
                    </div>
                ))}
            </footer>
        </>
    );
};

export default Footer;
