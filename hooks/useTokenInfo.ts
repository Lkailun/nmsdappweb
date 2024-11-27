import { useCallback, useState } from 'react';
import { client } from '@/utils/wagmi';
import useWallet from './useWallet';
import abi_erc20 from '../abi/abi_erc20.json';
import { Address } from 'viem';

function useTokenInfo(): [Record<string, any>, { getTokenInfo: (token: Address) => Promise<any>; getDecimals: (token: Address) => Promise<any> }] {
    const { chain } = useWallet();
    const [token, setToken] = useState({});
    const getTokenInfo = useCallback(
        async (tokenAddress: Address) => {
            try {
                let tokenInfo = {
                    decimals: 18,
                    name: '',
                    symbol: ''
                };
                if (tokenAddress !== '0x0000000000000000000000000000000000000000') {
                    const [decimals, name, symbol]: any = await Promise.all([
                        client(chain).readContract({ abi: abi_erc20, address: tokenAddress, functionName: 'decimals', args: [] }),
                        client(chain).readContract({ abi: abi_erc20, address: tokenAddress, functionName: 'name', args: [] }),
                        client(chain).readContract({ abi: abi_erc20, address: tokenAddress, functionName: 'symbol', args: [] })
                    ]);
                    tokenInfo = {
                        decimals,
                        name,
                        symbol
                    };
                }
                setToken(tokenInfo);
                return tokenInfo;
            } catch (e: any) {
                console.error('fetchTokenInfo error:', e.message);
                throw new Error(e.message);
            }
        },
        [chain]
    );
    const getDecimals = useCallback(
        async (tokenAddress: Address) => {
            try {
                let decimals: number | unknown = 18;
                if (tokenAddress !== '0x0000000000000000000000000000000000000000') {
                    decimals = await client(chain).readContract({ abi: abi_erc20, address: tokenAddress, functionName: 'decimals', args: [] });
                }
                return decimals;
            } catch (e: any) {
                console.error('fetchTokenInfo error:', e.message);
                throw new Error(e.message);
            }
        },
        [chain]
    );
    return [token, { getTokenInfo, getDecimals }];
}

export default useTokenInfo;
