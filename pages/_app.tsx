import 'styles/index.scss';
import 'nprogress/nprogress.css';
import 'animate.css';

import { QueryClientProvider } from '@tanstack/react-query';

import { createGlobalStyle } from 'styled-components';
import type { AppProps } from 'next/app';

import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '../state';
import styled from 'styled-components';
import { WagmiProvider } from '@/components/WagmiProvider';
import { WalletProvider } from '@/contexts/wallet';
import MessageProvider from 'contexts/message';
import { queryClient } from '@/config/queryClient.config';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import { appWithTranslation } from 'next-i18next';
import nextI18nConfig from '../next-i18next.config.js';

// import ActionComponent from './actionComponent';
import { useInviter } from '@/state/user/hooks';
import dynamic from 'next/dynamic';

const ActionComponent = dynamic(() => import('./actionComponent'), { ssr: false });

const GlobalStyle = createGlobalStyle``;

export async function getServerSideProps(context: any) {
    const { params, query } = context;

    return {
        props: {
            params: params ?? {},
            searchParams: query,
            headers: context.req.headers
        }
    };
}

const ScriptService = ({ children }: any) => {
    const router = useRouter();
    const [, setInviter] = useInviter();

    useEffect(() => {
        NProgress.configure({ showSpinner: false });
        const handleStart = () => {
            NProgress.start();
        };

        const handleStop = () => {
            NProgress.done();
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleStop);
        router.events.on('routeChangeError', handleStop);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleStop);
            router.events.off('routeChangeError', handleStop);
        };
    }, [router]);

    useEffect(() => {
        if (router.query.inviter) {
            // console.log('useEffect inviter::::', router.query.inviter);
            setInviter(router.query.inviter as string);
        }
    }, [router.query.inviter]);

    return <>{children}</>;
};

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>NMS</title>
                <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
                <meta name="msapplication-tap-highlight" content="no" />
                <script type="text/javascript" async src="https://unpkg.com/klinecharts/dist/klinecharts.min.js"></script>
            </Head>
            <GlobalStyle />
            {/* <ErrorBoundary> */}
            <QueryClientProvider client={queryClient}>
                <WagmiProvider>
                    <Provider store={store}>
                        <MessageProvider>
                            <WalletProvider>
                                <ScriptService>
                                    <Main id="_main_app">
                                        <Content className="hidden-scroll">
                                            <ActionComponent>
                                                <Component {...pageProps} />
                                            </ActionComponent>
                                        </Content>
                                    </Main>
                                </ScriptService>
                            </WalletProvider>
                        </MessageProvider>
                    </Provider>
                </WagmiProvider>
            </QueryClientProvider>
            {/* </ErrorBoundary> */}
        </>
    );
}

const Main = styled.div`
    max-width: 450px;
    height: 100%;
    min-height: 100%;
    overflow-y: auto;
    margin: 0 auto;
    position: relative;
    overflow-x: hidden;
`;

const Content = styled.div`
    width: 100%;
    padding: 0.75rem 0.2rem 1.2rem;
    height: 100%;
    overflow-y: auto;
    position: relative;
    overflow-x: hidden;
`;

const I18nApp = appWithTranslation(App, nextI18nConfig);

export default I18nApp;
