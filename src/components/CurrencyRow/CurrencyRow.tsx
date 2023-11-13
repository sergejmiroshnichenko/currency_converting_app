import { ChangeEvent, FC } from 'react';
import { useAppSelector } from 'hooks/redux-hooks.ts';

interface ICurrencyRow {
  selectedCurrency: string;
  onChangeCurrency: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  value: number;
}

export const CurrencyRow: FC<ICurrencyRow> = ({ selectedCurrency, onChangeCurrency, value, onChangeValue }) => {

  const { currencies } = useAppSelector(state => state.currencyRates);

  return (
    <div>
      <input type="number" value={value} onChange={onChangeValue} />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencies.map((currency, id) =>
          <option key={id} value={currency}>{currency}</option>)}
      </select>
    </div>
  );
};