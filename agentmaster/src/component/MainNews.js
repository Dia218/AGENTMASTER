//신문기사 제목과 신문사 이름을 출력한다.
//기사 제목을 클릭하면 해당 기사의 요약화면으로 넘어간다.

import { Stack } from "react-bootstrap";
import './css/MainNews.css';

function MainNews({news}) {
    return(
        <>
        <Stack gap={0}>
            <div className="mt-1 publisher">
                <h5>{news.publisher}</h5>
            </div>
            <div className="mt-1 MainNews">
                <h3>{news.title}</h3>
            </div>
            <div className="category">
                키워드:
            </div>
        </Stack>
        </>
    );
}

export default MainNews;