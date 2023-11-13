import styles from './MainPage.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { changeFromCurrency, changeToCurrency, fetchAllCurrencyRates } from 'store/slices/CurrenciesSlice.ts';
import { CurrencyRow } from 'components/CurrencyRow/CurrencyRow.tsx';
import { HiOutlineSwitchVertical as SwitchCurrency } from 'react-icons/hi';


export function MainPage() {

  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const { error, isLoading, date, fromCurrency, toCurrency, currencyRates } = useAppSelector(state => state.currencyRates);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCurrencyRates());
  }, [dispatch]);

  const handleFromCurrencyChange = (newCurrency: string) => {
    dispatch(changeFromCurrency(newCurrency));
  };

  const handleToCurrencyChange = (newCurrency: string) => {
    dispatch(changeToCurrency(newCurrency));
  };

  const onChangeFromAmount = (value: number) => {
    const amount = value / currencyRates[fromCurrency];
    const result = amount * currencyRates[toCurrency];
    setToAmount(result);
    setFromAmount(value);
  };

  const onChangeToAmount = (value: number) => {
    setToAmount(value);
  };

  return (
    <section>
      {error ?
        <h1>Error occurred : {error}</h1>

        : isLoading === 'resolved'
          ? (
            <div className={styles.card}>
              <h5>1 {fromCurrency} is equivalent to</h5>
              <h2>1.87 {toCurrency}</h2>
              <p>as of {date}</p>

              <div className={styles.currencyRow}>
                <CurrencyRow
                  selectedCurrency={fromCurrency}
                  value={fromAmount}
                  onChangeCurrency={({ target }) => handleFromCurrencyChange(target.value)}
                  onChangeValue={(e) => onChangeFromAmount(Number(e.target.value))}
                />
                <div className={styles.currencySwitch}>
                  <SwitchCurrency />
                </div>
                <CurrencyRow
                  selectedCurrency={toCurrency}
                  value={toAmount}
                  onChangeCurrency={({ target }) => handleToCurrencyChange(target.value)}
                  onChangeValue={(e) => onChangeToAmount(Number(e.target.value))}
                />
              </div>
            </div>
          )
          : <h2>Loading...</h2>
      }
    </section>
  );
}