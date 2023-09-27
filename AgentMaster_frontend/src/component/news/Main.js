//메인 화면 검색바 하단 구현.
//<MainNews>는 랜덤으로 뉴스제목과 신문사 이름을 출력한다.
//<Login>은 로그인 기능을 수행한다.
//<Stock>은 주식의 차트를 출력한다.

import { Stack } from 'react-bootstrap';
import './css/Main.css'
import React, { useEffect, useState } from 'react';
import MainNews from './MainNews';
import Login_after from './Login_after';
import Login_before from './Login_before';
import Chart from './Chart';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Main() {

    //임시 데이터
    const company = "신문사 이름";
    const title = "신문기사 제목이 올라갈 공간입니다";
    const fieldName = "분야/키워드 예시";

    //뉴스 데이터를 담을 useState 훅
    const [news, setNews] = useState(['','','','','']);

    const [loading,setLoading] = useState(true);

    //GET함수를 이용해 백엔드에 메인페이지 랜덤 뉴스 데이터 5개를 요청하고 state에 저장하는 함수.
    const getNews_Main = async () => {
        try {
            const responseNews_Main = await axios.get('http://localhost:8080/newsMain/randomNews');
            setNews(responseNews_Main.PreviewNews);
            setLoading(false);
        } catch (error) {
            const responseNews_Main = await data();
            setNews(responseNews_Main.PreviewNews);
            setLoading(false);
            console.error('Error fetching news data:', error);
        }
    };

    //임시 뉴스값 반환 함수
    async function data() {
        const json = {
            "PreviewNews" : [{articleId:1,company,title,fieldName},
                {articleId:2,company,title,fieldName},
                {articleId:3,company,title,fieldName},
                {articleId:4,company,title,fieldName},
                {articleId:5,company,title,fieldName},
            ]
        }
        
        return json;
    }

    //로그인 성공 시 값을 true로 변경하여 로그인 성공 처리.
    const [isLogin, setIsLogin] = useState(false);
    const [userName,setUserName] = useState("");

    //화면을 불러오면서 백엔드에 데이터를 요청하고 sesion에 로그인 기록이 있을 경우 불러와 성공 처리를 한다.
    useEffect(() => {
        getNews_Main();
        setIsLogin(sessionStorage.getItem("isLogin"));
    },[])

    useEffect(()=>{
        if(isLogin===true){
            //임시 유저 데이터 추가
            //sessionStorage.setItem("user","admin1234");
            setUserName(sessionStorage.getItem("user"));
        }
    },[isLogin])
        
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/chartMain`);
    }

    return(
        <div className='main'>
            {
                loading ? <div>loading...</div> : (
                    <Stack>
                        <Stack direction='horizontal' gap={0}>
                            <div className='news_main'><MainNews news={news[0]}/></div>
                            <div className='news_main'><MainNews news={news[1]}/></div>
                            <div className='news_main'><MainNews news={news[2]}/></div>
                            <div className='login_main'>
                                {isLogin?<Login_after setIsLogin={setIsLogin} userName={userName}/>:<Login_before setIsLogin={setIsLogin} />}
                            </div>
                        </Stack>
                        <Stack direction='horizontal'>
                            <div className='news_main'><MainNews news={news[3]}/></div>
                            <div className='news_main'><MainNews news={news[4]}/></div>
                            <div className='stock_main'>
                                <Stack direction='horizontal' className='stock_title'>
                                    <div className='stock_title_text'>증시</div>
                                    <div className="ms-auto text-center moveToStock" onClick={handleClick}><h3>+</h3></div>
                                </Stack>
                                <Chart />
                            </div>
                        </Stack>
                    </Stack>
                )
            }
        </div>
    );
}

export default Main;