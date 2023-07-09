import './App.css';
import Rechart2 from "./Rechart_2";
import Rechart1 from "./Rechart_1";
import Search from "./search";
import ArticleList from './article';
import Table from './Table';
function App() {
  return (
    
    <div >
  <div style={{ display: "flex" }}>
    <div style={{ width: 600, height: 400 }}>
      <Rechart1 />
      <Table/>
      <Search />
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

export default App;