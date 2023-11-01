//사건의 흐름 구현 부분
//props로 flow와 flownews를 전달받아 공통 이슈를 flow로 출력하고
//사건과 관련된 기사를 flownews로 전달받아 순서대로 출력한다.

import { Stack } from 'react-bootstrap';
import './css/Flow.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { LoadingOutlined } from '@ant-design/icons';

function Flow(){

    const [flow,setFlow] = useState([]);
    const [flowNews,setFlowNews] = useState([]);
    const [flow_text,setFlow_text] = useState("");
    const [check,setCheck] = useState(false);
    const [loading,setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const getNewsFlowIssue = async() => {
        try {
            const responseNewsFlowIssue = await axios.get(`http://localhost:8080/newsDetail/flowIssue?newsId=${location.state.id}`);
            //백엔드 수정(data 추가)
            setFlow(responseNewsFlowIssue.data.IssueSummary);
            //백엔드 수정(data 추가)
            if(responseNewsFlowIssue.data.IssueSummary){
                //백엔드(다른 기사 없을때를 대비하여 주석 처리)
                // setCheck(true);
                //백엔드 수정(data 추가)
                setFlow_text(responseNewsFlowIssue.data.IssueSummary[0].issueSummary);
                setLoading(false);
            } else {
                setFlow_text("이슈가 존재하지 않습니다.");
                setLoading(false);
            }
        } catch (error) {
            const responseNewsFlowIssue = await issueData();
            setFlow(responseNewsFlowIssue.IssueSummary);
            if(responseNewsFlowIssue.IssueSummary){
                setCheck(true);
                setFlow_text(responseNewsFlowIssue.IssueSummary[0].issueSummary);
                setLoading(false);
            } else {
                setFlow_text("이슈가 존재하지 않습니다.");
                setLoading(false);
            }
            console.error('Error fetching flowIssue data:', error);
        }
    }
    const getNewsFlowList = async() => {
        try {
            // const responseNewsFlowList = await listData();
            // setFlowNews(responseNewsFlowList.FlowList);
            //백엔드 아직 미완성 부분
            const responseNewsFlowList = await axios.get(`http://localhost:8080/newsDetail/flowList?newsId=${location.state.id}`);
            //백엔드 수정(data 추가&다른 기사 없을때(if-else)추가)
            if(responseNewsFlowList.data.FlowList){
                setCheck(true)
                setFlowNews(responseNewsFlowList.data.FlowList);
            }
            else{
                setCheck(false)
                setFlowNews([]);
            }
            //백엔드 아직 미완성 부분 종료
        } catch (error) {
            console.error('Error fetching flowList data:', error);
            const responseNewsFlowList = await listData();
            setFlowNews(responseNewsFlowList.FlowList);
        }
    }

    async function issueData() {
        const json = {
            "IssueSummary": [
                {
                    "issueSummary": "IssueSummary11"
                }
            ]
        };
        return json;
    }

    async function listData() {
        const json = {
            "FlowList": [
                {
                    "articleId": 1,
                    "title": "title1",
                    "articleSummary": "Summary1"
                },
                {
                    "articleId": 2,
                    "title": "title2",
                    "articleSummary": "Summary2"
                },
                {
                    "articleId": 3,
                    "title": "title3",
                    "articleSummary": "Summary3"
                },
                {
                    "articleId": 4,
                    "title": "title4",
                    "articleSummary": "Summary4"
                },
            ]
        };
        return json;
    }

    useEffect(()=>{
        getNewsFlowIssue();
        getNewsFlowList();
    },[])

    const onClickTitle = (article) => {
        navigate(`/newsDetail?id=${article.articleId}`,{
            state: {
                id: article.articleId
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
                {article.articleSummary}
            </div>
        </div>
        </>
    ));

    return(
        <>
        {
            loading ? <div className='loading_flow'><LoadingOutlined />loading...</div> : (
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
            )
        }
        </>
    );
}

export default Flow;