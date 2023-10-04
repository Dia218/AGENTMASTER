// 주식 메인화면에서 종목을 검색하는 부분의 검색바를 나타내는 곳입니다.

import "./css/Chart_Search_bar.css";
import React from "react";
import PropTypes from "prop-types";

const Chart_Search_bar = ({ searchBarRef, handleSearchBarChange, handleSearchBarClick }) => {

    return (
        <div id='chartSearchBar' className="chartSearchBar" >
                <input 
                    ref={searchBarRef} 
                    id='chartSearchInputBar' 
                    className="chartSearchInputBar" 
                    type="search" 
                    onChange={handleSearchBarChange} 
                    onClick={handleSearchBarClick} 
                    autoComplete="off" 
                    placeholder="005930 or 삼성전자" 
                >
                </input>
            </div>
    )
}

Chart_Search_bar.propTypes = {
    searchBarRef: PropTypes.object.isRequired,
    handleSearchBarChange: PropTypes.func.isRequired,
    handleSearchBarClick: PropTypes.func.isRequired,
}

export default Chart_Search_bar;
