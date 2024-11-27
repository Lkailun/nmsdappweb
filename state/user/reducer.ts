import { $toFixed } from '@/utils/met';
import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const _userinfo = {
    _id: '66e426aac0603054774b0b30',
    address: '0xd9caa45e479078cdc450e7453410efea0551a5c5',
    inviter: '0xad00e230f81c2649bbee94c8b186318da8240004',
    registertime: 1726228138769,
    level: 0,
    performance: 1700,
    flokibalance: 2169188.223768898,
    bankbalance: 910000.8901857048,
    staticreward: 473922.0202774039,
    dynamicreward: 115514.35594343203,
    teamreward: 0,
    ismanual: false,
    cansellpower: true,
    canclaim: true,
    canbankout: true,
    teamlist: ['0xad00e230f81c2649bbee94c8b186318da824207d', '0xef6191a5c8e983da45dac2a787d49fe3f2b6d54e'],
    allvalidteam: {
        '0xad00e230f81c2649bbee94c8b186318da824207d': [0, 0, 0]
    },
    label: ['张总'],
    staticlogs: [
        ['staticreward', 1726232460875, 122050.44751830757],
        ['staticreward', 1726233540162, 122599.10093992644],
        ['staticreward', 1726237200207, 121398.51084493364],
        ['staticreward', 1726323600100, 118577.07509881422],
        ['staticreward', 1726410000358, 233946.434333656]
    ],
    dynamiclogs: [
        ['dynamicreward', 1726232460878, 39056.143205858425, '0xad00e230f81c2649bbee94c8b186318da824207d', 1],
        ['dynamicreward', 1726233540164, 39231.71230077646, '0xad00e230f81c2649bbee94c8b186318da824207d', 1],
        ['dynamicreward', 1726237200209, 38847.523470378765, '0xad00e230f81c2649bbee94c8b186318da824207d', 1],
        ['dynamicreward', 1726323600101, 37944.66403162055, '0xad00e230f81c2649bbee94c8b186318da824207d', 1],
        ['dynamicreward', 1726410000360, 38722.16844143272, '0xad00e230f81c2649bbee94c8b186318da824207d', 1]
    ],
    teamlogs: [],
    banklogs: [
        ['bankreward', 1726232460873, 0],
        ['bankreward', 1726233540159, 1611.06590724166],
        ['bankreward', 1726237200203, 3229.3740396486887],
        ['bankreward', 1726323600098, 4831.834382801812],
        ['bankreward', 1726410000356, 6397.051774106161],
        ['bankin', 1726411313198, 57.42],
        ['bankin', 1726411540806, 2406.69],
        ['bankout', 1726411847531, -4837]
    ],
    powerlogs: [['sellpower', 1726389444416, 2150880.2676651]],
    bankreward: 14458.260196556663,
    claimlogs: [
        {
            _id: '66e63456b7a0c6bb5ee3660e',
            createtime: 1726224129500,
            amount: 30,
            state: 'success'
        },
        {
            _id: '66e6f7f0c04983133670f273',
            createtime: 1726412784785,
            amount: 9,
            state: 'success'
        },
        {
            _id: '66e6f82ca1edaebea8bffafd',
            createtime: 1726412844394,
            amount: 20,
            state: 'success'
        },
        {
            _id: '66e6f9cba1edaebea8bffafe',
            createtime: 1726413259193,
            amount: 20,
            state: 'success'
        },
        {
            _id: '66e6fc54a1edaebea8bffaff',
            createtime: 1726413908225,
            amount: 10,
            state: 'success'
        },
        {
            _id: '66e6fd07a1edaebea8bffb00',
            createtime: 1726414087025,
            amount: 1,
            state: 'success'
        },
        {
            _id: '66e6fd4ba1edaebea8bffb01',
            createtime: 1726414155605,
            amount: 1,
            state: 'success'
        }
    ]
};

