import { FC, ReactElement, useEffect } from 'react';
import css from '../styles/header.module.scss';
import { useUser } from '@/state/user/hooks';
import CountUp from 'react-countup';
import moment from 'moment';

const Header: FC = (): ReactElement => {
    const [{ userinfo }] = useUser();

    useEffect(() => {
        moment.locale('zh-cn');
    }, []);
    return (
        <div className={css.header}>
            <div className={css.top}>
                <div className={css.item}>
                    <h5>我的累计场次(次)</h5>
                    <div>
                        <span>
                            <CountUp decimals={0} end={userinfo.totalgamecount} />
                        </span>
                    </div>
                </div>
                <div className={css.item}>
                    <h5>累计参与金额(NMS)</h5>
                    <div>
                        <span>
                            <CountUp decimals={5} end={userinfo.totalspendnms} />
                        </span>
                        <img src="/images/symbol/NMS.svg" alt="" />
                    </div>
                </div>
            </div>
            <p>我的最近游戏: {userinfo.lastgametime === 0 ? '无记录' : moment(userinfo.lastgametime).endOf('m').fromNow()}</p>
        </div>
    );
};

export default Header;
