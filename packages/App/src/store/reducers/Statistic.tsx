import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {setMonthSuccsess} from '../actions/StatisticActions';

interface Month {
  month: number;
}

const initialState: Month = {
  month: 0,
};

const Statistic = createReducer<Month>(initialState, builder => {
  builder.addCase(setMonthSuccsess, (state, action) => {
    state.month = action.payload;
    return state;
  });
});

export default Statistic;
