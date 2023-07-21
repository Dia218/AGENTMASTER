import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NewsMain from './NewsMain';
import NewsSearch from './NewsSearch'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<NewsMain />}></Route>
      <Route path='/searchList' element={<NewsSearch />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;