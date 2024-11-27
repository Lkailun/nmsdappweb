import { FC, ReactElement, useMemo, useState } from 'react';
import css from '../styles/list.module.scss';
import { IconCopy } from '@/components/Icon';
import classNames from 'classnames';
import _ from 'lodash';
import { useUser } from '@/state/user/hooks';
import { $copy, $hash } from '@/utils/met';
import CountUp from 'react-countup';
import { NoData } from '@/components';
import { useTranslation } from 'react-i18next';

const menu = [
    { label: 'team', value: 'team' },
    { label: 'direct', value: 'direct' }
];

const Item: FC<{ [key: string]: any }> = ({ data, address }): ReactElement => {
    return (
        <div className={css.item}>
            <div>{data[0] === 0 ? '--' : <img src={`/images/team/${data[0]}.svg`} alt="" />}</div>
            <div>
                {$hash(address, 4)}
                <IconCopy onClick={() => $copy(address)} />
            </div>
            <div>
                <CountUp end={data[1]} />
            </div>
            <div>
                <CountUp end={data[2]} />
                &nbsp;T
            </div>
        </div>
    );
};

const List: FC = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);

    const [{ userinfo }] = useUser();
    const [check, setCheck] = useState('team');

    const direct = useMemo(() => {
        return _.intersection(userinfo.teamlist, Object.keys(userinfo?.allvalidteam || {}));
    }, [userinfo]);

    const list = useMemo(() => {
        let _list = direct;
        if (check === 'team') _list = Object.keys(userinfo?.allvalidteam || {});
        const _d = _list.map((ele) => ({ address: ele, data: userinfo.allvalidteam[ele] }));

        return _d.sort((cur, next) => {
            if (cur.data[2] > next.data[2]) {
                return -1;
            }
            if (cur.data[2] < next.data[2]) {
                return 1;
            }
            return 0;
        });

        // return _list;
    }, [check, userinfo.allvalidteam, direct]);
    return (
        <div className={css.view}>
            {menu.map((ele) => (
                <img key={ele.value} className={classNames(css[ele.value], css.tag, check === ele.value ? css.active : '')} src={`/images/team/${ele.value}-dark.png`} alt="" />
            ))}
            <header>
                {menu.map((ele) => (
                    <div key={ele.value} className={check === ele.value ? css.active : ''} onClick={() => setCheck(ele.value)}>
                        {t(`common:team:${ele.label}`)}
                    </div>
                ))}
            </header>
            <div className={css.section}>
                <div className={css.nav}>
                    <div>{t('common:team:Level')}</div>
                    <div>{t('common:team:Address')}</div>
                    <div>{t('common:team:TeamSize')}</div>
                    <div>{t('common:team:TeamPerformance')}</div>
                </div>
                {list.map((ele: any, index: number) => (
                    <Item key={index} address={ele.address} data={ele.data || {}} />
                ))}
                {list.length === 0 && <NoData />}
            </div>
        </div>
    );
};

export default List;
