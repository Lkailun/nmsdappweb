import { type Chain, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { coinbaseWallet, metaMaskWallet, okxWallet, rabbyWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { createClient } from 'viem';
import { type Config, createConfig, http, createStorage, cookieStorage } from 'wagmi';
import { mainnet as builtInMainnet, bsc, bscTestnet } from 'wagmi/chains';

export const chains: any = process.env.APP_ENV === 'production' ? ([bsc] as Chain[]) : ([bscTestnet, bsc] as Chain[]);

export const connectors = connectorsForWallets(
    [
        {
            groupName: 'Recommended',
            wallets: [metaMaskWallet, walletConnectWallet, coinbaseWallet, rabbyWallet, okxWallet]
        }
    ],
    {
        projectId: process.env.W3M_PROJECT_ID!,
        appName: 'example-wallet'
    }
);

export const initialChain = process.env.APP_ENV === 'production' ? bsc : bscTestnet;

export const config = createConfig({
    chains,
    connectors,
    ssr: true,
    // client({ chain }) {
    //     return client(chain as any);
    // }

    // storage: createStorage({
    //     storage: cookieStorage
    // }),
    client({ chain }) {
        return createClient({
            chain,
            transport: http(undefined, {
                batch: true
            })
        });
    }
}) as Config;
