//검색 페이지로 넘어가는 임시 페이지. 병합 후 삭제 예정

import { useLocation, useSearchParams } from "react-router-dom";

function SearchResult(){
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const offset = searchParams.get('offset');
    const limit = searchParams.get('limit');

    console.log(location.state.keyword);
    console.log(offset,limit);

    return (
    <div className='nd_body'>
        <div>
            검색결과: {location.state.keyword}
        </div>
    </div>);
}

export default SearchResult;