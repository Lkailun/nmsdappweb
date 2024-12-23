import { createSlice } from '@reduxjs/toolkit';

export enum ResultStatus {
    success = 'success',
    failed = 'failed',
    know = 'know',
    noJoin = 'noJoin'
}

export type GameResult = {
    open: boolean;
    type: ResultStatus;
    amount: number;
    direction?: 'up' | 'down';
    reward: number;
    createtime: number;
};

const initialState = {
    luckData: {
        luckgameinfo: [],
        luckgamerecords: []
    } as any,
    marqueeIndex: -1,
    prizeIng: false,
    openLuckGameResult: {
        open: false,
        type: ResultStatus.know,
        amount: 0,
        reward: 0,
        createtime: 0
    } as GameResult,

    btcData: {
        klines: [],
        btcgamerecords: []
    } as any,
    openBtcGameResult: {
        open: false,
        type: ResultStatus.success,
        amount: 0,
        reward: 0,
        direction: 'down',
        createtime: 0
    } as GameResult
};

const GameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setLuckData(state, { payload: data }) {
            state.luckData = data;
            localStorage.setItem('luckData', JSON.stringify(data));
        },
        updateLuckGameData(state, { payload: info }) {
            let update: { [key: string]: any } = {};
            Object.keys(info).forEach((ele) => {
                if (state.luckData[ele] instanceof Array) {
                    // update[ele] = [...update[ele], ...info[ele]];
                    update[ele] = info[ele];
                } else if (['string', 'number'].includes(typeof state.luckData[ele])) {
                    update[ele] = info[ele];
                } else {
                    update[ele] = { ...state.luckData[ele], ...info[ele] };
                }
            });
            state.luckData = { ...state.luckData, ...update };
            localStorage.setItem('luckData', JSON.stringify(state.luckData));
        },
        setLuckGameResult(state, { payload: info }) {
            state.openLuckGameResult = { ...state.openLuckGameResult, ...info };
        },
        setLuckMarqueeIndex(state, { payload: marqueeIndex }) {
            state.marqueeIndex = marqueeIndex;
        },
        setLuckPrizeIng(state, { payload: flag }) {
            state.prizeIng = flag;
        },

        setBtcData(state, { payload: data }) {
            state.btcData = data;
            localStorage.setItem('btcData', JSON.stringify(data));
        },
        updateBtcGameData(state, { payload: info }) {
            let update: { [key: string]: any } = {};
            Object.keys(info).forEach((ele) => {
                if (state.btcData[ele] instanceof Array) {
                    // update[ele] = [...update[ele], ...info[ele]];
                    update[ele] = info[ele];
                } else if (['string', 'number'].includes(typeof state.btcData[ele])) {
                    update[ele] = info[ele];
                } else {
                    update[ele] = { ...state.btcData[ele], ...info[ele] };
                }
            });
            state.btcData = { ...state.btcData, ...update };
            localStorage.setItem('btcData', JSON.stringify(state.btcData));
        },
        setBtcGameResult(state, { payload: info }) {
            state.openBtcGameResult = { ...state.openBtcGameResult, ...info };
        }
    }
});
export default GameSlice.reducer;
