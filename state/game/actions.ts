import { createAction } from '@reduxjs/toolkit';
import { GameResult } from './reducer';

export const setLuckData = createAction<any>('game/setLuckData');
export const updateLuckGameData = createAction<any>('game/updateLuckGameData');
export const setLuckGameResult = createAction<Partial<GameResult>>('game/setLuckGameResult');

export const setBtcData = createAction<any>('game/setBtcData');
export const updateBtcGameData = createAction<any>('game/updateBtcGameData');
export const setBtcGameResult = createAction<Partial<GameResult>>('game/setBtcGameResult');
