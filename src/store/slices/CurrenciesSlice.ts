import { ICurrencyRates, IExchangeRateResponse } from 'types/IRates.type.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ACCESS_KEY, BASE_URL } from 'services/consts.ts';

interface ICurrenciesState {
  currencyRates: ICurrencyRates;
  currencies: string[];
  date: string;
  base: string;
  isLoading: 'loading' | 'resolved' | 'rejected' | null;
  error: string;
}

const initialState: ICurrenciesState = {
  currencyRates: {},
  currencies: [],
  date: '',
  base: '',
  isLoading: null,
  error: '',
};

export const fetchAllCurrencyRates = createAsyncThunk<IExchangeRateResponse, undefined, { rejectValue: string }>(
  'currencies/fetchAllCurrencyRates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<IExchangeRateResponse>(`${BASE_URL}?access_key=${API_ACCESS_KEY}`);

      if (response.status !== 200 || !response.data.success) {
        return rejectWithValue('Error');
      }

      return response.data;

    } catch (error) {
      return rejectWithValue('Error fetching data');
    }
  },
);

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCurrencyRates.pending, (state) => {
        state.isLoading = 'loading';
        state.error = '';
      })
      .addCase(fetchAllCurrencyRates.fulfilled, (state, action) => {
        state.isLoading = 'resolved';
        state.currencyRates = action.payload.rates;
        const { base, rates } = action.payload;
        state.currencies = [base, ...Object.keys(rates)];
        state.date = action.payload.date;
        state.base = action.payload.base;
      })
      .addCase(fetchAllCurrencyRates.rejected, (state, action) => {
        state.isLoading = 'rejected';
        state.error = action.payload as string;
      });
  },
});

export default currenciesSlice.reducer;