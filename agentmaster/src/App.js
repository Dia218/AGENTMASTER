import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NewsMain from './NewsMain';
import NewsSearch from './NewsSearch'
import Detail from './Detail'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<NewsMain />}></Route>
      <Route path='/searchList' element={<NewsSearch />} />
      <Route path='/newsDetail' element={<Detail />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;