//props로 넘겨받은 기사 제목들을 출력하는 컴포넌트
//현재는 기사 제목만 넘겨받지만, 이후 백에서 기사를 끌어오는(검색하는) 기준이
//생기면 해당 props를 추가로 넘겨받을 예정
//사유: 클릭 시 해당 기사 요약화면으로 넘어가기 구현예정

import { useNavigate } from "react-router";
import './css/ArticleLink.css';
import { useEffect } from "react";

const ArticleLink = (props) => {
    const navigate = useNavigate();
    const onClickRA = () => {
        navigate(`/newsDetail?id=${props.id}`,{
            state: {
                id: props.id
            }
        });
    }
    return (
        <>
        <div className="RA_List pb-2">
			<h6 className="RA_ListItem" onClick={onClickRA}>-{props.title}</h6>
        </div>
        </>
    );
};

export default ArticleLink;