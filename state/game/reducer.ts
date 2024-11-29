import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    luckData: {
        luckgameinfo: [],
        luckgamerecords: []
    } as any,
    btcData: {
        klines: [],
        btcgamerecords: []
    } as any
};

const BaseSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setLuckData(state, { payload: data }) {
            state.luckData = data;
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
        },

        setBtcData(state, { payload: data }) {
            state.btcData = data;
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
        }
    }
});
export default BaseSlice.reducer;
