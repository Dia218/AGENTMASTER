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

function Main() {

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

    const [socket, setSocket] = useState();
    //로그인 성공 시 값을 true로 변경.
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        //소켓 연결
        const socketIo = io.connect('');


    })

    return(
        <>
        <Stack gap={0}>
            <Stack direction='horizontal' gap={0}>
                <div className='news'><MainNews /></div>
                <div className='news'><MainNews /></div>
                <div className='news'><MainNews /></div>
                <div className='login'>
                    {isLogin?<Login_after setIsLogin={setIsLogin} />:<Login_before setIsLogin={setIsLogin}/>}
                </div>
            </Stack>
            <Stack direction='horizontal' gap={0}>
                <div className='news'><MainNews /></div>
                <div className='news'><MainNews /></div>
                <div className='stock'>
                    <Stack direction='horizontal' className='stock_title'>
                        <div><h4>증시</h4></div>
                        <div className="ms-auto text-center"><h3>+</h3></div>
                    </Stack>
                    <Chart columns={columns} data={data} />
                </div>
            </Stack>
        </Stack>
        </>
    );
}

export default Main;