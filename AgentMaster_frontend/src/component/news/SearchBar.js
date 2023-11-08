//검색바 컴포넌트. 입력을 받고 엔터를 치면 입력된 키워드를 이용해 기사를 검색하고
//검색 화면으로 넘어가 결과를 보여준다.

import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, InputGroup } from "react-bootstrap";
import './css/SearchBar.css';
import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

function SearchBar() {

    const [keyword, setKeyword] = useState("");
    const isEnterCurrent = useRef();
    const navigate = useNavigate();

    //엔터키 입력 시 실행. 키워드를 수정하고 콘솔로 출력한다.
    const handleKeyDown = (e) =>{
        if(e.key === "Enter" && (isEnterCurrent.current === undefined || isEnterCurrent.current === false)){
            if(keyword==""){
                isEnterCurrent.current = false;
                alert("검색어를 입력해주세요.");
            } else {
                isEnterCurrent.current = true;
                setKeyword('');
                navigate(`/searchList?result=${keyword}&offset=0&limit=10&page=1`,{
                    state: {
                        keyword: keyword
                    }
                });
            }
        } else if(isEnterCurrent.current === true) {
            isEnterCurrent.current = false;
            setKeyword('');
        }
    }

    const handleClickSearch = () => {
        if(keyword==""){
            alert("검색어를 입력해주세요.");
        } else {
            setKeyword('');
            navigate(`/searchList?result=${keyword}&offset=0&limit=10&page=1`,{
                state: {
                    keyword: keyword
                }
            });
        }
    }


    return(
        <>
        <div className="col-xl-10 searchBar">
            <InputGroup className="mb-1 searchBar_component">
                <Form.Control 
                placeholder="Search"
                aria-label="Search"
                aria-describedby="searchbar" 
                value={keyword}
                onChange={(e)=>{setKeyword(e.target.value)}}
                onKeyDown={(e)=> handleKeyDown(e)}
                />
                <Button variant="outline-primary" id="searchbar" onClick={handleClickSearch}>
                    <div className=""><SearchOutlined style={{fontSize:'27px'}}/></div>
                </Button>
            </InputGroup>
        </div>
        </>
    );
}

export default SearchBar;