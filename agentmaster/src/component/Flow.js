import { Stack } from 'react-bootstrap';
import './css/Flow.css';

function Flow(){

    const text = "공통 이슈1\n공통 이슈2\n공통 이슈3\n";
    const article = [
        {title : '기사 제목1', summary: '기사 요약1\n'},
        {title : '기사 제목2', summary: '기사 요약2'},
        {title : '기사 제목3', summary: '기사 요약3'},
        {title : '기사 제목4', summary: '기사 요약4'},
        {title : '기사 제목5', summary: '기사 요약5'},
    ]
    const articleList = article.map((article) => (
        <>
        <div className='col-5 flow_summary' key={article.title}>
            <h5 className='as_title'>{article.title}</h5>
            <hr/>
            <div className='flow_summary_body'>
                {article.summary}
            </div>
        </div>
        </>
        ))

    return(
        <div className='row flow'>
            <div className='col-xl-5'>
                <Stack gap={2} className='flow_text'>
                    <div><h4>사건의 흐름</h4><hr /></div>
                        <div className='flow_text_body'>{text}</div>
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