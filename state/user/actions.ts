import { createAction } from '@reduxjs/toolkit';

export const setUserInfo = createAction<{ [key: string]: any }>('user/setUserInfo');
export const handUpdateUser = createAction<{ [key: string]: any }>('user/updateUser');
export const setInviter = createAction<string>('user/setInviter');
export const setIsGotRecords = createAction<boolean>('user/setIsGotRecords');
export const setAuth = createAction<ApiType.auth>('user/setAuth');
