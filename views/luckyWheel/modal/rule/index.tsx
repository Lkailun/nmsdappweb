import { FC, ReactElement } from 'react';

import css from '../../../stake/styles/rule.module.scss';
import { Modal } from 'antd';
import { useTranslation } from 'next-i18next';

type IProps = {
    onClose: Function;
};
const RuleModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    return (
        <Modal open={true} footer={null} className={css.view} onCancel={() => onClose()}>
            <h2>{t('common:game:LuckyWheelGameRules')}</h2>
            <section>
                <div>
                    <span>1</span>{t('common:game:EachRoundHas16EmptyPositions')}
                </div>
                <div>
                    <span>2</span>{t('common:game:EachRoundHas16EmptyPositions')}
                </div>
                <div>
                    <span>3</span>{t('common:game:TheWinnerIsSelectedRandomlyFromThe16Positions')}
                </div>
                <div>
                    <span>4</span>{t('common:game:TheWinnerWillReceive50PercentOfTheBetAmountInGamePoints')}
                </div>
                <div>
                    <span>5</span>{t('common:game:The80PercentOfTheWinnerBetAmountWillBeDistributedToUnluckyPlayers')}
                </div>
                <div>
                    <span>6</span>{t('common:game:5PercentOfTheWinnerBetAmountWillBeUsedForReferralRebates')}
                </div>
            </section>
        </Modal>
    );
};

export default RuleModal;
