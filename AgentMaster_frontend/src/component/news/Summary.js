//본문 기사 요약 화면 표출 부분 구현.
//prop으로 news를 전달받아 news의 각 속성을 출력한다.

import { Stack } from 'react-bootstrap';
import Scrap from './Scrap';
import './css/Summary.css'

function Summary({news,setScrap,scrapCheck,setScrapCheck}){

    return(
        <div className='summary'>
            <Stack gap={0}>
                <Stack direction="horizontal" gap={2} className="border-bottom py-1">
                    <div><h2>{news.title}</h2></div>
                    <div className="ms-auto text-center"><Scrap setScrap={setScrap} scrapCheck={scrapCheck} setScrapCheck={setScrapCheck}/></div>
                </Stack>
                <Stack direction='horizental' gap={3}>
                    <div>{"\u00A0"}신문사 이름:{news.publisher} / 기자 이름:{news.name}</div>
                    <div className='summary_body'>{news.text}{news.text}{"\n\n"}본문 링크:{news.publisher}</div>
                </Stack>
            </Stack>
        </div>
    );
}

export default Summary;