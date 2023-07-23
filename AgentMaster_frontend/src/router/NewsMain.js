//뉴스 메인화면을 구현하는 코드. 
//<SearchBar>는 검색바, <Main>은 그 외 나머지 부분을 구현한다.

import Header from "../component/Header";
import Main from "../component/news/Main";
import SearchBar from "../component/news/SearchBar";
import './css/NewsMain.css';

function NewsMain(){
    return (
    <div className='nd_body'>
        <header className="mb-4"><Header /></header>
        <div className="container pt-4 pb-3 border">
            <SearchBar />
            
            <Main />
        </div>
    </div>);
}

export default NewsMain;