import { IExchangeRateResponse } from 'types/IRates.type.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface ICurrenciesState {
  currencyRates: string[];
  isLoading: 'loading' | 'resolved' | 'rejected' | null;
  error: string;
}

const initialState: ICurrenciesState = {
  currencyRates: [],
  isLoading: null,
  error: '',
};

const API_ACCESS_KEY = 'fda5696baa5b680c21d205a730549083';

export const fetchAllCurrencyRates = createAsyncThunk<IExchangeRateResponse, undefined, { rejectValue: string }>(
  'currencies/fetchAllCurrencyRates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<IExchangeRateResponse>(`http://api.exchangeratesapi.io/v1/latest?access_key=${API_ACCESS_KEY}`);
      console.log('response.data', response.data);

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
        const { base, rates } = action.payload;
        state.isLoading = 'resolved';
        state.currencyRates = [base, ...Object.keys(rates)];
      })
      .addCase(fetchAllCurrencyRates.rejected, (state, action) => {
        state.isLoading = 'rejected';
        state.error = action.payload as string;
      });
  },
});

export default currenciesSlice.reducer;