import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewsMain from './router/NewsMain';
import NewsSearch from './router/NewsSearch';
import NewsDetail from './router/NewsDetail';
import ChartMain from './router/chartPage';
import ChartDetail from './router/chartDetail';
import UserPage from './router/userPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<NewsMain />} />
        <Route path='/searchList' element={<NewsSearch />} />
        <Route path='/newsDetail' element={<NewsDetail />} />
        <Route path='/chartPage' element={<ChartMain />} />
        <Route path='/chartDetail' element={<ChartDetail />} />
        <Route path='/userPage' element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;