//모의투자 메인화면에서 종목을 검색하는 부분입니다.

import "./css/Simul_search.css";
import React, { useState, useEffect, useRef } from 'react';
import Search_bar from "./Search_bar"
import Search_result from "./Search_result"
import Search_button from "./Search_button"
import { useNavigate } from "react-router-dom";

function Simul_search() {
    const [isSearchBarFocused, setSearchBarFocused] = useState(false)
    const [relatedSearches, setRelatedSearches] = useState([]);
    const searchBarRef = useRef();
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

 
    const btnClick = () => {        //버튼 클릭시 검색어가 1자 이상이면 검색 링크로 넘어갑니다. or 제일 유사한 종목 링크로 넘어갑니다.
        setSearchBarFocused(false);
        if(keyword.length !== 0) {
        navigate('/chartMain' + keyword);
        //console.log(keyword + "을 검색합니다.");
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
    const handleSearchBarChange = (e) => {  //검색어 변화 시 검색어가 0글자면 연관검색어가 꺼집니다. 그렇지 않으면 연관검색어가 켜집니다.
        setKeyword(e.target.value);
        if(e.target.value.length === 0)
            setSearchBarFocused(false);
        else {
            setSearchBarFocused(true);
        }
    };

    // 검색바 외의 영역을 클릭했을 때의 코드입니다.
    const handleClickOutside = (event) => {
        if (event.target.id === "simulSearchInputBar") {
        }
        else if (event.target.id === "simulSearchBar")
            setSearchBarFocused(true);
        else if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
            setSearchBarFocused(false); 
        }
    };

    // 검색바 관련 이벤트 리스너입니다.
    useEffect(() => {
        // Add event listener to detect clicks outside the search bar
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
            // Clean up the event listener when the component unmounts
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
                await fetch("https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=3lxB%2F1OXwuo7FgMdLkt0cG6kMEVKc1fHITjq6%2F5aAF5wYK5UQbaKvl7JxcXkdZnLL6ao2N2U6NbUpMKXRA8NqQ%3D%3D&resultType=json&basDt=20230802&likeItmsNm=" + keyword)     //
            ).json();
            setRelatedSearches(json.response.body.items.item);
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
        <form className ="Simul_search" onSubmit={btnClick}>
            <Search_bar 
                searchBarRef={searchBarRef} 
                handleSearchBarChange={handleSearchBarChange} 
                handleSearchBarClick={handleSearchBarClick} 
            />
            <Search_button btnClick={btnClick} />
            <Search_result 
                searchBarRef={searchBarRef} 
                isSearchBarFocused={isSearchBarFocused} 
                relatedSearches={relatedSearches}
            />
        </form>
    )
}
export default Simul_search;