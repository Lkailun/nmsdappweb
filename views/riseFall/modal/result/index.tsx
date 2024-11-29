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
import { useBtc } from '@/state/game/hooks';
import { ResultStatus } from '@/state/game/reducer';
import moment from 'moment';

type IProps = {
    onClose: Function;
};
const ResultModal: FC<IProps> = ({ onClose }): ReactElement => {
    const [{ openBtcGameResult }] = useBtc();

    const getTipFont = (type: string) => {
        switch (type) {
            case ResultStatus.success:
                return '恭喜您竞猜成功';
            case ResultStatus.failed:
                return '很遗憾竞猜失败';
        }
    };

    return (
        <Modal open={true} footer={null} onCancel={() => onClose()} className={classNames(css.view, 'luckyWheel-result-modal')}>
            <section className={classNames(css.main, openBtcGameResult.type === ResultStatus.success ? css.success : '')}>
                <div className={classNames(css.tip, openBtcGameResult.type === ResultStatus.success ? css.tip_success : '')}>{getTipFont(openBtcGameResult.type)}</div>
                <div className={css.cont}>
                    <div className={css.base_content}>
                        <h5>
                            + {openBtcGameResult.reward} <span>NMS</span>
                        </h5>
                        {openBtcGameResult.type === ResultStatus.success && <p>(下注+奖励)</p>}
                        <div className={openBtcGameResult.direction === 'down' ? css.down : ''}>
                            竞猜方向: <img src={`/images/rise-fall/modal/${openBtcGameResult.direction === 'down' ? 'down' : 'up'}.svg`} alt="" />
                        </div>
                    </div>
                </div>
                <div className={classNames(css.content, openBtcGameResult.type === ResultStatus.noJoin ? css.notJoinContent : '')}>
                    <div className={css.line}>
                        <span>下注金额:</span>
                        <div>
                            {openBtcGameResult.amount} <img src="/images/symbol/NMS.svg" alt="" />
                        </div>
                    </div>
                    <div className={classNames(css.line, css.last)}>
                        <span>下注时间:</span>
                        <div>{moment(openBtcGameResult.time).format('YYYY.MM.DD HH:mm')}</div>
                    </div>
                    <div className={css.btn} onClick={() => onClose()}>
                        确定
                    </div>
                </div>
            </section>
        </Modal>
    );
};

export default ResultModal;
