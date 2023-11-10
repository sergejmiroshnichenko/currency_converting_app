import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { fetchAllCurrencyRates } from 'store/slices/CurrenciesSlice.ts';
import { CurrencyRow } from 'components/CurrencyRow/CurrencyRow.tsx';

export function MainPage() {

  // const [data, setData] = useState();
  //
  // const API_ACCESS_KEY = 'fda5696baa5b680c21d205a730549083';
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://api.exchangeratesapi.io/v1/latest?access_key=${API_ACCESS_KEY}`);
  //       console.log('response.data', response.data);
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const dispatch = useAppDispatch();

  const { error, isLoading } = useAppSelector(state => state.currencyRates);

  useEffect(() => {
    dispatch(fetchAllCurrencyRates());
  }, [dispatch]);

  return (
    <section>
      {error ?
        <h1>Error occurred : {error}</h1>

        : isLoading === 'resolved'
          ? (
            <>
              <CurrencyRow />
              <CurrencyRow />
            </>
          )
          : <h2>Loading...</h2>
      }
    </section>
  );
}