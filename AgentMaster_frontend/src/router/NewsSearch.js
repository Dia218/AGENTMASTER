//뉴스 검색 결과화면을 구현하는 코드. 
//<SearchBar>는 검색바, <SearchList>는 검색된 결과 리스트를 구현한다.

import Header from "../component/Header";
import SearchBar from "../component/news/SearchBar";
import SearchList from "../component/news/SearchList";
import './css/NewsSearch.css';

function NewsSearch(){
    return (
    <div className='nd_body'>
        <header className="mb-4"><Header /></header>
        <div className="container pt-4 pb-3 border">
            <SearchBar />
            
            <SearchList />
        </div>
    </div>);
}

export default NewsSearch;