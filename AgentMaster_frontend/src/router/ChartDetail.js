import { Rechart1, Rechart2, Search2, ArticleList, Table,} from '../component/chart/component';
import './css/ChartDetail.css'
import Header from "../component/Header";  
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ChartDetail() {
  const [value, setValue] = useState('');
  
  const handleKeywordChange = (newValue) => {
    setValue(newValue);
  };
  const location = useLocation();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (location.state) {
      setKeyword(decodeURIComponent(location.state.keyword));
    } else {
      setKeyword('');
    }
  }, [location]);
 
    return (
      <div className="chartDetail">
        <header className="mb-4"><Header /></header>
        
        <div  style={{ display: 'flex'}}>
        
        <div>
        <p className='ChartDetailTop'>{keyword}</p>
          <Rechart1 keyword={keyword}/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Search2 onKeywordChange={handleKeywordChange}/>
            <Table />
          </div>
        </div>
        <div>
          <Rechart2 keywordFromChartMain={keyword} keywordFromSearch2={value}/>
          <ArticleList />
        </div>
      </div>
      </div>
    );
}


export default ChartDetail;