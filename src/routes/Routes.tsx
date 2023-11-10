import { Route, Routes } from 'react-router-dom';
import { MainPage } from 'pages/Main/MainPage.tsx';
import { RatesPage } from 'pages/RatesPage/RatesPage.tsx';
import { RandomPage } from 'pages/RandomPage/RandomPage.tsx';


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/"
        element={<MainPage />}
      />
      <Route path="/rates"
        element={<RatesPage />}
      />
      <Route path="/about"
        element={<RandomPage />}
      />
    </Routes>
  );
}