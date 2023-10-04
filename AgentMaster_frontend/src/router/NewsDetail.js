//뉴스기사 상세화면 전체 구현 부분
//소켓을 활용해 데이터를 전달받고 받은 데이터를 처리하여
//각각의 컴포넌트에 props로 전달한다.

import './css/NewsDetail.css'
import Flow from '../component/news/Flow';
import Header from '../component/Header';
import RelatedArticles from '../component/news/RelatedArticles';
import Summary from '../component/news/Summary';

function NewsDetail(){

    return (
    <div className='nd_body'>
        <header className="mb-4"><Header /></header>
        <div className="container pt-4 pb-3">
            <div className="row align-items-md-stretch space">
                <div className="col-xl-8 mb-4" >
                    <div className="summary_parent">
                        <Summary />
                    </div>
                </div>
                <div className="col-xl-4 mb-4">
                    <div className="related_parent">
                        <RelatedArticles />
                    </div>
                </div>
            </div>

            <div className="space mt-4">
                <Flow />
            </div>
        </div>
    </div>);
}

export default NewsDetail;