
import "./css/Chart_Search.css";
import React, { useState, useEffect, useRef } from 'react';
import Search_bar from "./Chart_Search_bar"
import Search_result from "./Chart_Search_result"
import Search_button from "./Chart_Search_button"
import { useNavigate } from "react-router-dom";

function Chart_Search() {
    const [isSearchBarFocused, setSearchBarFocused] = useState(false)
    const [relatedSearches, setRelatedSearches] = useState([]);
    const searchBarRef = useRef();
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
 
    const handleSearch = () => {
        if (keyword.trim() !== '') {
          navigate(`/chartDetail?result=${encodeURIComponent(keyword)}`, {
            state: {
              keyword: keyword,
            },
          });
        }
      };
    
    // 검색바 클릭할 때의 코드입니다.
    const handleSearchBarClick = (event) => {   //검색바 클릭 시 검색어가 0글자가 아니면 연관검색어 켜짐 여부가 반대로 변합니다.
        if(event.target.value.length !== 0)
        setSearchBarFocused((prevState) => !prevState);
        if(!isSearchBarFocused && keyword.length !== 0) { //검색어가 1자 이상이고 연관 검색어가 켜지는 순간 작동하는 명령어
        }
    };

    //검색바의 키워드가 변경 될 때의 코드입니다.
    const handleSearchBarChange = (e) => {
        setKeyword(e.target.value);
        if (e.target.value.length === 0) {
          setSearchBarFocused(false);
        } else {
          setSearchBarFocused(true);
    
        }
      };

    // 검색바 외의 영역을 클릭했을 때의 코드입니다.
    const handleClickOutside = (event) => {
        if (event.target.id === "chartSearchInputBar") {
        }
        else if (event.target.id === "chartSearchBar")
            setSearchBarFocused(true);
        else if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
            setSearchBarFocused(false); 
        }
    };

    // 검색바 관련 이벤트 리스너입니다.
    useEffect(() => {
        
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
            
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 키워드가 바뀔 시 
    useEffect(() => {
        if(keyword.length !== 0) {
        //console.log(keyword);
        getKeyword();
        }
    }, [keyword]);


    // 연관 검색어가 바뀔 시
    useEffect(() => {
        //console.log("검색결과 수: " + relatedSearches.length);
    }, [relatedSearches]);

    // 검색 바의 포커스가 바뀔 시
    useEffect(() => {
        //console.log(isSearchBarFocused);
    }, [isSearchBarFocused])


    // 연관 검색어 불러오는 코드
    const getKeyword = async () => {    //async-await을 사용하는 코드
        if(isNaN(keyword)) {    //한글, 영어 입력 시
            const json = await (    //종목명
                //백엔드 수정(입력한 키워드를 백엔드에 자동완성 요청하기)
                await fetch(`http://localhost:8080/stockMain/search?search=${keyword}`)
                // await fetch("https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=3lxB%2F1OXwuo7FgMdLkt0cG6kMEVKc1fHITjq6%2F5aAF5wYK5UQbaKvl7JxcXkdZnLL6ao2N2U6NbUpMKXRA8NqQ%3D%3D&resultType=json&basDt=20230802&likeItmsNm=" + keyword)     //
            ).json();
            setRelatedSearches(json.search);
            //console.log(keyword + "종목명 불러오기 완료");
        }
        else {     //숫자 입력 시
            const json = await (    //종목코드
                await fetch("https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=3lxB%2F1OXwuo7FgMdLkt0cG6kMEVKc1fHITjq6%2F5aAF5wYK5UQbaKvl7JxcXkdZnLL6ao2N2U6NbUpMKXRA8NqQ%3D%3D&resultType=json&basDt=20230802&likeSrtnCd=" + keyword)     //
            ).json();
            setRelatedSearches(json.response.body.items.item);
            //console.log(keyword + "종목코드 불러오기 완료");
        }
    };
    

    return (
        <form className ="chart_search" onSubmit={handleSearch}>
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
            />
        </form>
    )
}
export default Chart_Search;