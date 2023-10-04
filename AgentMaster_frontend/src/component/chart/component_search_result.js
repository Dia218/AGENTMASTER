import React, { useState } from 'react';
import PropTypes from "prop-types";
import "./css/component_search_result.css";

function ComponentSearchResult({ searchBarRef, isSearchBarFocused, relatedSearches, onKeywordChange }) {
    const [hovered, setHovered] = useState(false);
    const [value, setValue] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
  
    const handleSearch = (stockName) => {
      console.log('검색어:', stockName);
      setSearchHistory([...searchHistory, stockName]);
      onKeywordChange(stockName); // 검색한 종목명을 전달
    };
  
    return (
      <div ref={searchBarRef} className="componentSearchResult" hidden={!isSearchBarFocused}>
        <div className="componentSearchResultFrame"></div>
        <ul className="componentSearchResult_ul">
          {relatedSearches.map((stock, index) => (
            <li className='componentSearchResult_li' key={index}>
              <div className="componentSearchResult_div" onClick={() => handleSearch(stock.itmsNm)}>
                <div className='componentSearchResult_a'>
                <div className="componentSearchResultId">{stock.srtnCd}</div>
                <div className="componentSearchResultName">{stock.itmsNm}</div>
                <div className="componentSearchResultMarket">{stock.mrktCtg}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  ComponentSearchResult.propTypes = {
    searchBarRef: PropTypes.object.isRequired,
    isSearchBarFocused: PropTypes.bool.isRequired,
    relatedSearches: PropTypes.array.isRequired,
    onKeywordChange: PropTypes.func.isRequired,
  };
  
  export default ComponentSearchResult;