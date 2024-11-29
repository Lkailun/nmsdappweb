import { useSelector } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { setLuckData, setBtcData, updateLuckGameData, updateBtcGameData } from './actions';
import { AppState, useAppDispatch } from '../index';
import { message } from 'antd';
import Server from '@/service/api';
import { useWallet } from '@/hooks';
import { useAuth, useUser } from '../user/hooks';
import { omit } from 'lodash';

export function useLuck(): [{ [key: string]: any }, { getData: () => void; updateGameData: (info: { [key: string]: any }) => void; clearLoopData: () => void }] {
    const dispatch = useAppDispatch();
    const [auth] = useAuth();
    const [_, { updateUser }] = useUser();
    const { account } = useWallet();
    const timer = useRef<any>(null);
    const luckData = useSelector<AppState, AppState['game']['luckData']>((state: AppState) => state.game.luckData);

    const getData = useCallback(async () => {
        try {
            const { code, data, message } = await Server.getluckgamedata({ address: account }, auth);
            if (code !== 200) throw new Error(message);
            dispatch(setLuckData(omit(data, 'userinfo')));
            updateUser(data.userinfo);
            timer.current = setTimeout(() => {
                getData();
            }, 5000);
        } catch (e: any) {
            message.error(e.message || 'error');
        }
    }, [dispatch]);

    const updateGameData = useCallback(
        async (info: { [key: string]: any }) => {
            dispatch(updateLuckGameData(info));
        },
        [dispatch]
    );

    const clearLoopData = () => {
        clearTimeout(timer.current);
    };
    return [luckData, { getData, updateGameData, clearLoopData }];
}

export function useBtc(): [{ [key: string]: any }, { getData: () => void; updateGameData: (info: { [key: string]: any }) => void; clearLoopData: () => void }] {
    const dispatch = useAppDispatch();

    const [auth] = useAuth();
    const [_, { updateUser }] = useUser();
    const { account } = useWallet();
    const timer = useRef<any>(null);

    const btcData = useSelector<AppState, AppState['game']['btcData']>((state: AppState) => state.game.btcData);
    const getData = useCallback(async () => {
        try {
            const { code, data, message } = await Server.getbtcgamedata({ address: account }, auth);
            if (code !== 200) throw new Error(message);
            dispatch(setBtcData(omit(data, 'userinfo')));
            updateUser(data.userinfo);
            timer.current = setTimeout(() => {
                getData();
            }, 5000);
        } catch (e: any) {
            message.error(e.message || 'error');
        }
    }, [dispatch]);

    const updateGameData = useCallback(
        async (info: { [key: string]: any }) => {
            dispatch(updateBtcGameData(info));
        },
        [dispatch]
    );

    const clearLoopData = () => {
        clearTimeout(timer.current);
    };

    return [btcData, { getData, updateGameData, clearLoopData }];
}
