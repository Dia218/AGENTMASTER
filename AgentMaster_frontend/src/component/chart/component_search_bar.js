// 주식 상세화면에서 종목을 검색하는 부분의 검색바를 나타내는 곳입니다.

import "./css/component_search_bar.css";
import React from "react";
import PropTypes from "prop-types";

const ComponentSearchBar = ({ searchBarRef, handleSearchBarChange, handleSearchBarClick }) => {

    return (
        <div id='componentSearchBar' className="componentSearchBar" >
                <input 
                    ref={searchBarRef} 
                    id='componentSearchInputBar' 
                    className="componentSearchInputBar" 
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

ComponentSearchBar.propTypes = {
    searchBarRef: PropTypes.object.isRequired,
    handleSearchBarChange: PropTypes.func.isRequired,
    handleSearchBarClick: PropTypes.func.isRequired,
}

export default ComponentSearchBar;