//사건의 흐름 구현 부분
//props로 flow와 flownews를 전달받아 공통 이슈를 flow로 출력하고
//사건과 관련된 기사를 flownews로 전달받아 순서대로 출력한다.

import { Stack } from 'react-bootstrap';
import './css/Flow.css';

function Flow({flow,flownews}){

    //사건의 흐름 중 요약 기사를 map함수를 통해 순서대로 출력.
    const articleList = flownews.map((article) => (
        <>
        <div className='col-5 flow_summary' key={article.title}>
            <h5 className='as_title'>{article.title}</h5>
            <hr/>
            <div className='flow_summary_body'>
                {article.text}
            </div>
        </div>
        </>
        ))

    return(
        <div className='row flow'>
            <div className='col-xl-5'>
                <Stack gap={2} className='flow_text'>
                    <div><h4>사건의 흐름</h4><hr /></div>
                        <div className='flow_text_body'>{flow.text}</div>
                </Stack>
            </div>
            <div class="col-xl-7">
                <div class='scroll_horizental'>
                        <div className='row flex-row flex-nowrap pt-3'>
                            {articleList}
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Flow;