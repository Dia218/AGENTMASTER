import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NewsMain from './NewsMain';
import SearchResult from './SearchResult';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<NewsMain />}></Route>
      <Route path='/searchList' element={<SearchResult />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;