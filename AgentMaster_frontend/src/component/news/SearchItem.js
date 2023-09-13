//검색된 리스트를 map함수를 통해 출력해주는 컴포넌트.
//제목을 클릭하면 url에 state로 뉴스 기사의 id를 넘겨주고 뉴스 요약 페이지로 이동한다.

import { useNavigate } from "react-router-dom";
import './css/SearchItem.css';

const SearchItem = ({props}) => {

    const navigate = useNavigate();
    
    //클릭 시 뉴스 요약 페이지로 이동, 기사의 id를 state로 넘겨준다.
    const handleClick = () =>{
        navigate(`/newsDetail?id=${props.articleId}`,{
            state: {
                id: props.articleId
            }
        });
    }
    
    return (
        <div className="py-1 px-4">
            <h6 className="mx-2">({props.company}) - 입력: {props.firstPub}</h6>
            <button className="itemButton">
                <h4 onClick={handleClick}>{props.title} (키워드: {props.issueKeyword})</h4>
            </button>
            <hr className="underline"/>
        </div>
    );
};

export default SearchItem;