import { useContext } from 'react';
import { WalletContext } from '../contexts/wallet/Provider';

const useWallet = () => {
    const walletContext = useContext(WalletContext);
    if (walletContext === undefined) {
        throw new Error('Wallet context undefined');
    }
    return walletContext;
};

export default useWallet;
