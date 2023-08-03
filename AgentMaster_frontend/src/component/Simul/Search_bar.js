//모의투자 메인화면에서 종목을 검색하는 부분의 검색바를 나타내는 곳입니다.

import "./css/Search_bar.css";
import React from "react";
import PropTypes from "prop-types";

const Search_bar = ({ searchBarRef, handleSearchBarChange, handleSearchBarClick }) => {

    return (
        <div id='simulSearchBar' className="simulSearchBar" >
                <input 
                    ref={searchBarRef} 
                    id='simulSearchInputBar' 
                    className="simulSearchInputBar" 
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

Search_bar.propTypes = {
    searchBarRef: PropTypes.object.isRequired,
    handleSearchBarChange: PropTypes.func.isRequired,
    handleSearchBarClick: PropTypes.func.isRequired,
}

export default Search_bar;