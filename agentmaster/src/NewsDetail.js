import './NewsDetail.css'
import Flow from './component/Flow';
import Header from './component/Header';
import RelatedArticles from './component/RelatedArticles';
import Summary from './component/Summary';

function NewsDetail(){

    return (
    <div className='nd_body'>
        <header class="mb-4"><Header /></header>
        <div class="container pt-4 pb-3">
            <div class="row align-items-md-stretch space">
                <div class="col-xl-8 mb-4" >
                    <div class="summary_parent">
                        <Summary />
                    </div>
                </div>
                <div class="col-xl-4 mb-4">
                    <div class="related_parent">
                        <RelatedArticles />
                    </div>
                </div>
            </div>

            <div class="space mt-4">
                <Flow />
            </div>
        </div>
    </div>);
}

export default NewsDetail;