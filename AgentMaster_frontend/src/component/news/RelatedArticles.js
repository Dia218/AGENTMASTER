//연관 기사 구현 부분
//props로 relatedArticles를 받아 연관된 기사의 제목 목록을 출력한다.

import { Stack } from 'react-bootstrap';
import ArticleLink from './ArticleLink';
import './css/RelatedArticles.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';

function RelatedArticles(){
    //임시 데이터
    const title = "신문기사 제목이 올라갈 공간"

    const [ra, setRa] = useState([]);
    const location = useLocation();

    const getNewsRA = async() => {
        try {
            const responseNewsRA = await axios.get(`http://localhost:8080/newsDetail/relatedArticle?newsId=${location.state.id}`);
            setRa(responseNewsRA);
        } catch (error) {
            const responseNewsRA = await RAData();
            setRa(responseNewsRA);
            console.error('Error fetching newsRA data:', error);
        }
    }

    async function RAData() {
        const json = [{"id":"00",title},{"id":"01",title}];
        return json;
    }

    useEffect(()=>{
        getNewsRA();
    },[])

    //받은 props를 map 함수와 ArticleLink 컴포넌트를 사용해 출력한다.
    //const articleList = article.map((v) => (<ArticleLink key={v.title} title={v.title} />));
    const articleList = ra.map((v) => (<ArticleLink key={v.title} title={v.title} id={v.id}/>));

    return(
        <Stack gap={0} className='ra'>
            <div><h4>연관 기사</h4><hr /></div>
            <div className='a_title'>{articleList}</div>
        </Stack>
    );
}

export default RelatedArticles;