const formatLogs = (data: any): any[] => {
    // 默认值
    const staticReward = data.staticlogs.map((ele: any[]) => ({ name: 'staticLog', source: '--', date: ele[1], amount: $toFixed(ele[2], 1), key: 1 }));

    // 驱动值
    const dynamicLogs = data.dynamiclogs.map((ele: any[]) => ({ name: 'dynamicLog', source: ele[3], date: ele[1], amount: $toFixed(ele[2], 1), level: ele[4], key: 2 }));

    // 团队
    const teamLogs = data.teamlogs.map((ele: any[]) => ({ name: ele[0], source: ele[3], date: ele[1], amount: $toFixed(ele[2], 1), level: ele[4], key: 3 }));

    // 银行 bankreward/bankin/bankout
    const bankLogs = data.banklogs.map((ele: any[]) => ({ name: ele[0], source: '--', date: ele[1], amount: $toFixed(ele[2], 1), key: 4 }));

    // 提币
    const claimLogs = data.claimlogs.map((ele: any) => ({ name: 'withdrawalLog', source: '--', date: ele.createtime, amount: $toFixed(ele.amount, 1), key: 5 }));

    // 算力
    const powerLogs = data.powerlogs.map((ele: any[]) => ({ name: 'powerLog', source: '--', date: ele[1], amount: $toFixed(ele[2], 1), key: 6 }));

    return [...staticReward, ...dynamicLogs, ...powerLogs, ...teamLogs, ...bankLogs, ...claimLogs]
        .map((ele) => Object.assign(ele, { formatDate: moment(ele.date).format('YYYY.MM.DD HH:mm:ss') }))
        .sort((cur: any, next: any) => {
            if (cur.date > next.date) {
                return -1;
            }
            if (cur.date < next.date) {
                return 1;
            }
            return 0;
        });
};
// console.log('formatLogs:::::::::', formatLogs(_userinfo));

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
    flokiPrice: 1,
    // auth: {
    //     message: '',
    //     signature: '',
    //     expired: 0
    // },
    auth: getSessionAuth(),
    logs: [] as any[],
    info: {
        claiminfo: [],
        orderinfo: [],
        config: {
            announcement: '',
            topaddress: '',
            lastcheckblock: 0,
            receive: []
        },
        userinfo: {
            userinfo: {
                address: '',
                inviter: '',
                registertime: 0,
                level: 0,
                performance: 0,
                flokibalance: '--',
                bankbalance: '--',
                staticreward: '--',
                dynamicreward: '--',
                teamreward: '--',
                ismanual: false,
                cansellpower: true,
                canclaim: true,
                canbankout: true,
                teamcansellpower: true,
                teamcanclaim: true,
                teamcanbankout: true,
                teamlist: [],
                allvalidteam: {},
                label: [],
                staticlogs: [],
                dynamiclogs: [],
                teamlogs: [],
                banklogs: [],
                powerlogs: [],
                bankreward: '--',
                claimlogs: []
            },
            config: {
                lastcheckblock: 0,
                topaddress: '',
                receive: '',
                outaddress: '',
                cansellpower: true,
                canclaim: true,
                canbankout: true,
                bankfeerate: 0.01,
                spower30feerate: 0.1,
                spower60feerate: 0.05,
                bankrewardrate: 0.01,
                staticrewardrate: 0.01,
                samelevelrewardrate: 0.1,
                dynamicrewardrate: [0.15, 0.1],
                teamrewardrate: [0.1, 0.2, 0.3, 0.4, 0.5],
                announcement: ['text', true, true]
            },
            klines: {
                FLOKI: [],
                BTC: [],
                ETH: [],
                BNB: [],
                SOL: [],
                DOGE: [],
                TON: [],
                TRX: [],
                ORDI: []
            },
            orderinfo: []
        }
    } as { [key: string]: any }
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, { payload: info }) {
            state.info = info;
            state.flokiPrice = Number(state.info.klines.FLOKI[0]);
            // state.info.userinfo.level = 2;
            // console.log('------', state.info.userinfo);
            state.logs = formatLogs(state.info.userinfo);
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

            state.flokiPrice = Number(state.info.klines.FLOKI[0]);

            state.logs = formatLogs(state.info.userinfo);
        },

        setInviter(state, { payload: inviter }) {
            state.inviter = inviter;
            if (typeof window !== 'undefined' && inviter && inviter.length === 42) {
                window.sessionStorage.setItem('inviter', inviter);
            }
        }
    }
});
export default UserSlice.reducer;
