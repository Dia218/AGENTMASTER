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
    const offset = searchParams.get('offset');
    const limit = searchParams.get('limit');

    //location을 통해 keyword를 받아와 저장하고, 저장한 키워드로 searchResult를 요청한다.
    //받아온 리스트를 map 함수를 이용해 resultList에 저장하고 출력한다.
    const [searchResult, setSearchResult] = useState([]);
    const [resultList, setResultList] = useState([]);
    const [keyword,setKeyword] = useState("");

    //검색을 통해 url이 변경되고 그에 따른 keyword가 변경될때마다 실행하여 keyword를 받아온다.
    useEffect(()=>{
        if(location.state)
            setKeyword(location.state.keyword);
        else
            setKeyword("");
    },[location]);

    useEffect(() => {
        //소켓 연결
        const socketIo = io.connect('');

        //서버로 keyword 데이터 요청
        socketIo.emit('sendKeyword',);

        //서버로부터 데이터 수신후 저장
        socketIo.on('callSearchResult',(data) => {
            setSearchResult([data]);
        });

        //임시 데이터 추가
        setSearchResult([{id,title,publisher,name,date,keyword},
            {"id":"01",title,publisher,name,date,keyword},
            {"id":"02",title,publisher,name,date,keyword},
            {"id":"03",title,publisher,name,date,keyword},
            {"id":"04",title,publisher,name,date,keyword},
            {"id":"05",title,publisher,name,date,keyword},
            {"id":"06",title,publisher,name,date,keyword},
            {"id":"07",title,publisher,name,date,keyword}]);
    },[keyword]);

    //키워드가 변경되어 searchResult가 변경될때마다 다시 실행하여 resultList를 다시 저장한다.
    //각 기사의 전체 데이터(id, 제목, 기자 이름 등)을 props로 넘겨준다.
    useEffect(()=>{
        setResultList(searchResult.map((v) => (
        <SearchItem key={v.id} props={v}/>
        )
    ))},[searchResult]);

    return(
        <div className="bg-white list">
            <Stack>
                <div className="py-3"></div>
                <div>{resultList}</div>
            </Stack>
        </div>
    );
}

export default SearchList;