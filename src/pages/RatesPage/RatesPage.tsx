import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { useEffect } from 'react';
import { fetchAllCurrencyRates } from 'store/slices/CurrenciesSlice.ts';

export function RatesPage() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCurrencyRates());
  }, [dispatch]);

  const { currencyRates } = useAppSelector(state => state.currencyRates);
  console.log('currencyRates', currencyRates);


  return (
    <div style={{ overflowY: 'auto', maxHeight: 500 }}>
      <h2>Rates Page</h2>
      {Object.entries(currencyRates).map(([currencyCode, rate]) => (
        <div style={{ display: 'flex', paddingRight: 50 }} key={currencyCode}>
          <div>{currencyCode} --</div>
          <div> {rate}</div>
        </div>
      ))
      }
    </div>
  );
}