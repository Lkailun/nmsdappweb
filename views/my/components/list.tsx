import { FC, ReactElement, SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import css from '../styles/list.module.scss';
import { useLogs } from '@/state/user/hooks';
import { $copy, $hash, $sleep } from '@/utils/met';

import classNames from 'classnames';

import { useTranslation } from 'next-i18next';
import { NoData } from '@/components';
import CountUp from 'react-countup';

const List: FC = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    const logs = useLogs();
    const dialog_ref = useRef<any>();
    const [list, setList] = useState(new Array(10).fill(0));

    return (
        <div className={css.view}>
            <h4>我的团队</h4>
            <header>
                <div className={css.item}>
                    <img className={css.img} src="/images/my/people.svg" alt="" />
                    <p>我的直推人数</p>
                    <h5>
                        <CountUp decimals={1} end={100} />
                    </h5>
                </div>
                <div className={css.item}>
                    <img className={css.img} src="/images/my/other.svg" alt="" />
                    <p>团队累计场次</p>
                    <h5>
                        <CountUp decimals={1} end={100} />
                    </h5>
                </div>
                <div className={css.item}>
                    <img className={css.img} src="/images/my/fanyong.svg" alt="" />
                    <p>我的累计返佣</p>
                    <h5>
                        <CountUp decimals={1} end={100} /> <img src="/images/symbol/NMS.svg" alt="" />
                    </h5>
                </div>
            </header>
            <section>
                <div className={classNames(css.nav, css.td)}>
                    <div>用户地址</div>
                    <div>累计场次</div>
                    <div>累计金额</div>
                    <div>最近游戏</div>
                </div>
                {list.map((item, index) => (
                    <div key={index} className={classNames(css.td, css.item)}>
                        <div className={css.user}>
                            {$hash('xxxxxxxxxxxxxx', 4, 3)}
                            <img className={css.copy} src="/images/my/copy1.svg" alt="" />
                        </div>
                        <div className={css.total}>
                            <CountUp decimals={0} end={100} />
                        </div>
                        <div className={css.cost}>
                            <CountUp decimals={1} end={100} />
                            <img className={css.symbol} src="/images/symbol/NMS.svg" alt="" />
                        </div>
                        <div className={css.date}>1天前</div>
                    </div>
                ))}
                {list.length === 0 && <NoData />}
            </section>
        </div>
    );
};

export default List;
