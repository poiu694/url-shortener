import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from '../pages/MainPage';
import RedirectPage from '../pages/RedirectPage';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:url" element={<RedirectPage />} />
      </Routes>
    </BrowserRouter>
  );
}
