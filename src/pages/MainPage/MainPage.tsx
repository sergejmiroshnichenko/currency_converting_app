import styles from './MainPage.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { fetchAllCurrencyRates } from 'store/slices/CurrenciesSlice.ts';
import { CurrencyRow } from 'components/CurrencyRow/CurrencyRow.tsx';
import { GoArrowSwitch as SwitchCurrency } from 'react-icons/go';
import { Layout } from 'components/Layout/Layout.tsx';
import { Loader } from 'components/Loader/Loader.tsx';
import { useSearchQuery } from 'hooks/useSearchQuery.ts';

export function MainPage() {

  const { setQuery, searchParams } = useSearchQuery();

  const from = searchParams.get('from') || 'EUR';
  const to = searchParams.get('to') || 'AED';

  const [fromAmount, setFromAmount] = useState(Number(searchParams.get('amount')) || 1);
  const [toAmount, setToAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState(from);
  const [toCurrency, setToCurrency] = useState(to);

  const {
    error,
    isLoading,
    date,
    currencyRates,
    currencies,
  } = useAppSelector(state => state.currencyRates);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCurrencyRates());
  }, [dispatch]);


  useEffect(() => {
    const baseCrossRate = currencyRates[currencies[0]] / currencyRates[fromCurrency];

    const result = (baseCrossRate * fromAmount) * currencyRates[toCurrency];

    setToAmount(result);
    setToCurrency(toCurrency);
    setFromCurrency(fromCurrency);
  }, [currencies, currencyRates, dispatch, fromAmount, fromCurrency, toCurrency]);

  const handleFromCurrencyChange = (newCurrency: string) => {
    setFromCurrency(newCurrency);
    setQuery({ from: newCurrency });
  };

  const handleToCurrencyChange = (newCurrency: string) => {
    setToCurrency(newCurrency);
    setQuery({ to: newCurrency });
  };

  const onChangeFromAmount = (fromAmount: number) => {
    setQuery({ amount: fromAmount.toString() });
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
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
    setQuery({ to: tempCurrency, from: toCurrency });
  };

  return (
    <Layout className={styles.wrapper}>
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
          : <Loader />
      }
    </Layout>
  );
}