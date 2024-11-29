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

type IProps = {
    onClose: Function;
    data: Record<string, any>;
};
const ResultModal: FC<IProps> = ({ onClose }): ReactElement => {
    const [{ userinfo, config }, { updateUser }] = useUser();
    const price = usePrice();
    const { account } = useWallet();
    const signMessage = useSign();

    const [loading, setLoading] = useState<boolean>(false);
    let data = {
        type: 'success'
    };

    const getTipFont = (type: string) => {
        switch (type) {
            case 'success':
                return '恭喜您中奖了';
            case 'fail':
                return '很遗憾您未中奖';
            case 'know':
                return '本局无人中奖';
            case 'noJoin':
                return '本局您未参与';
        }
    };

    return (
        <Modal open={true} footer={null} onCancel={() => onClose()} className={classNames(css.view, 'luckyWheel-result-modal')}>
            <section className={classNames(css.main, data.type === 'success' ? css.success : data.type === 'noJoin' ? css.noJoin : data.type === 'fail' ? css.fail : '')}>
                <div className={classNames(css.tip, data.type === 'success' ? css.tip_success : '')}>{getTipFont(data.type)}</div>
                {['success', 'fail'].includes(data.type) && <img className={css.gift} src="/images/luckWheel/modal/gift.png" alt="" />}
                {data.type !== 'noJoin' && (
                    <div className={css.cont}>
                        {data.type === 'success' && <img src="/images/luckWheel/modal/reward.png" alt="" />}
                        {data.type === 'fail' && <img src="/images/symbol/NMS.svg" alt="" />}
                        {data.type === 'know' && <img src="/images/luckWheel/modal/cry.png" alt="" />}

                        {data.type === 'success' ? (
                            <div className={css.success_content}>
                                + 20 <span>游戏积分</span>
                            </div>
                        ) : (
                            <div className={css.base_content}>
                                <h5>
                                    + 1.0015 <span>NMS</span>
                                </h5>
                                <p>{data.type === 'fail' ? '(下注+奖励)' : '(下注退还)'}</p>
                            </div>
                        )}
                    </div>
                )}
                <div className={classNames(css.content, data.type === 'noJoin' ? css.notJoinContent : '')}>
                    {data.type === 'noJoin' ? (
                        <p>本局无记录</p>
                    ) : (
                        <>
                            <div className={css.line}>
                                <span>下注金额:</span>
                                <div>
                                    0.005 <img src="/images/symbol/NMS.svg" alt="" />
                                </div>
                            </div>
                            <div className={classNames(css.line, css.last)}>
                                <span>下注时间:</span>
                                <div>2024.10.12 12:00</div>
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
