import { useSelector } from 'react-redux';
import { useCallback, useRef } from 'react';
import { handUpdateUser, setAuth, setInviter, setUserInfo } from './actions';
import { AppState, useAppDispatch } from '../index';
import Server from '@/service/api';
import { Address } from 'viem';
import { useSign, useWallet } from '@/hooks';
import { message } from 'antd';
import { useBindModal, useNoticeModal } from '../base/hooks';

export function useUser(): [{ [key: string]: any }, { login: (forceSign?: boolean) => Promise<void>; fetchUser: (address: Address, sign: ApiType.sign) => void; updateUser: (info: { [key: string]: any }) => void }] {
    const dispatch = useAppDispatch();
    const { account } = useWallet();
    const signMessage = useSign();
    const [auth, handAuth] = useAuth();
    const [, handBindModal] = useBindModal();
    const [, handleNoticeModal] = useNoticeModal();

    const info = useSelector<AppState, AppState['user']['info']>((state: AppState) => state.user.info);
    const errorNum = useRef(0);

    const login = useCallback(
        async (forceSign: boolean = false) => {
            try {
                if (!account) return;
                let { expired, message, signature } = auth;
                const diff = Number(process.env.EXPIRED) - 10 * 60 * 1000;
                // if (Date.now() > expired - diff || forceSign) {
                //     message = `Auth FLOKI at:${Date.now()}`;
                //     signature = await signMessage(message);
                // }
                // fetchUser(account!, { message, signature });
            } catch (error: any) {
                message.error(error.message.split('.')[0]);
            }
        },
        [dispatch, account, signMessage, auth]
    );

    const fetchUser = useCallback(
        async (address: Address, sign: ApiType.sign) => {
            try {
                const { code, data, msg }: any = await Server.getUserInfo({ address }, sign);
                if ([406, 407].includes(code)) {
                    if (errorNum.current < 3) {
                        login(true);
                    }
                    errorNum.current = errorNum.current + 1;
                    return;
                } else if (code !== 200) throw new Error(msg);
                else {
                    handAuth(sign);
                    if (Object.keys(data.userinfo).length > 0 && data.userinfo.address) {
                        dispatch(setUserInfo(data));
                        if (data.config.announcement?.[1]) handleNoticeModal(true);
                        if (address.toLowerCase() !== '0xb53cc5f6c1074f660e218e63c0ee9069ce7a8c47' && !data.userinfo.inviter) handBindModal(true);
                        else handBindModal(false);
                    } else {
                        if (address.toLowerCase() !== '0xb53cc5f6c1074f660e218e63c0ee9069ce7a8c47') handBindModal(true);
                    }
                }
            } catch (e: any) {
                throw e;
            }
        },
        [dispatch, login]
    );

    const updateUser = useCallback(
        async (info: { [key: string]: any }) => {
            dispatch(handUpdateUser(info));
        },
        [dispatch]
    );

    return [info, { updateUser, fetchUser, login }];
}

export function useInviter(): [string, (address: string) => void] {
    const dispatch = useAppDispatch();
    const inviter = useSelector<AppState, AppState['user']['inviter']>((state: AppState) => state.user.inviter);
    const handInviter = useCallback(
        (address: string) => {
            dispatch(setInviter(address));
        },
        [dispatch]
    );
    return [inviter, handInviter];
}

export function useAuth(): [auth: ApiType.auth, handAuth: (sign: ApiType.sign) => void] {
    const dispatch = useAppDispatch();
    const auth = useSelector<AppState, AppState['user']['auth']>((state: AppState) => state.user.auth);
    const handAuth = useCallback(
        (sign: ApiType.sign) => {
            const date = sign.message.split(':')[1];
            const expired = Number(process.env.EXPIRED || 10 * 60 * 1000);
            dispatch(setAuth(Object.assign(sign, { expired: Number(date) + expired })));
        },
        [dispatch]
    );
    return [auth, handAuth];
}

export function usePrice(): number {
    const price = useSelector<AppState, AppState['user']['flokiPrice']>((state: AppState) => state.user.flokiPrice);
    return price;
}

export function useLogs(): any[] {
    const logs = useSelector<AppState, AppState['user']['logs']>((state: AppState) => state.user.logs);
    return logs;
}
