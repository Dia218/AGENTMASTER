//뉴스기사 상세화면 전체 구현 부분
//소켓을 활용해 데이터를 전달받고 받은 데이터를 처리하여
//각각의 컴포넌트에 props로 전달한다.

import { useState,useEffect } from 'react';
import { io } from 'socket.io-client';
import './css/NewsDetail.css'
import Flow from '../component/news/Flow';
import Header from '../component/Header';
import RelatedArticles from '../component/news/RelatedArticles';
import Summary from '../component/news/Summary';

function NewsDetail(){

    //임시 데이터
    const text = "테스트코드1\n테스트코드2\n테스트코드3\n";
    const publisher = "신문사 이름";
    const name = "기자 이름";
    const title = "신문기사 제목이 올라갈 공간"

    const [socket, setSocket] = useState();
    const [news, setNews] = useState([]);
    const [ra, setRa] = useState([]);
    const [flow,setFlow] = useState([]);
    const [flowNews,setFlowNews] = useState([]);

    useEffect(()=>{
        //소켓 연결
        const socketIo = io.connect('');

        //서버로부터 데이터 수신
        socketIo.on('callNews',(data) => {
            setNews(data);
        });
        socketIo.on('callRa',(data) => {
            setRa(data);
        });
        socketIo.on('callFlow',(data) => {
            setFlow(data);
        });
        socketIo.on('callFlowNews',(data) => {
            setFlowNews(data);
        });
        //임시 데이터 추가
        setNews({text,publisher,name,title});
        setRa([{title},{title}]);
        setFlow({text});
        setFlowNews([{title,text},{title,text},{title,text}]);

        setSocket(socketIo)
    },[])

    useEffect(()=>{
        return(()=>{
            if(socket){
                socket.disconnect();//소켓 연결 헤제
            }
        })
    },[socket])

    return (
    <div className='nd_body'>
        <header class="mb-4"><Header /></header>
        <div class="container pt-4 pb-3">
            <div class="row align-items-md-stretch space">
                <div class="col-xl-8 mb-4" >
                    <div class="summary_parent">
                        <Summary news={news} />
                    </div>
                </div>
                <div class="col-xl-4 mb-4">
                    <div class="related_parent">
                        <RelatedArticles relatedArticles={ra} />
                    </div>
                </div>
            </div>

            <div class="space mt-4">
                <Flow 
                flow={flow}
                flownews={flowNews}
                />
            </div>
        </div>
    </div>);
}

export default NewsDetail;