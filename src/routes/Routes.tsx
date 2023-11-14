import { Route, Routes } from 'react-router-dom';
import { MainPage } from 'pages/MainPage/MainPage.tsx';
import { RatesPage } from 'pages/RatesPage/RatesPage.tsx';
import { AboutPage } from 'pages/AboutPage/AboutPage.tsx';


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
        element={<AboutPage />}
      />
    </Routes>
  );
}