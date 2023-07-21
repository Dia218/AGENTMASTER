//요약화면으로 넘어가는 임시 페이지. 병합 후 삭제 예정.

import { useLocation } from "react-router-dom";

function Detail() {

    const location = useLocation();

    return (
        <div>
            예비 페이지.
            현재 페이지의 아이디: {location.state.id}
        </div>
    );
};

export default Detail;