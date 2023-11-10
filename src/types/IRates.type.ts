export interface IExchangeRateResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: ICurrencyRates;
}

export interface ICurrencyRates {
  [currencyCode: string]: number;
}