import { Stack } from 'react-bootstrap';
import ArticleLink from './ArticleLink';
import './css/RelatedArticles.css'

function RelatedArticles(){

    const article = [
        {title : '기사 제목1\n제목1'},
        {title : '기사 제목2\n제목2'},
        {title : '기사 제목3\n제목3'},
        {title : '기사 제목4\n제목4'},
        {title : '기사 제목5\n제목5'}
    ]
    const articleList = article.map((v) => (<ArticleLink key={v.title} title={v.title} />));

    return(
        <Stack gap={0} className='ra'>
            <div><h4>연관 기사</h4><hr /></div>
            <div className='a_title'>{articleList}</div>
        </Stack>
    );
}

export default RelatedArticles;