import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewsMain from './router/NewsMain';
import NewsSearch from './router/NewsSearch';
import NewsDetail from './router/NewsDetail';
import ChartDetail from './router/ChartDetail';
import ChartMain from './router/ChartMain';
import UserPage from './router/UserPage';
import SimulMain from './router/SimulMain';
import NotFound from './router/NotFound';
import SimTrade from "./router/SimTrade";
import Chart from './component/news/Chart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NewsMain />} />
        <Route path='/newsMain' element={<NewsMain />} />
        <Route path='/searchList' element={<NewsSearch />} />
        <Route path='/newsDetail' element={<NewsDetail />} />
        <Route path='/chartMain' element={<ChartMain />} />
        <Route path='/chartDetail' element={<ChartDetail />} />
        <Route path='/userPage' element={<UserPage />} />
        <Route path='/simulMain' element={<SimulMain />} />
        <Route path='/simulTrade' element={<SimTrade />} />
        <Route path='/*' element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
