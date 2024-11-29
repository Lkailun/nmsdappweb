import { FC, ReactElement, useMemo, useState } from 'react';

import css from '../../styles/result.module.scss';
import { message, Modal } from 'antd';
import Button from '@/components/Button';
import { $BigNumber, $diffDate } from '@/utils/met';
import { usePrice, useUser } from '@/state/user/hooks';
import { useWallet, useSign } from '@/hooks';
import Server from '@/service/api';
import CountUp from 'react-countup';
import classNames from 'classnames';
import { useLuck } from '@/state/game/hooks';
import { ResultStatus } from '@/state/game/reducer';
import moment from 'moment';

type IProps = {
    onClose: Function;
};
const ResultModal: FC<IProps> = ({ onClose }): ReactElement => {
    const [{ openLuckGameResult }] = useLuck();

    const getTipFont = (type: string) => {
        switch (type) {
            case ResultStatus.success:
                return '恭喜您中奖了';
            case ResultStatus.failed:
                return '很遗憾您未中奖';
            case ResultStatus.know:
                return '本局无人中奖';
            case ResultStatus.noJoin:
                return '本局您未参与';
        }
    };

    return (
        <Modal open={true} footer={null} onCancel={() => onClose()} className={classNames(css.view, 'luckyWheel-result-modal')}>
            <section className={classNames(css.main, openLuckGameResult.type === ResultStatus.success ? css.success : openLuckGameResult.type === ResultStatus.noJoin ? css.noJoin : openLuckGameResult.type === ResultStatus.failed ? css.fail : '')}>
                <div className={classNames(css.tip, openLuckGameResult.type === ResultStatus.success ? css.tip_success : '')}>{getTipFont(openLuckGameResult.type)}</div>
                {[ResultStatus.success, ResultStatus.failed].includes(openLuckGameResult.type) && <img className={css.gift} src="/images/luckWheel/modal/gift.png" alt="" />}
                {openLuckGameResult.type !== ResultStatus.noJoin && (
                    <div className={css.cont}>
                        {openLuckGameResult.type === ResultStatus.success && <img src="/images/luckWheel/modal/reward.png" alt="" />}
                        {openLuckGameResult.type === ResultStatus.failed && <img src="/images/symbol/NMS.svg" alt="" />}
                        {openLuckGameResult.type === ResultStatus.know && <img src="/images/luckWheel/modal/cry.png" alt="" />}

                        {openLuckGameResult.type === ResultStatus.success ? (
                            <div className={css.success_content}>
                                + {openLuckGameResult.reward} <span>游戏积分</span>
                            </div>
                        ) : (
                            <div className={css.base_content}>
                                <h5>
                                    + {openLuckGameResult.reward} <span>NMS</span>
                                </h5>
                                <p>{openLuckGameResult.type === ResultStatus.failed ? '(下注+奖励)' : '(下注退还)'}</p>
                            </div>
                        )}
                    </div>
                )}
                <div className={classNames(css.content, openLuckGameResult.type === ResultStatus.noJoin ? css.notJoinContent : '')}>
                    {openLuckGameResult.type === ResultStatus.noJoin ? (
                        <p>本局无记录</p>
                    ) : (
                        <>
                            <div className={css.line}>
                                <span>下注金额:</span>
                                <div>
                                    {openLuckGameResult.amount} <img src="/images/symbol/NMS.svg" alt="" />
                                </div>
                            </div>
                            <div className={classNames(css.line, css.last)}>
                                <span>下注时间:</span>
                                <div>{moment(openLuckGameResult.time).format('YYYY.MM.DD HH:mm')}</div>
                            </div>
                        </>
                    )}
                    <div className={css.btn} onClick={() => onClose()}>
                        确定
                    </div>
                </div>
            </section>
        </Modal>
    );
};

export default ResultModal;
