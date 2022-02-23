import {createAction} from '@reduxjs/toolkit';

export const setMonth = createAction<number>('SET_MONTH');

export const setMonthSuccsess = createAction<number>('setMonthSuccsess');