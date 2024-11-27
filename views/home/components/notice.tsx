import { FC, ReactElement, useEffect, useState } from 'react';
import css from '../styles/notice.module.scss';
import { useUser } from '@/state/user/hooks';
import { useNoticeModal } from '@/state/base/hooks';
import classNames from 'classnames';

const Notice: FC = (): ReactElement => {
    const [{ config }] = useUser();
    const [show, setShow] = useState<boolean>(true);
    const [, handleNoticeModal] = useNoticeModal();
    const scroll = () => {
        // 获取公告栏和内容
        const marquee: any = document.querySelector('.marquee');
        const marqueeContainer: any = document.querySelector('.marquee-container');

        // 动态设置动画时间和距离
        const marqueeWidth = marquee.offsetWidth;
        const containerWidth = marqueeContainer.offsetWidth;
        const totalDistance = marqueeWidth + containerWidth;

        // 每秒滚动 50px，因此总持续时间为 totalDistance / 50
        const animationDuration = totalDistance / 75;

        // 设置 CSS 动画
        marquee.style.animation = `scroll-left ${animationDuration}s linear infinite`;
    };
    useEffect(() => {
        if (config.announcement[0]) scroll();
    }, [config.announcement]);
    return (
        <>
            {show && config.announcement[0] && (
                <div className={classNames(css.view, 'animate__animated animate__zoomIn', '')} onClick={() => handleNoticeModal(true)}>
                    <img src="/images/home/notice.svg" alt="" />
                    <div className="marquee-container">
                        <p className="marquee">{config.announcement}</p>
                    </div>
                    {/* <img onClick={() => setShow(false)} src="/images/close.svg" alt="" /> */}
                </div>
            )}
        </>
    );
};

export default Notice;
