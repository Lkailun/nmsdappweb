import { FC, ReactElement } from 'react';

import css from '../../../stake/styles/rule.module.scss';
import { useTranslation } from 'next-i18next';
import { Modal } from 'antd';

type IProps = {
    onClose: Function;
};
const RuleModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    return (
        <Modal open={true} footer={null} className={css.view} onCancel={() => onClose()}>
            <h2>{t('common:game:BTCBetRules')}</h2>
            <section>
                <div>
                    <span>1</span>{t('common:game:OnlyGuessTheNext3MinuteKLine')}
                </div>
                <div>
                    <span>2</span>{t('common:game:CanBetDifferentAmountsOfNMS')}
                </div>
                <div>
                    <span>3</span>{t('common:game:GuessFailedWillGet50PercentOfTheBetAmountInGamePoints')}
                </div>
                <div>
                    <span>4</span>{t('common:game:GuessSuccessWillGet80PercentOfTheBetAmountReward')}
                </div>
            </section>
        </Modal>
    );
};

export default RuleModal;
