//검색된 기사 리스트를 출력하는 부분.
//SearchBar에서 url을 통해 넘겨받은 keyword를 받아와 백엔드에 기사 리스트를 요청하고
//받은 기사 리스트를 출력한다.

import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { io } from "socket.io-client";
import SearchItem from "./SearchItem";
import { useLocation, useSearchParams } from "react-router-dom";
import "./css/SearchList.css"

function SearchList(){
    //임시 데이터
    const publisher = "신문사 이름";
    const name = "기자 이름";
    const title = "신문기사 제목이 올라갈 공간";
    const date = "모월 모일";
    const id = "00";

    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [lastPage,setLastPage] = useState();
    const offset = searchParams.get('offset');
    const limit = searchParams.get('limit');
    //소켓 연결
    const socketIo = io.connect('');

    //location을 통해 keyword를 받아와 저장하고, 저장한 키워드로 searchResult를 요청한다.
    //받아온 리스트를 map 함수를 이용해 resultList에 저장하고 출력한다.
    const [searchResult, setSearchResult] = useState([]);
    const [resultList, setResultList] = useState([]);
    const [checkEmpty,setCheckEmpty] = useState(false);
    const [keyword,setKeyword] = useState("");

    //검색을 통해 url이 변경되고 그에 따른 keyword가 변경될때마다 실행하여 keyword를 받아온다.
    useEffect(()=>{
        setKeyword(searchParams.get('result'));
        setPage(parseInt(searchParams.get('page')))
    },[searchParams]);

    useEffect(() => {
        //서버로 keyword 데이터 요청
        socketIo.emit('sendKeyword',{ keyword : keyword });

        //임시 데이터 추가
        setSearchResult([{id,title,publisher,name,date,keyword},
            {"id":"01",title,publisher,name,date,keyword},
            {"id":"02",title,publisher,name,date,keyword},
            {"id":"03",title,publisher,name,date,keyword},
            {"id":"04",title,publisher,name,date,keyword},
            {"id":"05",title,publisher,name,date,keyword},
            {"id":"06",title,publisher,name,date,keyword},
            {"id":"07",title,publisher,name,date,keyword},
            {"id":"08",title,publisher,name,date,keyword},
            {"id":"09",title,publisher,name,date,keyword},
            {"id":"10",title,publisher,name,date,keyword},
            {"id":"11",title,publisher,name,date,keyword},
            {"id":"12",title,publisher,name,date,keyword},]);
        //setSearchResult([]);
        //setSearchResult([{id,title,publisher,name,date,keyword},])
    },[keyword]);

    useEffect(()=>{
        //서버로부터 데이터 수신후 저장
        socketIo.on('callSearchResult',(data) => {
            setSearchResult([data]);
        });
    },[socketIo])

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchData = async () => {
            const itemsToDisplay = searchResult.slice(offset, offset + limit);
            setItems(itemsToDisplay);
        };
        fetchData();
        setLastPage(Math.floor(searchResult.length / 10)+1);
        console.log(lastPage);
    }, [page,searchResult]);

    //키워드가 변경되어 searchResult가 변경될때마다 다시 실행하여 resultList를 다시 저장한다.
    //각 기사의 전체 데이터(id, 제목, 기자 이름 등)을 props로 넘겨준다.
    useEffect(()=>{
        setResultList(items.map((v) => (
            <SearchItem key={v.id} props={v}/>
            )
        ));
        if(searchResult.length<1) {
            setCheckEmpty(true);
        } else {
            setCheckEmpty(false);
        }
    },[searchResult]);

    const handleNextPage = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        searchParams.set('offset', (page) * limit);
        searchParams.set('page', nextPage);
	    setSearchParams(searchParams);
    };
    
    const handlePreviousPage = () => {
        const prePage = page - 1;
        setPage(prePage);
        searchParams.set('offset', (page - 2) * limit);
        searchParams.set('page', prePage);
	    setSearchParams(searchParams);
    };

    //검색결과가 없을때 출력하는 부분
    const NoResult = () => {
        return(
            <div className="result_NO">
                검색 결과가 존재하지 않습니다.
            </div>
        )
    }

    return(
        <div className="bg-white searchList">
            <Stack>
                <div className="py-3"></div>
                <div>{checkEmpty ? <NoResult/> : items.map((v) => ( <SearchItem key={v.id} props={v}/>)) }</div>
            </Stack>
            <div className="search_buttons">
                <button className="search_preButton" onClick={handlePreviousPage} disabled={page === 1}>
                    {"<<"}이전 페이지
                </button>
                <button className="search_nextButton" onClick={handleNextPage} disabled={page === lastPage}>
                    다음 페이지{">>"}
                </button>
            </div>
        </div>
    );
}

export default SearchList;