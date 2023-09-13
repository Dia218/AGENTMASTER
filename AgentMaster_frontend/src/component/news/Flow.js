//사건의 흐름 구현 부분
//props로 flow와 flownews를 전달받아 공통 이슈를 flow로 출력하고
//사건과 관련된 기사를 flownews로 전달받아 순서대로 출력한다.

import { Stack } from 'react-bootstrap';
import './css/Flow.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';

function Flow(){

    //임시 데이터
    const text = "테스트코드1\n테스트코드2\n테스트코드3\n";
    const title = "신문기사 제목이 올라갈 공간"

    const [flow,setFlow] = useState([]);
    const [flowNews,setFlowNews] = useState([]);
    const [flow_text,setFlow_text] = useState("");
    const [check,setCheck] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const getNewsFlowIssue = async() => {
        try {
            const responseNewsFlowIssue = await axios.get(`http://localhost:8080/newsDetail/flowIssue?newsId=${location.state.id}`);
            setFlow(responseNewsFlowIssue);
            if(responseNewsFlowIssue){
                setCheck(true);
                setFlow_text(responseNewsFlowIssue[0].text);
            } else {
                setFlow_text("이슈가 존재하지 않습니다.");
            }
        } catch (error) {
            const responseNewsFlowIssue = await issueData();
            setFlow(responseNewsFlowIssue);
            if(responseNewsFlowIssue){
                setCheck(true);
                setFlow_text(responseNewsFlowIssue[0].text);
            } else {
                setFlow_text("이슈가 존재하지 않습니다.");
            }
            console.error('Error fetching flowIssue data:', error);
        }
    }
    const getNewsFlowList = async() => {
        try {
            const responseNewsFlowList = await axios.get(`http://localhost:8080/newsDetail/flowList?newsId=${location.state.id}`);
            setFlowNews(responseNewsFlowList);
        } catch (error) {
            console.error('Error fetching flowList data:', error);
            const responseNewsFlowList = await listData();
            setFlowNews(responseNewsFlowList);
        }
    }

    async function issueData() {
        const json = [{text}];
        return json;
    }

    async function listData() {
        const json = [{title,text,'id':11},{title,text,'id':22},{title,text,'id':33}];
        return json;
    }

    useEffect(()=>{
        getNewsFlowIssue();
        getNewsFlowList();
    },[])

    const onClickTitle = (article) => {
        navigate(`/newsDetail?id=${article.id}`,{
            state: {
                id: article.id
            }
        });
    }

    //사건의 흐름 중 요약 기사를 map함수를 통해 순서대로 출력.
    const articleList = flowNews.map((article) => (
        <>
        <div className='col-5 flow_summary' key={article.title}>
            <h5 className='as_title' onClick={()=>onClickTitle(article)}>{article.title}</h5>
            <hr/>
            <div className='flow_summary_body'>
                {article.text}
            </div>
        </div>
        </>
    ));

    return(
        <div className='row flow'>
            <div className='col-xl-5'>
                <Stack gap={2} className='flow_text'>
                    <div><h4>사건의 흐름</h4><hr /></div>
                        <div className='flow_text_body'>{flow_text}</div>
                </Stack>
            </div>
            <div className="col-xl-7">
                <div className='scroll_horizental'>
                        <div className='row flex-row flex-nowrap pt-3'>
                            { check ? articleList : <>
                                                    <div className='col-11 flow_summary'>
                                                        <h5 className='as_title'></h5>
                                                        <hr/>
                                                        <div className='flow_summary_body'>
                                                            해당하는 이슈가 존재하지 않습니다.
                                                        </div>
                                                    </div>
                                                    </> }
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Flow;