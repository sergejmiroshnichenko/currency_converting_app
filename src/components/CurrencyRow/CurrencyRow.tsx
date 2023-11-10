import { FC } from 'react';
import { useAppSelector } from 'hooks/redux-hooks.ts';


export const CurrencyRow: FC = () => {

  const { currencyRates } = useAppSelector(state => state.currencyRates);

  return (
    <div>
      <input type="number" />
      <select>
        {currencyRates.map((currency, id) => <option key={id} value={currency}>{currency}</option>)}
      </select>
    </div>
  );
};