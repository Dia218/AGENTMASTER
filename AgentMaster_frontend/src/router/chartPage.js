import { News, Search, MockInvestmentRanking, Table } from '../component/chart/Chart_Main';
  
function ChartMain() {
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

export default ChartMain;