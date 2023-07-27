import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewsMain from './router/NewsMain';
import NewsSearch from './router/NewsSearch';
import NewsDetail from './router/NewsDetail';
import ChartDetail from './router/chartDetail';
import ChartMain from './router/ChartMain';
import UserPage from './router/UserPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NewsMain />} />
        <Route path='/searchList' element={<NewsSearch />} />
        <Route path='/newsDetail' element={<NewsDetail />} />
        <Route path='/chartMain' element={<ChartMain />} />
        <Route path='/chartDetail' element={<ChartDetail />} />
        <Route path='/userPage' element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;