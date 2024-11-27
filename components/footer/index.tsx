'use client';

import { FC, ReactElement } from 'react';
import css from './index.module.scss';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const Footer: FC<any> = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);

    const router = useRouter();
    const navList = [
        { title: 'game', href: '/', icon: 'game', includesPath: ['/', '/lucky-wheel', '/rise-fall'] },
        { title: 'stake', href: '/stake', icon: 'stake', includesPath: ['/stake'] },
        { title: 'my', href: '/my', icon: 'my', includesPath: ['/my'] }
    ];

    return (
        <footer className={css.footer}>
            {navList.map((ele) => (
                <div key={ele.href} className={ele.includesPath.includes(router.pathname) ? css.active : ''} onClick={() => router.push(ele.href)}>
                    <img src={`/images/nav/${ele.icon}.svg`} />
                    <span>{t(`common:nav:${ele.title}`)}</span>
                </div>
            ))}
        </footer>
    );
};

export default Footer;
