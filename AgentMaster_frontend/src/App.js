import './App.css';
import React from 'react';
/*import {
  Rechart1,
  Rechart2,
  Search2,
  ArticleList,
  Table,
} from './component';

function App() {
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

import {
  News,  
  Search,
  Table,
}  from './ChartMain';


  function App() {
    return (
      <div className="app">
        <div className="news-search-container">
          <News />
          <Search />
        </div>
        <div className="table-container">
          <Table />
        </div>
      </div>
    );
  }
  

export default App;

