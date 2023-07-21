import React from 'react';
import './App_chart.css';
/*import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { News, Table, MockInvestmentRanking } from './ChartMain';
import { ArticleList, Table as ComponentTable, Rechart1, Rechart2, Search2 } from './component';
import { Search } from './ChartMain';
function App_chart() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/">
          <div>
            <News />
            <Table />
            <MockInvestmentRanking />
          </div>
          <Search onSearch={handleSearch} />
        </Route>
        <Route path="/component">
          <div>
            <ArticleList />
            {searchQuery === '백광산업' ? (
              <>
                <ComponentTable />
                <Rechart1 />
                <Rechart2 />
                <Search2 />
              </>
            ) : null}
          </div>
        </Route>
      </Routes>
    </Router>
  );
}
*/


//차트 새페이지
/*import {
  Rechart1,
  Rechart2,
  Search2,
  ArticleList,
  Table,
} from './component';

function App_chart() {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: 600, height: 400 }}>
          <Rechart1 />
          <Table />
          <Search2 />
        </div>
        <div style={{ width: 600, height: 400 }}>
          <Rechart2 />
        </div>
      </div>
      <div>
        <ArticleList />
      </div>
    </div>
  );
}
*/


//차트 메인페이지
import {
  News,  
  Search,
  Table,
  MockInvestmentRanking,
}  from './ChartMain';


  function App_chart() {
    return (
      <div className="app">
        <div className="news-search-container">
          <News />
          <Search />
          <MockInvestmentRanking/>
        </div>
        <div className="table-container">
          <Table />
        </div>
      </div>
    );
  }
  

  //사용자 페이지
 /*import{
    UserInfoForm,
    KeywordAlert,
    ScrapedArticles,
  } from './User';

  function App_chart() {
  return (
  <div className="App">
    <div className="container border">
      <UserInfoForm />
      <KeywordAlert />
      <ScrapedArticles/>
    </div>
  </div>

  );
  }*/

  export default App_chart;