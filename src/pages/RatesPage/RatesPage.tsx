import styles from './RatesPage.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { useEffect, useState } from 'react';
import { fetchAllCurrencyRates } from 'store/slices/CurrenciesSlice.ts';
import { Layout } from 'components/Layout/Layout.tsx';
import { Loader } from 'components/Loader/Loader.tsx';
import { useSearchQuery } from 'hooks/useSearchQuery.ts';

export function RatesPage() {

  const { setQuery, searchParams } = useSearchQuery();

  const from = searchParams.get('from') || 'EUR';

  const [fromAmount, setFromAmount] = useState(Number(searchParams.get('amount')) || 1);

  const [fromCurrency, setFromCurrency] = useState(from);

  const [convertedValues, setConvertedValues] = useState<Record<string, number>>({});

  const { currencyRates, currencies, error, isLoading } = useAppSelector(state => state.currencyRates);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCurrencyRates());
  }, [dispatch]);

  useEffect(() => {
    const baseCrossRate = currencyRates[currencies[0]] / currencyRates[fromCurrency];
    const updatedConvertedValues: Record<string, number> = {};

    for (const [currencyCode, rate] of Object.entries(currencyRates)) {
      updatedConvertedValues[currencyCode] = (baseCrossRate * fromAmount) * rate;
    }

    setConvertedValues(updatedConvertedValues);
    setFromCurrency(fromCurrency);
  }, [currencies, currencyRates, dispatch, fromAmount, fromCurrency]);

  const handleFromCurrencyChange = (newCurrency: string) => {
    setFromCurrency(newCurrency);
    setQuery({ from: newCurrency });
  };

  const onChangeFromAmount = (fromAmount: number) => {
    setQuery({ amount: fromAmount.toString() });
    setFromAmount(fromAmount);
  };

  return (
    <Layout className={styles.wrapper}>
      {error ?
        <h2 className={styles.errorMessage}>Error occurred : {error}</h2>

        : isLoading === 'resolved'
          ? (
            <>
              <div className={styles.currencyInputContainer}>
                <input type="number"
                  min="0"
                  value={fromAmount.toString()}
                  onChange={({ target }) => onChangeFromAmount(+target.value)}
                />
                <select
                  value={fromCurrency}
                  onChange={({ target }) => handleFromCurrencyChange(target.value)}
                >
                  {currencies?.map((currency, id) =>
                    <option key={id} value={currency}>
                      {currency}
                    </option>,
                  )}
                </select>
              </div>

              <div className={styles.convertedValuesContainer}>
                {Object.entries(convertedValues).map(([currencyCode, rate]) => (
                  <div className={styles.convertedValue} key={currencyCode}>
                    <p>{currencyCode}</p>
                    <p> {(fromAmount * rate).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </>
          )
          : <Loader />
      }
    </Layout>
  );
}
