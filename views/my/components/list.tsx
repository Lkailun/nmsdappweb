import { FC, ReactElement, SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import css from '../styles/list.module.scss';
import { useUser } from '@/state/user/hooks';
import { $copy, $hash, $sleep } from '@/utils/met';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { NoData } from '@/components';
import CountUp from 'react-countup';
import moment from 'moment';
import 'moment/locale/zh-cn';

const List: FC = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const [{ userinfo }] = useUser();

    const total = useMemo(() => {
        return userinfo.teamlist.reduce((pre: number, cur: any) => {
            return pre + cur.totalgamecount;
        }, 0);
    }, [userinfo.teamlist]);

    useEffect(() => {
        moment.locale('zh-cn');
    }, []);

    return (
        <div className={css.view}>
            <h4>{t('common:my:MyTeam')}</h4>
            <header>
                <div className={css.item}>
                    <img className={css.img} src="/images/my/people.svg" alt="" />
                    <p>{t('common:my:MyDirectReferrals')}</p>
                    <h5>
                        <CountUp decimals={0} end={userinfo.teamlist.length} />
                    </h5>
                </div>
                <div className={css.item}>
                    <img className={css.img} src="/images/my/other.svg" alt="" />
                    <p>{t('common:my:TeamCumulativeGames')}</p>
                    <h5>
                        <CountUp decimals={0} end={total} />
                    </h5>
                </div>
                <div className={css.item}>
                    <img className={css.img} src="/images/my/fanyong.svg" alt="" />
                    <p>{t('common:my:MyCumulativeRebate')}</p>
                    <h5>
                        <CountUp decimals={6} end={userinfo.totalrebatenms} /> <img src="/images/symbol/NMS.svg" alt="" />
                    </h5>
                </div>
            </header>
            <section>
                <div className={classNames(css.nav, css.td)}>
                    <div>{t('common:my:UserAddress')}</div>
                    <div>{t('common:my:CumulativeGames')}</div>
                    <div>{t('common:my:CumulativeAmount')}</div>
                    <div>{t('common:my:RecentGame')}</div>
                </div>
                <div className={css.max_content}>
                    {userinfo.teamlist.map((item: any) => (
                        <div key={item._id} className={classNames(css.td, css.item)}>
                            <div className={css.user}>
                                {$hash(item.address, 3, 5)}
                                <img className={css.copy} onClick={() => $copy(item.address)} src="/images/my/copy1.svg" alt="" />
                            </div>
                            <div className={css.total}>
                                <CountUp decimals={0} end={item.totalgamecount} />
                            </div>
                            <div className={css.cost}>
                                <CountUp decimals={3} end={item.totalspendnms} />
                                <img className={css.symbol} src="/images/symbol/NMS.svg" alt="" />
                            </div>
                            <div className={css.date}>{item.lastgametime === 0 ? t('common:my:NoRecord') : moment(item.lastgametime).endOf('m').fromNow()}</div>
                        </div>
                    ))}
                    {userinfo.teamlist.length === 0 && <NoData />}
                </div>
            </section>
        </div>
    );
};

export default List;
