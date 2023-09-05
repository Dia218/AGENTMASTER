//요약화면 스크랩기능 구현 컴포넌트
//현재는 클릭 시 스크랩 버튼 변경 기능만 있음
//로그인 기능 구현 이후 스크랩 버튼 클릭 시 기사를 저장하는 기능 추가 예정

import { Tooltip } from "antd";
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";


function Scrap({scrapCheck,setScrapCheck}){
    const [scrap,setScrap] = useState("");
    const [scrapIcon, setScrapIcon] = useState(<StarOutlined style={{fontSize:'27px'}}/>);
    const location = useLocation();

    const url = "http://localhost:8080/newsDetail/scrap";
    const data = {
        'userName' : sessionStorage.getItem("user"),
        'articleId' : location.state.id
    };
    const config = {"Content-Type": 'application/json'};

    //아이콘을 클릭하면 실행하는 함수. 이후 저장 기능을 추가할 예정
    const clickIcon = () => {
        if(sessionStorage.getItem("user")==null){
            alert("로그인이 필요한 기능입니다!");
        } else {
            setScrap(location.state.id);
            scrapCheck ? (checkToFalse()) : (checkToTrue());
        }
    };

    const checkToFalse = () => {
        setScrapCheck(false);
        //axios.post(url,data,config);
        console.log("i send id off"+scrap+sessionStorage.getItem("user"));
    }

    const checkToTrue = () => {
        setScrapCheck(true);
        //axios.post(url,data,config);
        console.log("i send id on"+scrap+sessionStorage.getItem("user"));
    }

    useEffect(()=>{
        scrapCheck ? (
            setScrapIcon(<StarFilled style={{fontSize:'27px'}}/>)
            ) : (setScrapIcon(<StarOutlined style={{fontSize:'27px'}}/>));
    },[scrapCheck])

    return(
        <div onClick={clickIcon}>
            <Tooltip title ="저장">
                {scrapIcon}
            </Tooltip>
        </div>
    );
}

export default Scrap;