import { FC, ReactElement, useState } from 'react';
import css from '../styles/section.module.scss';
import { useUser } from '@/state/user/hooks';
import { useRouter } from 'next/router';
import { Storage } from '@/utils/storage';

const Section: FC = (): ReactElement => {
    const [{ config }] = useUser();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const jump = async (index: number) => {
        setIsLoading(true);
        try {
            if (index === 0) {
                await router.push('/lucky-wheel');
            } else if (index === 1) {
                await router.push('/rise-fall');
            }
        } catch (error) {
            console.error('Navigation failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={css.view}>
            {isLoading && (
                <div className={css.loading}>
                    <div className={css.spinner}></div>
                </div>
            )}
            {new Array(6).fill(0).map((ele, index) => (
                <img 
                    key={index} 
                    src={`/images/home/${index + 1}.png`} 
                    onClick={() => !isLoading && jump(index)} 
                    className={isLoading ? css.disabled : ''}
                    alt="" 
                />
            ))}
        </div>
    );
};

export default Section;
