//신문기사 제목과 신문사 이름을 출력한다.
//기사 제목을 클릭하면 해당 기사의 요약화면으로 넘어간다.

import { Stack } from "react-bootstrap";
import './css/MainNews.css';
import { useNavigate } from "react-router-dom";

function MainNews({news}) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/newsDetail?id=${news.articleId}`,{
            state: {
                id: news.articleId
            }
        });
    }

    return(
        <>
        <Stack gap={0}>
            <div className="mt-1 publisher">
                <h5>{news.company}</h5>
            </div>
            <div className="mt-1 MainNews">
                <button 
                className="titleButton" 
                onClick={handleClick}><h3>{news.title}</h3></button>
            </div>
            <div className="category">
                키워드:{" "+news.fieldName}
            </div>
        </Stack>
        </>
    );
}

export default MainNews;