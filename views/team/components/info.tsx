import { FC, ReactElement, useMemo, useState } from 'react';
import css from '../styles/info.module.scss';
import { useUser } from '@/state/user/hooks';
import { RuleModal } from '../modal';
import { IconCopy, IconWarning } from '@/components/Icon';
import CountUp from 'react-countup';
import _ from 'lodash';
import { $copy, $hash, $toFixed } from '@/utils/met';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

const Info: FC = (): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);

    const [{ userinfo }] = useUser();
    const [openRule, setOpenRule] = useState<boolean>(false);
    const [see, setSee] = useState<boolean>(false);
    const levelFont: any = {
        1: 'RM',
        2: 'MD',
        3: 'VP',
        4: 'GM',
        5: 'CEO'
    };

    const direct = useMemo(() => {
        return _.intersection(userinfo.teamlist, Object.keys(userinfo?.allvalidteam || {}));
    }, [userinfo]);

    return (
        <>
            <div className={classNames(css.view, 'animate__animated animate__bounceIn')}>
                <div className={css.section}>
                    {userinfo.level === 0 || !see ? <img className={classNames(css.default, 'animate__animated animate__tada')} src="/images/team/0-dark.png" alt="" /> : <img className={css.tag} src={`/images/team/${userinfo.level}.svg`} alt="" />}

                    <div className={css.head}>
                        <h5>
                            {see ? (userinfo.level === 0 ? '--' : levelFont[userinfo.level]) : '***'}
                            <img onClick={() => setSee(!see)} src={`/images/team/${see ? 'eye' : 'hidden'}.svg`} alt="" />
                        </h5>
                        <div onClick={() => setOpenRule(true)}>
                            {t('common:team:MyLevel')}
                            <IconWarning />
                        </div>
                    </div>
                    <div className={css.content}>
                        <div className={css.top}>
                            <div className={css.item}>
                                <h5 className={css.border}>
                                    <CountUp useGrouping={true} end={userinfo.performance as number} />
                                </h5>
                                <p>{t('common:team:TotalTeamComputingPower')}</p>
                                <div>(T)</div>
                            </div>
                            <div className={classNames(css.item, css.last)}>
                                <section>
                                    <h5>
                                        <CountUp end={direct.length} />
                                    </h5>
                                    <p>{t('common:team:NumberOfDirectReferrals')}</p>
                                    <div>(人)</div>
                                </section>
                            </div>
                        </div>
                        <div className={css.foot}>
                            <div className={css.item}>
                                <h5>
                                    <CountUp end={Object.keys(userinfo?.allvalidteam || {}).length} />
                                </h5>
                                <p>{t('common:team:NumberOfTeamMembers')}</p>
                                <div>(人)</div>
                            </div>
                            <div className={css.item}>
                                <h5>
                                    + <CountUp decimals={1} end={Number($toFixed(userinfo.dynamicreward, 1))} />
                                </h5>
                                <p>{t('common:team:DynamicTotalIncome')}</p>
                                <div>(FLOKI)</div>
                            </div>
                            <div className={css.item}>
                                <h5>
                                    + <CountUp decimals={1} end={Number($toFixed(userinfo.teamreward, 1))} />
                                </h5>
                                <p>{t('common:team:TotalTeamIncome')}</p>
                                <div>(FLOKI)</div>
                            </div>
                        </div>

                        <div className={css.inviter}>
                            {t('common:team:MyReferrer')}
                            <div>
                                {$hash(userinfo.inviter || 'xxxxxxxxxxxx', 8, 8)} <IconCopy onClick={() => userinfo.inviter && $copy(userinfo.inviter)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {openRule && <RuleModal onClose={() => setOpenRule(false)} />}
        </>
    );
};

export default Info;
