import { $toFixed } from '@/utils/met';
import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const defaultSign = {
    message: '',
    signature: '',
    expired: 0
};
const getSessionAuth = () => {
    let value = defaultSign;
    if (typeof window !== 'undefined') {
        value = JSON.parse(sessionStorage.getItem('_auth') || JSON.stringify(value));
    }

    return value;
};

const initialState = {
    inviter: typeof window === 'undefined' ? '' : window.sessionStorage.getItem('inviter') || '', //
    nmmprice: 1,
    auth: getSessionAuth(),
    logs: [] as any[],

    depositrecords: [] as any[],
    withdrawrecords: [] as any[],
    swaprecords: [] as any[],
    integraltransferrecords: [] as any[],
    isGotRecords: false,
    info: {
        userinfo: {
            _id: '',
            address: '',
            inviter: '',
            registertime: 1732782255262,
            lastgametime: 0,
            totalgamecount: 0,
            totalfinishedgamecount: 0,
            totalspendnms: 0,
            totalrebatenms: 0,
            nmsbalance: 0,
            usdtbalance: 0,
            nmmbalance: 0,
            integralbalance: 0,
            teamlist: []
        },
        platforminfo: {
            _id: '',
            nmmprice: 3.018036024,
            nmmriserate: 0.00225,
            nmmpricehistory: {
                "1731788000000": 2.92,
                "1731888000000": 2.93,
                "1731974400000": 2.94,
                "1732060800000": 2.95,
                "1732147200000": 2.96,
                "1732233600000": 2.97,
                "1732320000000": 2.98,
                "1732406400000": 2.99,
                "1732492800000": 3.006,
                "1732665600000": 3.012012,
                "1732752000000": 3.018036024,
                "1732838400000": 3.024826605054,
                "1732924800000": 3.0316324649153716,
                "1733011200000": 3.0384536379614313
            },
            lastcheckblock: 0,
            btcgamelimit: [0.015, 25],
            luckgamelimit: [0.01, 20],
            btcgamerewardrate: 0.8,
            btcgamerebaterate: 0.05,
            luckgamerewardrate: 0.8,
            luckgamerebaterate: 0.05,
            luckgameminplayer: 3,
            rebateintervalday: 7,
            countdowninterval: 30,
            receive: '',
            usdttoken: '0x55d398326f99059ff775485246999027b3197955',
            nmstoken: '0x45016163d6843280d086b52162708633b328032D',
            topaddress: '0x59a8082bC047de76209ca00d2E2C1856aAf70000'
        },
        stakingrecords: [],
        depositrecords: [],
        withdrawrecords: [],
        swaprecords: [],
        integraltransferrecords: []
    } as { [key: string]: any }
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, { payload: info }) {
            state.info = { ...info, depositrecords: [], withdrawrecords: [], swaprecords: [], integraltransferrecords: [] };
            state.nmmprice = Number(state.info.platforminfo.nmmprice);
            // state.logs = formatLogs(state.info.userinfo);
        },
        setAuth(state, { payload: auth }) {
            state.auth = auth;
            if (typeof window !== 'undefined') {
                window.sessionStorage.setItem('_auth', JSON.stringify(auth));
            }
        },

        updateUser(state, { payload: info }) {
            let update: { [key: string]: any } = {};
            Object.keys(info).forEach((ele) => {
                if (state.info[ele] instanceof Array) {
                    // update[ele] = [...update[ele], ...info[ele]];
                    update[ele] = info[ele];
                } else if (['string', 'number'].includes(typeof state.info[ele])) {
                    update[ele] = info[ele];
                } else {
                    update[ele] = { ...state.info[ele], ...info[ele] };
                }
            });
            state.info = { ...state.info, ...update };

            state.nmmprice = Number(state.info.platforminfo.nmmprice);
        },

        setInviter(state, { payload: inviter }) {
            state.inviter = inviter;
            if (typeof window !== 'undefined' && inviter && inviter.length === 42) {
                window.sessionStorage.setItem('inviter', inviter);
            }
        },
        setIsGotRecords(state, { payload: flag }) {
            state.isGotRecords = flag;
        }
    }
});
export default UserSlice.reducer;
