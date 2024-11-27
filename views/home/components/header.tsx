import { FC, ReactElement } from 'react';
import css from '../styles/header.module.scss';
import { useUser } from '@/state/user/hooks';

const Header: FC = (): ReactElement => {
    const [{ config }] = useUser();

    return (
        <div className={css.header}>
            <div className={css.top}>
                <div className={css.item}>
                    <h5>我的累计场次(次)</h5>
                    <div>
                        <span>126</span>
                    </div>
                </div>
                <div className={css.item}>
                    <h5>累计参与金额(NMS)</h5>
                    <div>
                        <span>35.68</span> <img src="/images/symbol/NMS.svg" alt="" />
                    </div>
                </div>
            </div>
            <p>最近游戏: 1小时前</p>
        </div>
    );
};

export default Header;
