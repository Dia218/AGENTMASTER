//연관 기사 구현 부분
//props로 relatedArticles를 받아 연관된 기사의 제목 목록을 출력한다.

import { Stack } from 'react-bootstrap';
import ArticleLink from './ArticleLink';
import './css/RelatedArticles.css'

function RelatedArticles({relatedArticles}){

    //받은 props를 map 함수와 ArticleLink 컴포넌트를 사용해 출력한다.
    //const articleList = article.map((v) => (<ArticleLink key={v.title} title={v.title} />));
    const articleList = relatedArticles.map((v) => (<ArticleLink key={v.title} title={v.title} />));

    return(
        <Stack gap={0} className='ra'>
            <div><h4>연관 기사</h4><hr /></div>
            <div className='a_title'>{articleList}</div>
        </Stack>
    );
}

export default RelatedArticles;