//모의투자 메인화면에서 종목을 검색하는 부분입니다.

import "./css/Chart_Search.css";
import React, { useState, useEffect, useRef } from 'react';
import Search_bar from "./component_search_bar"
import Search_result from "./component_search_result"
import Search_button from "./component_search_button"

function ComponentSearch({ keywordFromSearch2, handleKeywordChange }) {
    const [isSearchBarFocused, setSearchBarFocused] = useState(false);
    const [relatedSearches, setRelatedSearches] = useState([]);
    const searchBarRef = useRef();
    const [value, setValue] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [keyword, setKeyword] = useState(''); // keyword 추가

    const handleSearch = () => {
        setSearchHistory([...searchHistory, value]);
        handleKeywordChange(value);
    };

    const handleSearchBarClick = (event) => {
        if (event.target.value.length !== 0)
            setSearchBarFocused((prevState) => !prevState);
        if (!isSearchBarFocused && keyword.length !== 0) {
            // 검색어가 1자 이상이고 연관 검색어가 켜지는 순간 작동하는 명령어
        }
    };

    const handleSearchBarChange = (e) => {
        setKeyword(e.target.value);
        if (e.target.value.length === 0) {
            setSearchBarFocused(false);
        } else {
            setSearchBarFocused(true);
        }
        handleKeywordChange(e.target.value);
    };

    const handleClickOutside = (event) => {
        if (event.target.id === "chartSearchInputBar") {
        } else if (event.target.id === "chartSearchBar")
            setSearchBarFocused(true);
        else if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
            setSearchBarFocused(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (keyword.length !== 0) {
            getKeyword();
        }
    }, [keyword]);

    useEffect(() => {
        //console.log("검색결과 수: " + relatedSearches.length);
    }, [relatedSearches]);

    useEffect(() => {
        //console.log(isSearchBarFocused);
    }, [isSearchBarFocused]);

    const getKeyword = async () => {
        if (isNaN(keyword)) {
            const json = await fetch(
                "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=3lxB%2F1OXwuo7FgMdLkt0cG6kMEVKc1fHITjq6%2F5aAF5wYK5UQbaKvl7JxcXkdZnLL6ao2N2U6NbUpMKXRA8NqQ%3D%3D&resultType=json&basDt=20230802&likeItmsNm=" + keyword
            ).then(response => response.json());
            setRelatedSearches(json.response.body.items.item);
        } else {
            const json = await fetch(
                "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=3lxB%2F1OXwuo7FgMdLkt0cG6kMEVKc1fHITjq6%2F5aAF5wYK5UQbaKvl7JxcXkdZnLL6ao2N2U6NbUpMKXRA8NqQ%3D%3D&resultType=json&basDt=20230802&likeSrtnCd=" + keyword
            ).then(response => response.json());
            setRelatedSearches(json.response.body.items.item);
        }
    };

    return (
        <form className="chart_search" onSubmit={handleSearch}>
            <Search_bar
                searchBarRef={searchBarRef}
                handleSearchBarChange={handleSearchBarChange}
                handleSearchBarClick={handleSearchBarClick}
            />
            <Search_button handleSearch={handleSearch} />
            <Search_result
                searchBarRef={searchBarRef}
                isSearchBarFocused={isSearchBarFocused}
                relatedSearches={relatedSearches}
                onKeywordChange={handleKeywordChange} // onKeywordChange를 전달
            />
        </form>
    );
}

export default ComponentSearch;