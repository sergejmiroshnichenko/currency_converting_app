import {useAppDispatch, useAppSelector} from 'hooks/redux-hooks.ts';
import {useEffect, useState} from 'react';
import {changeFromCurrency, fetchAllCurrencyRates} from 'store/slices/CurrenciesSlice.ts';

export function RatesPage() {

  const [fromAmount, setFromAmount] = useState(1);

  const dispatch = useAppDispatch();

  const {currencyRates, currencies, base, fromCurrency} = useAppSelector(state => state.currencyRates);

  useEffect(() => {
    dispatch(fetchAllCurrencyRates());
  }, [dispatch]);


  useEffect(() => {

    const baseCurrencyRate = currencyRates[base] / currencyRates[fromCurrency];
    console.log('baseCurrencyRate', baseCurrencyRate);

    const result = (baseCurrencyRate * fromAmount) * currencyRates[currencies[1]];
    console.log('result', result)

    // setToAmount(result);
    dispatch(changeFromCurrency(fromCurrency));
    // dispatch(changeToCurrency(toCurrency));

  }, [base, currencies, currencyRates, dispatch, fromAmount, fromCurrency]);

  const handleFromCurrencyChange = (newCurrency: string) => {
    dispatch(changeFromCurrency(newCurrency));
  };

  return (
    <div style={{overflowY: 'auto', maxHeight: 500, width: 500}}>
      <div>
        <input type="number"
          min="0"
          value={fromAmount.toString()}
          onChange={({target}) => setFromAmount(+target.value)}
        />
        <select
          value={fromCurrency}
          onChange={({target}) => handleFromCurrencyChange(target.value)}
        >
          {currencies.map((currency, id) =>
            <option key={id} value={currency}>
              {currency}
            </option>,
          )}
        </select>
      </div>

      {Object.entries(currencyRates).map(([currencyCode, rate]) => (
        <div style={{display: 'flex'}} key={currencyCode}>
          <div>{currencyCode} -</div>
          <div> {(fromAmount * Number(rate)).toFixed(2)}</div>
        </div>
      ))
      }
    </div>
  );
}