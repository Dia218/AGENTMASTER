//메인 화면 검색바 하단 구현.
//<MainNews>는 랜덤으로 뉴스제목과 신문사 이름을 출력한다.
//<Login>은 로그인 기능을 수행한다.
//<Stock>은 주식의 차트를 출력한다.

import { Stack } from 'react-bootstrap';
import './css/Main.css'
import React, { useEffect, useMemo, useState } from 'react';
import MainNews from './MainNews';
import { io } from 'socket.io-client';
import Login_after from './Login_after';
import Login_before from './Login_before';
import Chart from './Chart';
import { useNavigate } from 'react-router-dom';

function Main() {

    //임시 데이터
    const text = "테스트코드1\n테스트코드2\n테스트코드3\n";
    const publisher = "신문사 이름";
    const name = "기자 이름";
    const title = "신문기사 제목이 올라갈 공간입니다"

    //뉴스 데이터와 주식 데이터를 담을 useState 훅
    const [socket, setSocket] = useState();
    const [news, setNews] = useState(['','','','','']);
    const [stockData, setStockData] = useState([]);

    //테이블 차트의 헤더 액세서 설정. 
    const columns = useMemo(
        () => [
            {
                accessor: "name",
                Header: "종목명",
            },
            {
                accessor: "price",
                Header: "현재가",
            },
            {
                accessor: "compare",
                Header: "전일비",
            },
            {
                accessor: "Fluctuations",
                Header: "등락률",
            },
        ],
        []
    );

    //테이블 차트 임시 데이터. 헤더 액세서를 알맞게 설정해줘야함.
    //이후 백엔드에게 요청해서 주식 데이터를 담을 부분.
    const data = useMemo(() => [
            {
            "name": "주식 이름1",
            "price": "1294.00",
            "compare": "+101",
            "Fluctuations": "+8.47%"
            },
            {
            "name": "주식 이름2",
            "price": "1567.00",
            "compare": "+84",
            "Fluctuations": "+2.41%"
            },
    ],[]);

    //소켓 연결
    const socketIo = io.connect('');

    useEffect(() => {
        //서버로부터 데이터 수신. 백엔드로부터 데이터를 요청하고 받아와 각각의 state에 저장함.
        socketIo.on('callNews',(data) => {
            setNews([data]);
        });
        socketIo.on('callStockData',(data) => {
            setStockData(data);
        });

        //임시 데이터 추가
            setNews([{"id":"00",text,publisher,name,title},
                {"id":"01",text,"publisher":"시험용",name,title},
                {"id":"02",text,publisher,name,title},
                {"id":"03",text,publisher,name,title},
                {"id":"04",text,publisher,name,title}]);
            setStockData(data);

            setSocket(socketIo);
    },[])

    /*useEffect(()=>{
        return(()=>{
            if(socket){
                socketIo.disconnect();//소켓 연결 헤제
            }
        })
    },[socket])*/

    //로그인 성공 시 값을 true로 변경.
    const [isLogin, setIsLogin] = useState(false);
    const [userName,setUserName] = useState("");
    useEffect(()=>{
        setIsLogin(sessionStorage.getItem("isLogin"));
        setUserName(sessionStorage.getItem("user"));
    },[])

    useEffect(()=>{
        if(isLogin===true){
            socketIo.emit(`sendUserid`,{userId:sessionStorage.getItem("user_id")});
            socketIo.on('receive_userData',(data)=>{
                sessionStorage.setItem("user",data.userId);
            });
            //임시 유저 데이터 추가
            sessionStorage.setItem("user","admin1234");
            setUserName(sessionStorage.getItem("user"));
        }
    },[isLogin])
        

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/chartMain`);
    }

    return(
        <div className='main'>
                <Stack>
                    <Stack direction='horizontal' gap={0}>
                        <div className='news_main'><MainNews news={news[0]}/></div>
                        <div className='news_main'><MainNews news={news[1]}/></div>
                        <div className='news_main'><MainNews news={news[2]}/></div>
                        <div className='login_main'>
                            {isLogin?<Login_after setIsLogin={setIsLogin} userName={userName}/>:<Login_before setIsLogin={setIsLogin} socketIo={socketIo}/>}
                        </div>
                    </Stack>
                    <Stack direction='horizontal'>
                        <div className='news_main'><MainNews news={news[3]}/></div>
                        <div className='news_main'><MainNews news={news[4]}/></div>
                        <div className='stock_main'>
                            <Stack direction='horizontal' className='stock_title'>
                                <div><h4>증시</h4></div>
                                <div className="ms-auto text-center moveToStock" onClick={handleClick}><h3>+</h3></div>
                            </Stack>
                            <Chart columns={columns} data={stockData} />
                        </div>
                    </Stack>
                </Stack>
        </div>
    );
}

export default Main;