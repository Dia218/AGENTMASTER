import { News, Search, MockInvestmentRanking, Table } from '../component/chart/Chart_Main';
import './css/ChartMain.css'
import Header from "../component/Header";

function ChartMain() {
      return (
        <div className="Chart_Main">
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