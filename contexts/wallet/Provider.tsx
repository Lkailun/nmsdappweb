import { createContext, FC, ReactElement, useMemo, ReactNode, useEffect, useState } from 'react';
import { WalletContextApi } from './types';
import { Address, Chain } from 'viem';
import { useAccount, useBlockNumber, useChainId, useChains, useConnect, useWalletClient, useSwitchChain } from 'wagmi';
import { chains, initialChain } from '@/config/wagmiClient.config';
import { useAccountModal, useChainModal } from '@rainbow-me/rainbowkit';
import { injected } from 'wagmi/connectors';
import { useDebounce } from '@/hooks';
import { useFirstScreen } from '@/state/base/hooks';

export const WalletContext = createContext<WalletContextApi<Chain, Address> | undefined>(undefined);

type WalletProps = {
    children: ReactNode;
};

export const WalletProvider: FC<WalletProps> = ({ children }): ReactElement => {
    const { debounce, clear } = useDebounce();
    const chainList = useChains();
    const { address, isConnected, chainId } = useAccount();
    const { openAccountModal } = useAccountModal();
    const { data: walletClient } = useWalletClient();
    const { connect } = useConnect();
    const { openChainModal } = useChainModal();
    const { switchChain } = useSwitchChain();
    const [ready, setReady] = useState<boolean>(false);
    const [firstScreen, handFirstScreen] = useFirstScreen();

    // const { data, error } = useBlockNumber();

    const isSuperChain: boolean = useMemo(() => {
        return !!openAccountModal;
    }, [openAccountModal]);

    const chain = useMemo(() => {
        const target = chainList.find((ele) => ele.id === chainId);
        return target || initialChain;
    }, [chainList, chainId]);

    const autoSwitchChain = () => debounce(() => switchChain({ chainId: chainList[0].id }));
    const autoConnectWallet = () => debounce(() => connect({ connector: injected() }));

    useEffect(() => {
        if (isConnected && chainList.find((ele) => ele.id === chainId) && walletClient) {
            setReady(true);
        } else if (!isConnected || !chainList.find((ele) => ele.id === chainId)) {
            setReady(false);
        }
    }, [isSuperChain, isConnected && chainList && walletClient]);

    useEffect(() => {
        if (firstScreen) return;
        if (!isConnected) {
            autoConnectWallet();
        } else {
            clear();
            if (!isSuperChain) {
                autoSwitchChain();
                // openChainModal!(); // 打开切链模态框
            }
        }
    }, [isConnected, connect, isSuperChain, firstScreen]);

    return <WalletContext.Provider value={{ account: address, chainId, chain, ready, isSuperChain }}>{children}</WalletContext.Provider>;
    // return <WalletContext.Provider value={{ account: '0xb53cc5f6c1074f660e218e63c0ee9069ce7a8c47', chainId, chain, ready, isSuperChain }}>{children}</WalletContext.Provider>;
};
