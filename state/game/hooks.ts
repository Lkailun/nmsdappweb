import { useSelector } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { setLuckData, setBtcData, updateLuckGameData, updateBtcGameData, setLuckGameResult, setBtcGameResult } from './actions';
import { AppState, useAppDispatch } from '../index';
import { message } from 'antd';
import Server from '@/service/api';
import { useWallet } from '@/hooks';
import { useAuth, useUser } from '../user/hooks';
import { omit } from 'lodash';
import { ResultStatus } from './reducer';
import BigNumber from 'bignumber.js';
import { Storage } from '@/utils/storage';

export function useLuck(): [{ [key: string]: any }, { getData: () => void; closeResultModal: () => void; updateGameData: (info: { [key: string]: any }) => void; clearData: () => void }] {
    const dispatch = useAppDispatch();
    const [auth] = useAuth();
    const [_, { updateUser }] = useUser();
    const { account } = useWallet();
    const timer = useRef<any>(null);
    const luckData = useSelector<AppState, AppState['game']['luckData']>((state: AppState) => state.game.luckData);
    const openLuckGameResult = useSelector<AppState, AppState['game']['openLuckGameResult']>((state: AppState) => state.game.openLuckGameResult);

    const dealData = useCallback(
        async (_newdata: any) => {
            try {
                const data = JSON.parse(localStorage.getItem('luckData') || '{}');
                const oldData = data.luckgameinfo || [];
                const newData = _newdata.luckgameinfo || [];

                if (oldData.length === 0 || newData.length < 2) return;

                if (newData[0]._id !== oldData[0]._id) {
                    const { betaddresslist, winindex, betamountlist, integralreward, rewardamountrate, _id } = newData[1],
                        user = account!.toLowerCase();

                    let type = ResultStatus.know,
                        reward = 0,
                        createtime = 0,
                        amount = 0;

                    if (!betaddresslist.includes(user)) {
                        type = ResultStatus.noJoin;
                    } else {
                        const selfIndex = betaddresslist.findIndex((ele: any) => ele === user);
                        amount = betamountlist[selfIndex];
                        const find = _newdata.luckgamerecords.find((ele: any) => ele._id === _id);
                        createtime = find['createtime'] || 0;

                        if (betaddresslist[winindex] === user) {
                            type = ResultStatus.success;
                            reward = Number(BigNumber(integralreward).toFixed(4, 1));
                        } else if (betaddresslist[winindex] === null) {
                            type = ResultStatus.know;
                            reward = amount;
                        } else {
                            type = ResultStatus.failed;
                            reward = Number(new BigNumber(find.rewardamount || 0).toFixed(4, 1));
                        }
                    }

                    const params = {
                        open: true,
                        type,
                        amount,
                        reward,
                        createtime
                    };
                    dispatch(setLuckGameResult(params));

                    if (Storage.getItem('voice') === 'open') {
                        let remindAudio: HTMLAudioElement | null = null;
                        remindAudio = new Audio('/voice/remind.mp3');
                        remindAudio.play();
                    }
                }
                return '';
            } catch (e: any) {}
        },
        [dispatch]
    );

    const getData = useCallback(async () => {
        try {
            const { code, data, message } = await Server.getluckgamedata({ address: account }, auth);
            if (code !== 200) throw new Error(message);
            await dealData(data);
            dispatch(setLuckData(omit(data, 'userinfo')));
            updateUser(data.userinfo);

            timer.current = setTimeout(() => {
                getData();
            }, 3500);
        } catch (e: any) {
            message.error(e.message || 'error');
        }
    }, [dispatch]);

    const updateGameData = useCallback(
        async (info: { [key: string]: any }) => {
            if (info.luckgameinfo) await dealData(info);
            dispatch(updateLuckGameData(info));
        },
        [dispatch]
    );

    const closeResultModal = useCallback(() => {
        dispatch(setLuckGameResult({ open: false }));
    }, [dispatch]);

    const clearData = useCallback(() => {
        dispatch(setLuckGameResult({ open: false }));
        dispatch(setLuckData({ luckgameinfo: [], luckgamerecords: [] }));
        clearTimeout(timer.current);
        localStorage.removeItem('luckData');
    }, [dispatch]);

    return [
        { ...luckData, openLuckGameResult },
        { getData, updateGameData, closeResultModal, clearData }
    ];
}

export function useBtc(): [{ [key: string]: any }, { closeResultModal: () => void; getData: () => void; updateGameData: (info: { [key: string]: any }) => void; clearData: () => void }] {
    const dispatch = useAppDispatch();

    const [auth] = useAuth();
    const [_, { updateUser }] = useUser();
    const { account } = useWallet();
    const timer = useRef<any>(null);

    const btcData = useSelector<AppState, AppState['game']['btcData']>((state: AppState) => state.game.btcData);
    const openBtcGameResult = useSelector<AppState, AppState['game']['openBtcGameResult']>((state: AppState) => state.game.openBtcGameResult);

    const dealData = useCallback(
        async (newData: any[]) => {
            try {
                const data = JSON.parse(localStorage.getItem('btcData') || '{}');
                const oldData = data.btcgamerecords || [];
                if (oldData.length === 0 || newData.length === 0) return;
                if (newData[0].state !== 'pending' && oldData[0].state === 'pending') {
                    const result = newData[0];
                    let type = ResultStatus.failed,
                        reward = result.integralreward || 0;

                    if (result.state === 'success') {
                        type = ResultStatus.success;
                        reward = result.rewardamount || 0;
                    }

                    const params = {
                        open: true,
                        type,
                        amount: result.amount,
                        reward,
                        direction: result.direction,
                        createtime: result.createtime
                    };

                    dispatch(setBtcGameResult(params));

                    if (Storage.getItem('voice') === 'open') {
                        let remindAudio: HTMLAudioElement | null = null;
                        remindAudio = new Audio('/voice/remind.mp3');
                        remindAudio.play();
                    }
                }
                return '';
            } catch (e: any) {}
        },
        [dispatch]
    );

    const getData = useCallback(async () => {
        try {
            const { code, data, message } = await Server.getbtcgamedata({ address: account }, auth);
            if (code !== 200) throw new Error(message);
            await dealData(data.btcgamerecords);
            dispatch(setBtcData(omit(data, 'userinfo')));
            updateUser(data.userinfo);
            timer.current = setTimeout(() => {
                getData();
            }, 3500);
        } catch (e: any) {
            message.error(e.message || 'error');
        }
    }, [dispatch, btcData]);

    const updateGameData = useCallback(
        async (info: { [key: string]: any }) => {
            if (info.btcgamerecords) await dealData(info.btcgamerecords);
            dispatch(updateBtcGameData(info));
        },
        [dispatch, btcData]
    );

    const closeResultModal = useCallback(() => {
        dispatch(setBtcGameResult({ open: false }));
    }, [dispatch]);

    const clearData = useCallback(() => {
        dispatch(setBtcGameResult({ open: false }));
        dispatch(updateBtcGameData({ btcgamerecords: [] }));
        clearTimeout(timer.current);
        localStorage.removeItem('btcData');
    }, [dispatch]);

    return [
        { ...btcData, openBtcGameResult },
        { getData, updateGameData, clearData, closeResultModal }
    ];
}
