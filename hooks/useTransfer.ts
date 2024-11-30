import { client } from '@/utils/wagmi';
import useWallet from './useWallet';
import { Account, Address, EstimateGasParameters, GetTransactionReceiptReturnType, SendTransactionParameters } from 'viem';
import { useCallback, useState } from 'react';
import { useWalletClient } from 'wagmi';
import { calculateGasMargin } from '@/utils';
import { useCallWithGasPrice } from './useCallWithGasPrice';
import abi_erc20 from '../abi/abi_erc20.json';
import BigNumber from 'bignumber.js';
import useTokenInfo from './useTokenInfo';
import useCatchTx from './useCatchTx';
import useTransaction from './useTransaction';
import useBalance from './useBalance';
import { $BigNumber } from '@/utils/met';
import { useTranslation } from 'next-i18next';

type SendTransaction = {
    account?: Account | Address;
    to: Address;
    value: number | string;
    token: Address;
};
export default function useTransfer() {
    const { t }: any = useTranslation<any>(['common']);
    const { chain } = useWallet();
    const { callWithGasPrice } = useCallWithGasPrice();
    const { data: walletClient } = useWalletClient();
    const { sendTransaction } = useTransaction();
    const [, getBalance] = useBalance();
    const [, { getDecimals }] = useTokenInfo();
    const { fetchWithCatchTx, hash } = useCatchTx();
    const [loading, setLoading] = useState<boolean>(false);

    const sendTransfer = useCallback(
        async (data: SendTransaction): Promise<GetTransactionReceiptReturnType> => {
            try {
                setLoading(true);
                const balance = await getBalance(data.token);
                if ($BigNumber(data.value).gt(balance)) {
                    if (data.token === '0x0000000000000000000000000000000000000000') {
                        throw new Error(t('common:base:InsufficientGasBalance'));
                    } else if (data.token === process.env.USDT_TOKEN) {
                        throw new Error(t('common:base:InsufficientUSDTBalance'));
                    } else {
                        throw new Error(t('common:base:InsufficientBalance'));
                    }
                }
                const decimals = await getDecimals(data.token);
                const value = new BigNumber(data.value).shiftedBy(decimals).toFixed();
                let receipt: GetTransactionReceiptReturnType;
                if (data.token === '0x0000000000000000000000000000000000000000') {
                    receipt = await fetchWithCatchTx(() => sendTransaction({ to: data.to, value }));
                } else {
                    receipt = await fetchWithCatchTx(() =>
                        callWithGasPrice(
                            {
                                abi: abi_erc20,
                                address: data.token
                            },
                            'transfer',
                            [data.to, value]
                        )
                    );
                }
                // console.log('receipt', receipt, receipt.transactionHash);
                return receipt;
            } catch (error: any) {
                // console.log('error.message', error.message);
                throw new Error(error.message.split('.')[0]);
            } finally {
                setLoading(false);
            }
        },
        [chain, walletClient, callWithGasPrice, getDecimals]
    );

    return { sendTransfer, loading, hash };
}
