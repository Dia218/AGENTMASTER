import { Rechart1, Rechart2, Search2, ArticleList, Table,} from '../component/chart/component';
import './css/ChartNew.css'
import Header from "../component/Header";
import React, { useState } from 'react';
export function ChartDetail() {
  const [value, setValue] = useState('');

  const handleKeywordChange = (newValue) => {
    setValue(newValue);
  };
    return (
      <div>
        <header className="mb-4"><Header /></header>
        <div style={{ display: 'flex'}}>
        <div>
          <Rechart1 />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <Search2 onKeywordChange={handleKeywordChange}/>
            <Table />
          </div>
        </div>
        <div>
          <Rechart2 keywordFromSearch2={value} />
          <ArticleList />
        </div>
      </div>
      </div>
    );
}

export default ChartDetail;