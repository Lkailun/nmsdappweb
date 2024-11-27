import '@rainbow-me/rainbowkit/styles.css';

import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { PropsWithChildren } from 'react';
import { WagmiProvider as WagmiConfig } from 'wagmi';
import { config, initialChain } from '@/config/wagmiClient.config';

export interface WagmiProviderProps extends PropsWithChildren {}

export function WagmiProvider(props: WagmiProviderProps) {
    return (
        <WagmiConfig config={config}>
            <RainbowKitProvider
                locale={'en'} //
                initialChain={initialChain}
                showRecentTransactions
                theme={darkTheme()}
            >
                {props.children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
}
