//본문 기사 요약 화면 표출 부분 구현.
//prop으로 news를 전달받아 news의 각 속성을 출력한다.

import { Stack } from 'react-bootstrap';
import Scrap from './Scrap';
import './css/Summary.css'
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';

function Summary(){
    //임시 데이터
    const text = "테스트코드1\n테스트코드2\n테스트코드3\n";
    const publisher = "신문사 이름";
    const name = "기자 이름";
    const title = "신문기사 제목이 올라갈 공간";
    const link = "https://imnews.imbc.com";

    const [news, setNews] = useState([{text,publisher,name,title,link}]);
    const [scrapCheck,setScrapCheck] = useState();
    const [loading,setLoading] = useState(true);

    const location = useLocation();
    const getNewsSummary = async() => {
        try {
            const responseNewsSummary = await axios.get(`http://localhost:8080/newsDetail/newsSummary?newsId=${location.state.id}&userId=${sessionStorage.getItem("user")}`);
            //백엔드 파트 수정(data 추가)
            setNews(responseNewsSummary.data.RealViewArticle);
            //백엔드 파트 수정(data 추가)
            setScrapCheck(responseNewsSummary.data.RealViewArticle.isScrap);
            setLoading(false);
        } catch (error) {
            const responseNewsSummary = await summaryData();
            setNews(responseNewsSummary.RealViewArticle);
            setScrapCheck(responseNewsSummary.RealViewArticle.isScrap);
            setLoading(false);
            console.error('Error fetching newsSummary data:', error);
        }
    }

    async function summaryData() {
        const json = 
        // {
        //     "RealViewArticle" : 
        //     {
        //         "articleId": 1,
        //         "title": "title",
        //         "company": "company",
        //         "repoter": "repoter",
        //         "isScrap": true,
        //         "articleSummary": "이적시장 전문 매체 트랜스퍼마크트는 지난 17일(한국 시간) '전 세계 클럽 주장 중 가장 높은 가치를 지닌 선수 베스트11'이라는 이름으로 스쿼드를 구성해 공개했다."+
        //         "이 11명 주장의 이적료 가치 총액은 약 8253억 원(5억 8100만 유로)이다.4-3-3 포메이션으로 구성된 스쿼드에서 손흥민은 시장가지 약 710억 원(5000만 유로)으로, 왼쪽 측면 공격수로 이름 올렸다."+
        //         "공격진에는 손흥민과 함께 라우타로 마르티네즈(인터밀란), 메시(인터 마이애미)가 이름을 올렸다. 미드필더에는 외데가르드(아스날), 펠레그리니(AS로마), 브루노 페르난데스(맨체스터 유나이티드)가 선정됐다."+
        //         " 수비진으로는 가야(발렌시아), 판 다이크(리버풀), 마르퀴뇨스(PSG), 제임스(첼시)가 구축했다. 골키퍼에는 사포노프(크라스노다르)가 뽑혔다.",
        //         "link": "link@nave.com"
        //     }
        // };
        {"RealViewArticle":{"articleId":1,"title":"Sa가짜mple Title","company":"Company Name","repoter":"Reporter Name","isScrap":false,"articleSummary":"나랏말싸미듕귁에 다라","link":"https://www.example.com/article/123"}}
        return json;
    }

    useEffect(()=>{
        getNewsSummary();
    },[])

    return(
        <div className='summary'>
        {
            loading ? <div className='loading_summary'><LoadingOutlined />loading...</div> : (
            <Stack gap={0}>
                <Stack direction="horizontal" gap={2} className="border-bottom py-1">
                    <div><h2>{news.title}</h2></div>
                    <div className="ms-auto text-center"><Scrap scrapCheck={scrapCheck} setScrapCheck={setScrapCheck}/></div>
                </Stack>
                <Stack direction='horizental' gap={3}>
                    <div>{"\u00A0"}신문사 이름:{news.company} / 기자 이름:{news.repoter}</div>
                    <div className='summary_body'>{news.articleSummary}{"\n\n"}본문 링크:<a href={`${news.link}`} target="_blank">{news.link}</a></div>
                </Stack>
            </Stack>
            )
        }
        </div>
    );
}

export default Summary;