import { FC, ReactElement, useEffect } from 'react';
import css from '../styles/header.module.scss';
import { useUser } from '@/state/user/hooks';
import CountUp from 'react-countup';
import moment from 'moment';
import { useTranslation } from 'next-i18next';

const Header: FC = (): ReactElement => {
    const [{ userinfo }] = useUser();
    const { t }: any = useTranslation<any>(['common']);

    useEffect(() => {
        moment.locale('zh-cn');
    }, []);
    return (
        <div className={css.header}>
            <div className={css.top}>
                <div className={css.item}>
                    <h5>{t('common:home:my_total_game_count')}</h5>
                    <div>
                        <span>
                            <CountUp decimals={0} end={userinfo.totalgamecount} />
                        </span>
                    </div>
                </div>
                <div className={css.item}>
                    <h5>{t('common:home:my_total_spend_nms')}</h5>
                    <div>
                        <span>
                            <CountUp decimals={5} end={userinfo.totalspendnms} />
                        </span>
                        <img src="/images/symbol/NMS.svg" alt="" />
                    </div>
                </div>
            </div>
            <p>{t('common:home:my_recent_game')}: {userinfo.lastgametime === 0 ? t('common:home:no_record') : moment(userinfo.lastgametime).endOf('m').fromNow()}</p>
        </div>
    );
};

export default Header;
