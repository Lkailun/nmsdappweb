import { createAction } from '@reduxjs/toolkit';

export const setLuckData = createAction<any>('game/setLuckData');
export const updateLuckGameData = createAction<any>('game/updateLuckGameData');
export const setBtcData = createAction<any>('game/setBtcData');
export const updateBtcGameData = createAction<any>('game/updateBtcGameData');
