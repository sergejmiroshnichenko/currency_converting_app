import { configureStore } from '@reduxjs/toolkit';
import currenciesSlice from 'store/slices/CurrenciesSlice.ts';

export const store = configureStore({
  devTools: true,
  reducer: {
    currencyRates: currenciesSlice,
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;