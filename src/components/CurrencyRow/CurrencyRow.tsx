import {ChangeEvent, FC} from 'react';
import {useAppSelector} from 'hooks/redux-hooks.ts';

interface ICurrencyRow {
    selectedCurrency: string;
    onChangeCurrency: (e: ChangeEvent<HTMLSelectElement>) => void;
    onAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
    amount: number;
}

export const CurrencyRow: FC<ICurrencyRow> = ({selectedCurrency, onChangeCurrency, amount, onAmountChange}) => {

  const {currencies} = useAppSelector(state => state.currencyRates);

  return (
    <div>
      <input type="number"
        min="0"
        value={amount.toString()}
        onChange={onAmountChange}
      />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencies.map((currency, id) =>
          <option key={id} value={currency}>
            {currency}
          </option>,
        )}
      </select>
    </div>
  );
};