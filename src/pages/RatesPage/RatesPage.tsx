import styles from './RatesPage.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { FC, useEffect, useState } from 'react';
import { changeFromCurrency, fetchAllCurrencyRates } from 'store/slices/CurrenciesSlice.ts';
import { Layout } from 'components/Layout/Layout.tsx';
import { Loader } from 'components/Loader/Loader.tsx';

export const RatesPage: FC = () => {

  const [fromAmount, setFromAmount] = useState(1);

  const [convertedValues, setConvertedValues] = useState<Record<string, number>>({});

  const { currencyRates, currencies, fromCurrency, error, isLoading } = useAppSelector(state => state.currencyRates);

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
    dispatch(changeFromCurrency(fromCurrency));
  }, [currencies, currencyRates, dispatch, fromAmount, fromCurrency]);

  const handleFromCurrencyChange = (newCurrency: string) => {
    dispatch(changeFromCurrency(newCurrency));
  };

  return (
    <Layout className={styles.wrapper}>
      {error ?
        <h1>Error occurred : {error}</h1>

        : isLoading === 'resolved'
          ? (
            <div style={{ overflowY: 'auto', maxHeight: 500, width: 500 }}>
              <div>
                <input type="number"
                  min="0"
                  value={fromAmount.toString()}
                  onChange={({ target }) => setFromAmount(+target.value)}
                />
                <select
                  value={fromCurrency}
                  onChange={({ target }) => handleFromCurrencyChange(target.value)}
                >
                  {currencies.map((currency, id) =>
                    <option key={id} value={currency}>
                      {currency}
                    </option>,
                  )}
                </select>
              </div>

              {Object.entries(convertedValues).map(([currencyCode, rate]) => {
                return (
                  <div style={{ display: 'flex' }} key={currencyCode}>
                    <div>{currencyCode} -</div>
                    <div> {(fromAmount * rate).toFixed(2)}</div>
                  </div>
                );
              })
              }
            </div>
          )
          : <Loader />
      }
    </Layout>
  );
};