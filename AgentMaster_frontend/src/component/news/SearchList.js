//검색된 기사 리스트를 출력하는 부분.
//SearchBar에서 url을 통해 넘겨받은 keyword를 받아와 백엔드에 기사 리스트를 요청하고
//받은 기사 리스트를 출력한다.

import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import SearchItem from "./SearchItem";
import { useSearchParams } from "react-router-dom";
import "./css/SearchList.css"
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

function SearchList(){
    //임시 데이터
    const company = "신문사 이름";
    const name = "기자 이름";
    const title = "신문기사 제목이 올라갈 공간";
    const firstPub = "모월 모일";

    const [searchParams, setSearchParams] = useSearchParams();
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [lastPage,setLastPage] = useState();
    const offset = searchParams.get('offset');
    const limit = searchParams.get('limit');

    //location을 통해 keyword를 받아와 저장하고, 저장한 키워드로 searchResult를 요청한다.
    //받아온 리스트를 map 함수를 이용해 resultList에 저장하고 출력한다.
    const [searchResult, setSearchResult] = useState([]);
    const [checkEmpty,setCheckEmpty] = useState(false);
    const [keyword,setKeyword] = useState("");
    const [loading,setLoading] = useState(false);

    //GET함수를 이용해 백엔드에 유저가 입력한 keyword를 전송하고 검색 결과를 전달받아 state에 저장하는 함수
    const getSearchList = async() => {
        try {
            //백엔드 수정 : 처음 검색 페이지로 갈때 계속 빈 keyword("")로 한번 요청을 보내서 수정
            if(keyword == "") {

            }
            else{
            const responseSearchList = await axios.get(`http://localhost:8080/searchList?keyword=${keyword}`);
            setSearchResult(responseSearchList.data.SearchNewsInfo);
            setLoading(true);
            }
      
        } catch (error) {
            const responseSearchList = await searchData();
            setSearchResult(responseSearchList.SearchNewsInfo);
            setLoading(true);
            console.error('Error fetching searchList data:', error);
        }
    }

    async function searchData() {
        const json = 
        {
            "SearchNewsInfo" : [
                {"articleId" : 1,
                "company" : "company1",
                "firstPub" : "2023-07-15 17:36:24",
                "lastPub" : "2023-08-18 16:26:36",
                "title" : "신문기사 제목이 올라갈 공간이고 말줄임표를 테스트해야하는 공간입니다. 다음으로 말줄임표를 사용해보세요. 이 뒤로는 표시되지 않는 문구입니다.",
                "issueKeyword" : "keyword1"},
                // {"articleId" : 2,title,company,name,firstPub,issueKeyword:keyword},
                // {"articleId" : 3,title,company,name,firstPub,issueKeyword:keyword},
                // {"articleId" : 4,title,company,name,firstPub,issueKeyword:keyword},
                // {"articleId" : 5,title,company,name,firstPub,issueKeyword:keyword},
                // {"articleId" : 6,title,company,name,firstPub,issueKeyword:keyword},
                // {"articleId" : 7,title,company,name,firstPub,issueKeyword:keyword},
                // {"articleId" : 8,title,company,name,firstPub,issueKeyword:keyword},
                // {"articleId" : 9,title,company,name,firstPub,issueKeyword:keyword},
                // {"articleId" : 10,title,company,name,firstPub,issueKeyword:keyword},
                // {"articleId" : 11,title,company,name,firstPub,issueKeyword:keyword},
                // {"articleId" : 12,title,company,name,firstPub,issueKeyword:keyword},
                // {"articleId" : 13,title,company,name,firstPub,issueKeyword:keyword},
            ]
        };
        
        return json;
    }

    //검색을 통해 url이 변경되고 그에 따른 keyword가 변경될때마다 실행하여 keyword를 받아온다.
    useEffect(()=>{
        setKeyword(searchParams.get('result'));
        // setKeyword('민주당')
        setPage(parseInt(searchParams.get('page')));
    },[searchParams]);

    //keyword가 변경될 때 마다 백엔드로부터 검색 결과를 받아온다.
    useEffect(() => {
        async function fetchDataList() {
            await getSearchList();
        }
        fetchDataList();

        setLoading(false);
        //setSearchResult([]);
        //setSearchResult([{id,title,publisher,name,date,keyword},])
    },[keyword]);

    //페이지가 변경되거나 새로 검색 결과를 불러오면 데이터를 slice해서 item에 저장한다. 이후 데이터의 크기에 따라 맨 마지막 페이지를 저장한다.
    useEffect(() => {
        // Simulate fetching data from an API
        const fetchData = async () => {
            const itemsToDisplay = searchResult.slice(offset, offset + limit);
            setItems(itemsToDisplay);
        };
        fetchData();
        //setLastPage(Math.floor(searchResult.length / 10)+1);
    }, [page,searchResult]);

    useEffect(() => {
        setLastPage(1);
        if(loading){
            if(searchResult.length<1) {
                setCheckEmpty(true);
            } else {
                setCheckEmpty(false);
                setLastPage(Math.floor(searchResult.length / 10)+1);
            }
        }
    },[loading])

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

    const ResultPage = () => {
        return(
                <div>{checkEmpty ? <NoResult/> : items.map((v) => ( <SearchItem key={v.articleId} props={v}/>))}</div>
        )
    }

    const LoadingMessage = () => {
        return(
            <div className="loadingMessage">
                <LoadingOutlined />loading...
            </div>
        )
    }

    return(
        <div className="bg-white searchList">
            <Stack>
                <div className="py-3"></div>
                <div>{loading ? <ResultPage/> : <LoadingMessage/> }</div>
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