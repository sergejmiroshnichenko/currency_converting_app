import { useSearchParams } from 'react-router-dom';

export const useSearchQuery = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  const setQuery = (data: { [key: string]: string }) => {
    setSearchParam({ ...Object.fromEntries(searchParams.entries()), ...data });
  };

  return {
    setQuery,
    searchParams,
  };
};