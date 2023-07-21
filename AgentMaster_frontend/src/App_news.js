import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App_news.css';
import NewsMain from './NewsMain';
import NewsSearch from './NewsSearch'
import Detail from './Detail'
import NewsDetail from './NewsDetail';

function App_news() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<NewsMain />}></Route>
      <Route path='/searchList' element={<NewsSearch />} />
      <Route path='/newsDetail' element={<NewsDetail />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App_news;