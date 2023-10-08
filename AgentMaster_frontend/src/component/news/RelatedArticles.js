//연관 기사 구현 부분
//props로 relatedArticles를 받아 연관된 기사의 제목 목록을 출력한다.

import { Stack } from 'react-bootstrap';
import ArticleLink from './ArticleLink';
import './css/RelatedArticles.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
import { LoadingOutlined } from '@ant-design/icons';

function RelatedArticles(){

    const [ra, setRa] = useState([]);
    const location = useLocation();
    const [loading,setLoading] = useState(true);

    const getNewsRA = async() => {
        try {
            const responseNewsRA = await axios.get(`http://localhost:8080/newsDetail/relatedArticle?newsId=${location.state.id}`);
            setRa(responseNewsRA.RelationArticle);
            setLoading(false);
        } catch (error) {
            const responseNewsRA = await RAData();
            setRa(responseNewsRA.RelationArticle);
            setLoading(false);
            console.error('Error fetching newsRA data:', error);
        }
    }

    async function RAData() {
        const json = {
            "RelationArticle": [
                {
                    "articleId": 1,
                    "title": "titl1"
                },
                {
                    "articleId": 2,
                    "title": "titl2"
                },
                {
                    "articleId": 3,
                    "title": "titl3"
                },
                {
                    "articleId": 4,
                    "title": "titl4"
                }
            ]
        };
        return json;
    }

    useEffect(()=>{
        getNewsRA();
    },[])

    //받은 props를 map 함수와 ArticleLink 컴포넌트를 사용해 출력한다.
    //const articleList = article.map((v) => (<ArticleLink key={v.title} title={v.title} />));
    const articleList = ra.map((v) => (<ArticleLink key={v.articleId} title={v.title} id={v.articleId}/>));

    return(
        <>
        {
            loading ? <div className='loading_ra'><LoadingOutlined />loading...</div> : (
            <Stack gap={0} className='ra'>
                <div><h4>연관 기사</h4><hr /></div>
                <div className='a_title'>{articleList}</div>
            </Stack>
            )
        }
        </>
        
    );
}

export default RelatedArticles;