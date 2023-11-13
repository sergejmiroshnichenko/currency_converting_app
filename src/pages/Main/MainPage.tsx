import styles from './MainPage.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import {
  changeFromCurrency,
  changeToCurrency,
  fetchAllCurrencyRates,
  switchCurrency,
} from 'store/slices/CurrenciesSlice.ts';
import { CurrencyRow } from 'components/CurrencyRow/CurrencyRow.tsx';
import { HiOutlineSwitchVertical as SwitchCurrency } from 'react-icons/hi';


export function MainPage() {

  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(0);

  const {
    error,
    isLoading,
    date,
    fromCurrency,
    toCurrency,
    currencyRates,
    currencies,
  } = useAppSelector(state => state.currencyRates);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCurrencyRates());
  }, [dispatch]);


  useEffect(() => {

    const baseCurrencyRate = currencyRates[currencies[0]] / currencyRates[fromCurrency];

    const result = (baseCurrencyRate * fromAmount) * currencyRates[toCurrency];

    setToAmount(result);
    dispatch(changeFromCurrency(fromCurrency));
    dispatch(changeToCurrency(toCurrency));

  }, [currencies, currencyRates, dispatch, fromAmount, fromCurrency, toCurrency]);


  const handleFromCurrencyChange = (newCurrency: string) => {
    dispatch(changeFromCurrency(newCurrency));
  };

  const handleToCurrencyChange = (newCurrency: string) => {
    dispatch(changeToCurrency(newCurrency));
  };

  const onChangeFromAmount = (fromAmount: number) => {
    const amount = fromAmount / currencyRates[fromCurrency];
    const result = amount * currencyRates[toCurrency];
    setToAmount(result);
    setFromAmount(fromAmount);
  };

  const onChangeToAmount = (toAmount: number) => {
    setFromAmount(toAmount * currencyRates[fromCurrency] / currencyRates[toCurrency]);
    setToAmount(toAmount);
  };

  const handleSwitchCurrency = () => {
    dispatch(switchCurrency());
  };

  return (
    <section>
      {error ?
        <h1>Error occurred : {error}</h1>

        : isLoading === 'resolved'
          ? (
            <div className={styles.card}>
              <h5>{fromAmount.toFixed(2)} {fromCurrency} is equivalent to</h5>
              <h2>{toAmount.toFixed(2)} {toCurrency}</h2>
              <p>as of {date}</p>

              <div className={styles.currencyRow}>
                <CurrencyRow
                  selectedCurrency={fromCurrency}
                  amount={fromAmount}
                  onChangeCurrency={({ target }) => handleFromCurrencyChange(target.value)}
                  onAmountChange={({ target }) => onChangeFromAmount(+target.value)}
                />
                <div className={styles.currencySwitch} onClick={handleSwitchCurrency}>
                  <SwitchCurrency />
                </div>
                <CurrencyRow
                  selectedCurrency={toCurrency}
                  amount={toAmount}
                  onChangeCurrency={({ target }) => handleToCurrencyChange(target.value)}
                  onAmountChange={({ target }) => onChangeToAmount(+target.value)}
                />
              </div>
            </div>
          )
          : <h2>Loading...</h2>
      }
    </section>
  );
}