import { createSlice } from '@reduxjs/toolkit';
import { Storage } from '@/utils/storage';

const initialState = {
    showBindModal: false,
    showProcessModal: false,
    showBindInviteTipModal: false,
    showNoticeModal: false,
    processTime: 30,
    maxProcessTime: 30,
    firstScreen: true,
    voice: typeof window === 'undefined' ? 'close' : Storage.getItem('voice') || ('close' as 'open' | 'close')
};

const BaseSlice = createSlice({
    name: 'base',
    initialState,
    reducers: {
        setBindModal(state, { payload: open }) {
            state.showBindModal = open;
        },
        setNoticeModal(state, { payload: open }) {
            state.showNoticeModal = open;
        },
        setProcessModal(state, { payload: open }) {
            state.showProcessModal = open;
        },
        setBindInviteTipModal(state, { payload: open }) {
            state.showBindInviteTipModal = open;
        },
        setProcessTime(state, { payload: time }) {
            state.processTime = time;
        },
        setMaxProcessTime(state, { payload: time }) {
            state.maxProcessTime = time;
        },
        setVoice(state, { payload: status }) {
            state.voice = status;
            Storage.setItem('voice', status);
        },
        setFirstScreen(state, { payload: flag }) {
            state.firstScreen = flag;
        }
    }
});
export default BaseSlice.reducer;
