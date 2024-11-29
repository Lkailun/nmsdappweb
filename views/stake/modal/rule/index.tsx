import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import css from '../../styles/rule.module.scss';
import { Modal } from 'antd';

type IProps = {
    onClose: Function;
};
const RuleModal: FC<IProps> = ({ onClose }: IProps): ReactElement => {
    const { t }: any = useTranslation<any>(['common']);
    return (
        <Modal open={true} footer={null} className={css.view} onCancel={() => onClose()}>
            <h2>{t('common:stake:StakeRule')}</h2>
            <section>
                <div>
                    <span>1</span>
                    {t('common:stake:StakeRule1')}
                </div>
                <div>
                    <span>2</span>
                    {t('common:stake:StakeRule2')}
                </div>
                <div>
                    <span>3</span>
                    {t('common:stake:StakeRule3')}
                </div>
            </section>
        </Modal>
    );
};

export default RuleModal;
