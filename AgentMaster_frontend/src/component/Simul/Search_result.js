//모의투자 메인화면에서 종목을 검색하면 연관 검색어를 나타내는 곳입니다.

import "./css/Search_result.css";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Search_result({searchBarRef, isSearchBarFocused, relatedSearches}) {
    
    const onClick = (event) => {
        console.log(event.currentTarget.id + " 종목을 검색합니다.");
        }

    const addComma = (num) => {
        let returnString = num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return(returnString)
    } 

    return (
        <div ref={searchBarRef} className="simulSearchResult" hidden={!isSearchBarFocused}>
            <div className="simulSearchResultFrame"></div>
            <ul className="simulSearchResult_ul">
                {relatedSearches.map((stock, index) => (
                    <li className='simulSearchResult_li' key={index}>
                        <div className="simulSearchResult_div" id={stock.itmsNm} onClick={onClick}>
                            <Link className='simulSearchResult_a' to={"/simul" + stock.srtnCd}> 
                                <div className="simulSearchResultId">{stock.srtnCd}</div>

                                <div className="simulSearchResultName">{stock.itmsNm}</div>
                                <div className="simulSearchResultMarket">{stock.mrktCtg}</div>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

Search_result.propTypes = {
    searchBarRef: PropTypes.object.isRequired,
    isSearchBarFocused: PropTypes.bool.isRequired,
    relatedSearches: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Search_result;