import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showBindModal: false,
    showProcessModal: false,
    showBindInviteTipModal: false,
    showNoticeModal: false,
    processTime: 30,
    maxProcessTime: 30,
    firstScreen: true
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
        setFirstScreen(state, { payload: flag }) {
            state.firstScreen = flag;
        }
    }
});
export default BaseSlice.reducer;
