'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { useWallet } from '@/hooks';
import { BindAddressModal, NoticeModal, ProcessModal } from '@/modal';
import { useBindModal, useFirstScreen, useNoticeModal, useProcessModal } from '@/state/base/hooks';
import { useEffect } from 'react';
import styled from 'styled-components';

const ActionComponent = ({ children }: any) => {
    const [showBindModal, handShowBindModal] = useBindModal();
    const [showNoticeModal] = useNoticeModal();
    const [firstScreen, handFirstScreen] = useFirstScreen();
    const [{ showProcessModal }] = useProcessModal();
    const { ready } = useWallet();

    useEffect(() => {
        setTimeout(() => {
            handFirstScreen(false);
        }, 10000);
    }, []);

    return (
        <>
            {/* {firstScreen ? (
                <FirstScreen playsInline autoPlay muted loop>
                    <source src="/images/home/openscreen.mp4" type="video/mp4" />
                </FirstScreen>
            ) : (
                <> */}
            <Header />
            {showNoticeModal && <NoticeModal />}
            {showProcessModal && <ProcessModal />}
            {showBindModal && <BindAddressModal onClose={() => handShowBindModal(false)} />}
            {!ready ? <NoConnect>用户数据加载中! 请稍后..</NoConnect> : <></>}
            {children}
            <Footer />
            <Preloading>
                <img src="/images/rise-fall/bg.png" alt="" />
                <img src="/images/rise-fall/confirm_bg.png" alt="" />
                <img src="/images/rise-fall/confirm_title.png" alt="" />
                <img src="/images/rise-fall/modal/success.png" alt="" />
                <img src="/images/rise-fall/modal/fail.png" alt="" />

                <img src="/images/luckWheel/bg.png" alt="" />
                <img src="/images/luckWheel/card-bg.gif" alt="" />
                <img src="/images/luckWheel/confirm_bg.png" alt="" />
                <img src="/images/luckWheel/title.png" alt="" />
                <img src="/images/luckWheel/confirm_title.png" alt="" />
                <img src="/images/luckWheel/gametip.gif" alt="" />

                <img src="/images/luckWheel/modal/fail.png" alt="" />
                <img src="/images/luckWheel/modal/know.png" alt="" />
                <img src="/images/luckWheel/modal/noJoin.png" alt="" />
                <img src="/images/luckWheel/modal/success.png" alt="" />
            </Preloading>
            {/* </>
            )} */}
        </>
    );
};

const FirstScreen = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 99;
    object-fit: cover;
`;

const NoConnect = styled.div`
    background: rgba(47, 64, 82, 0.9);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    color: #fff;
    font-family: PingFang SC;
    font-size: 0.14rem;
    text-align: center;
    height: 0.46rem;
    line-height: 0.46rem;
    width: calc(100% + 0.4rem);
    margin-left: -0.2rem;
    position: absolute;
    top: 0.65rem;
    left: 0;
    z-index: 99;
`;

const Preloading = styled.div`
    display: none;
`;
const Loading = styled.div`
    margin-top: 30vh;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        width: 0.64rem;
        animation: rotate 1s infinite linear;
    }
`;
export default ActionComponent;
