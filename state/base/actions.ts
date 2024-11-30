import { createAction } from '@reduxjs/toolkit';

export const setBindModal = createAction<boolean>('base/setBindModal');
export const setNoticeModal = createAction<boolean>('base/setNoticeModal');
export const setWithdrawAleoModal = createAction<boolean>('base/setWithdrawAleoModal');
export const setBindInviteTipModal = createAction<boolean>('base/setBindInviteTipModal');
export const setFirstScreen = createAction<boolean>('base/setFirstScreen');
export const setProcessModal = createAction<boolean>('base/setProcessModal');
export const setProcessTime = createAction<number>('base/setProcessTime');
export const setMaxProcessTime = createAction<number>('base/setMaxProcessTime');
export const setVoice = createAction<'open' | 'close'>('base/setVoice');
