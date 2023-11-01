import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./css/Chart_Search_result.css";

function Chart_Search_result({ searchBarRef, isSearchBarFocused, relatedSearches }) {

    const onClick = (event) => {
        // console.log(event.currentTarget.id + " 종목을 검색합니다.");
    }

    return (
        <div ref={searchBarRef} className="chartSearchResult" hidden={!isSearchBarFocused}>
            <div className="chartSearchResultFrame"></div>
            <ul className="chartSearchResult_ul">
                {relatedSearches.map((stock, index) => (
                    <li className='chartSearchResult_li' key={index}>
                        <div className="chartSearchResult_div" id={stock.stockName} onClick={onClick}>
                            <Link className='chartSearchResult_a' to={`/ChartDetail?keyword=${encodeURIComponent(stock.stockName)}`}>
                                <div className="chartSearchResultId">{stock.stockCode}</div>
                                <div className="chartSearchResultName">{stock.stockName}</div>
                                <div className="chartSearchResultMarket">{stock.mrktCtg}</div>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

Chart_Search_result.propTypes = {
    searchBarRef: PropTypes.object.isRequired,
    isSearchBarFocused: PropTypes.bool.isRequired,
    relatedSearches: PropTypes.array.isRequired,
}

export default Chart_Search_result;
