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
    const baseCrossRate = currencyRates[currencies[0]] / currencyRates[from];

    const result = (baseCrossRate * fromAmount) * currencyRates[to];

    setToAmount(result);
  }, [currencies, currencyRates, dispatch, fromAmount, from, to]);

  const handleFromCurrencyChange = (newCurrency: string) => {
    setQuery({ from: newCurrency });
  };

  const handleToCurrencyChange = (newCurrency: string) => {
    setQuery({ to: newCurrency });
  };

  const onChangeFromAmount = (fromAmount: number) => {
    setQuery({ amount: fromAmount.toString() });
    const amount = fromAmount / currencyRates[from];
    const result = amount * currencyRates[to];
    setToAmount(result);
    setFromAmount(fromAmount);
  };

  const onChangeToAmount = (toAmount: number) => {
    setFromAmount(toAmount * currencyRates[from] / currencyRates[to]);
    setToAmount(toAmount);
  };

  const handleSwitchCurrency = () => {
    setQuery({ to: from, from: to });
  };

  return (
    <Layout className={styles.wrapper}>
      {error ?
        <h2 className={styles.errorMessage}>Error occurred : {error}</h2>

        : isLoading === 'resolved'
          ? (
            <>
              <h5>{fromAmount.toFixed(2)} {from} is equivalent to</h5>
              <h2>{toAmount.toFixed(2)} {to}</h2>
              <p>as of {date}</p>

              <div className={styles.currencyRow}>
                <CurrencyRow
                  selectedCurrency={from}
                  amount={fromAmount}
                  onChangeCurrency={({ target }) => handleFromCurrencyChange(target.value)}
                  onAmountChange={({ target }) => onChangeFromAmount(+target.value)}
                />
                <div className={styles.currencySwitch} onClick={handleSwitchCurrency}>
                  <SwitchCurrency />
                </div>
                <CurrencyRow
                  selectedCurrency={to}
                  amount={toAmount}
                  onChangeCurrency={({ target }) => handleToCurrencyChange(target.value)}
                  onAmountChange={({ target }) => onChangeToAmount(+target.value)}
                />
              </div>
            </>
          )
          : <Loader />
      }
    </Layout>
  );
}