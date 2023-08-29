import { News, MockInvestmentRanking, Table } from '../component/chart/Chart_Main';
import './css/ChartMain.css'

import Header from "../component/Header";
import Chart_search from "../component/chart/Chart_Search";
function ChartMain() {
      return (
        <div className="Chart_Main">
          <header className="mb-4"><Header /></header>
          <div className="news-search-container">
            <News />
            <div className='chart_main_search'>
            <Chart_search />
            </div>
            <MockInvestmentRanking/>
          </div>
          <div className="table-container_main">
            <Table />
          </div>
        </div>
      );
    }

export default ChartMain;