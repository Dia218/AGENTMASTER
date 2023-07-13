//신문기사 제목과 신문사 이름을 출력한다.
//기사 제목을 클릭하면 해당 기사의 요약화면으로 넘어간다.

import { Stack } from "react-bootstrap";
import './css/MainNews.css';

function MainNews() {
    const publisher = "신문사 이름";
    const title = "신문기사 제목 출력. 클릭 시 요약화면으로 넘어감";

    return(
        <>
        <Stack gap={0}>
            <div className="mt-1 publisher">
                <h5>{publisher}</h5>
            </div>
            <div className="mt-1 MainNews">
                <h3>{title}</h3>
            </div>
        </Stack>
        </>
    );
}

export default MainNews;