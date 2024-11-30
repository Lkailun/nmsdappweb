'use client';

import { FC, ReactElement, useEffect } from 'react';
import css from './index.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

type Props = {
    className?: any;
};

const NoData: FC<Props> = ({ className }): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);

    return (
        <div className={classNames(css.no_data, className)}>
            <img src="/images/no-data-dark.png" alt="" />
            <p>{t('common:base:NoData')}</p>
        </div>
    );
};

export default NoData;
