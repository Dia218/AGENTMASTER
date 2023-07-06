import { Stack } from 'react-bootstrap';
import Scrap from './Scrap';
import './css/Summary.css'

function Summary(){

    const text = "테스트코드1\n테스트코드2\n테스트코드3\n";
    const publisher = "신문사 이름";
    const name = "기자 이름";
    const title = "신문기사 제목이 올라갈 공간"

    return(
        <div className='summary'>
            <Stack gap={0}>
                <Stack direction="horizontal" gap={2} className="border-bottom py-1">
                    <div><h2>{title}</h2></div>
                    <div className="ms-auto text-center"><Scrap /></div>
                </Stack>
                <Stack direction='horizental' gap={3}>
                    <div>{"\u00A0"}신문사 이름:{publisher} / 기자 이름:{name}</div>
                    <div className='summary_body'>{text}{text}{"\n\n"}본문 링크:{publisher}</div>
                </Stack>
            </Stack>
        </div>
    );
}

export default Summary;