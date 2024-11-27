import { FC, ReactElement, use } from 'react';
import css from '../styles/section.module.scss';
import { useUser } from '@/state/user/hooks';
import { useRouter } from 'next/router';

const Section: FC = (): ReactElement => {
    const [{ config }] = useUser();
    const router = useRouter();
    const jump = (index: number) => {
        if (index === 0) {
            router.push('/lucky-wheel');
        } else if (index === 1) {
            router.push('/rise-fall');
        }
    };
    return (
        <div className={css.view}>
            {new Array(6).fill(0).map((ele, index) => (
                <img key={index} src={`/images/home/${index + 1}.png`} onClick={() => jump(index)} alt="" />
            ))}
        </div>
    );
};

export default Section;
