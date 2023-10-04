import { Rechart1, Rechart2, ArticleList, Table } from '../component/chart/component';
import './css/ChartDetail.css';
import Header from "../component/Header";
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ComponentSearch from "../component/chart/component_search";

export function ChartDetail() {
  const [keywordFromSearch2, setKeywordFromSearch2] = useState('');

  const handleKeywordChange = (newValue) => {
    setKeywordFromSearch2(newValue);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keywordFromURL = queryParams.get('keyword');

  return (
    <div className="chartDetail">
      <header className="mb-4"><Header /></header>

      <div style={{ display: 'flex' }}>

        <div>
          <p className='ChartDetailTop'>{keywordFromURL}</p>
          <Rechart1 />
          <ArticleList setIsModalOpen={setIsModalOpen} /> 
        </div>

        <div>
          <Rechart2 keywordFromChartMain={keywordFromURL} keywordFromSearch2={keywordFromSearch2} /> {/* 수정 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
              <div className='chart_detail_search'>
                <ComponentSearch keywordFromSearch2={keywordFromSearch2} handleKeywordChange={handleKeywordChange} />
              </div>
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartDetail;