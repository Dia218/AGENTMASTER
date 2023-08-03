<<<<<<< HEAD
import { News, Search, MockInvestmentRanking, Table } from '../component/chart/Chart_Main';
import './css/ChartMain.css'
import Header from "../component/Header";

function ChartMain() {
      return (
        <div className="app">
          <header className="mb-4"><Header /></header>
          <div className="news-search-container">
            <News />
            <Search />
            <MockInvestmentRanking/>
          </div>
          <div className="table-container_main">
            <Table />
          </div>
        </div>
      );
    }

export default ChartMain;

=======
import { News, Search, MockInvestmentRanking, Table } from '../component/chart/Chart_Main';
import './css/ChartMain.css'
import Header from "../component/Header";

function ChartMain() {
      return (
        <div>
          <header className="mb-4"><Header /></header>
          <div className="news-search-container">
            <News />
            <Search />
            <MockInvestmentRanking/>
          </div>
          <div className="table-container_main">
            <Table />
          </div>
        </div>
      );
    }

export default ChartMain;

>>>>>>> 89e7cde946440fd927f4a5bc79f2e42f14b50b78
