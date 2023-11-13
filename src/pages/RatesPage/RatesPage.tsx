import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { useEffect, useState } from 'react';
import { fetchAllCurrencyRates } from 'store/slices/CurrenciesSlice.ts';

export function RatesPage() {

  const [fromAmount, setFromAmount] = useState(1);

  const dispatch = useAppDispatch();

  const {
    // fromCurrency,
    // toCurrency,
    currencyRates,

  } = useAppSelector(state => state.currencyRates);

  // const onChangeFromAmount = (fromAmount: number) => {
  //   const amount = fromAmount / currencyRates[fromCurrency];
  //   const result = amount * currencyRates[toCurrency];
  //   setToAmount(result);
  //   setFromAmount(fromAmount);
  // };

  useEffect(() => {
    dispatch(fetchAllCurrencyRates());
  }, [dispatch]);

  const { currencies } = useAppSelector(state => state.currencyRates);
  console.log('currencyRates', currencyRates);


  return (
    <div style={{ overflowY: 'auto', maxHeight: 500, width: 500 }}>
      <h2>Rates Page</h2>
      <div>
        <input type="number"
          min="0"
          value={fromAmount.toString()}
          onChange={({ target }) => setFromAmount(parseInt(target.value, 10))}
        />
        <select
          // value={selectedCurrency} onChange={onChangeCurrency}
        >
          {currencies.map((currency, id) =>
            <option key={id} value={currency}>
              {currency}
            </option>,
          )}
        </select>
      </div>

      {Object.entries(currencyRates).map(([currencyCode, rate]) => (
        <div style={{ display: 'flex', paddingRight: 50 }} key={currencyCode}>
          <div>{currencyCode} --</div>
          <div> {rate.toFixed(3)}</div>
        </div>
      ))
      }
    </div>
  );
}