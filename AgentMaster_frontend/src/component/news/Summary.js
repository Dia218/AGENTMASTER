//본문 기사 요약 화면 표출 부분 구현.
//prop으로 news를 전달받아 news의 각 속성을 출력한다.

import { Stack } from 'react-bootstrap';
import Scrap from './Scrap';
import './css/Summary.css'
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Summary(){
    //임시 데이터
    const text = "테스트코드1\n테스트코드2\n테스트코드3\n";
    const publisher = "신문사 이름";
    const name = "기자 이름";
    const title = "신문기사 제목이 올라갈 공간";
    const link = "https://imnews.imbc.com";

    const [news, setNews] = useState([{text,publisher,name,title,link}]);
    const [scrapCheck,setScrapCheck] = useState();

    const location = useLocation();
    const getNewsSummary = async() => {
        try {
            const responseNewsSummary = await axios.get(`http://localhost:8080/newsDetail/newsSummary?newsId=${location.state.id}&userId=${sessionStorage.getItem("user")}`);
            setNews(responseNewsSummary);
            setScrapCheck(responseNewsSummary.scrapCheck);
        }catch (error) {
            const responseNewsSummary = await summaryData();
            setNews(responseNewsSummary);
            setScrapCheck(false);
            console.error('Error fetching newsSummary data:', error);
        }
    }

    async function summaryData() {
        const json = [{text,publisher:"test",name,title,link}];
        return json;
    }

    useEffect(()=>{
        getNewsSummary();
    },[])

    return(
        <div className='summary'>
            <Stack gap={0}>
                <Stack direction="horizontal" gap={2} className="border-bottom py-1">
                    <div><h2>{news[0].title}</h2></div>
                    <div className="ms-auto text-center"><Scrap scrapCheck={scrapCheck} setScrapCheck={setScrapCheck}/></div>
                </Stack>
                <Stack direction='horizental' gap={3}>
                    <div>{"\u00A0"}신문사 이름:{news[0].publisher} / 기자 이름:{news[0].name}</div>
                    <div className='summary_body'>{news[0].text}{news[0].text}{"\n\n"}본문 링크:<a href={`${news[0].link}`} target="_blank">{news[0].publisher}</a></div>
                </Stack>
            </Stack>
        </div>
    );
}

export default Summary;