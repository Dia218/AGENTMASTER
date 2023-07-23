import { Rechart1, Rechart2, Search2, ArticleList, Table,} from '../component/chart/component';
  
export function ChartDetail() {
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

export default ChartDetail;