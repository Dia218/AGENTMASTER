import { Rechart1, Rechart2, Search2, ArticleList, Table,} from '../component/chart/component';
import './css/ChartNew.css'
import Header from "../component/Header";
export function ChartDetail() {
    return (
      <div>
        <header className="mb-4"><Header /></header>
        <div style={{ display: 'flex'}}>
        <div>
          <Rechart1 />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <Search2 />
            <Table />
          </div>
        </div>
        <div>
          <Rechart2 />
          <ArticleList />
        </div>
      </div>
      </div>
    );
}

export default ChartDetail;