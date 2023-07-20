import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NewsSearch from './NewsSearch';
import Detail from './Detail';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/searchList' element={<NewsSearch />}></Route>
      <Route path='/newsDetail' element={<Detail />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;