//모의투자 메인화면에서 거래 상위를 나타내는 종목의 헤더를 나타내는 곳입니다.

import "./css/Main_header.css";

function Main_header() {
    return(
    <div className="simulMainHeader">
        <div className="simulMainHeaderTitle">급상승 주식</div>
        <div className="simulMainHeaderBar">
            <div className="simulMainHeaderStockId">종목코드</div>
            <div className="simulMainHeaderStockName">종목명</div>
            <div className="simulMainHeaderStockPrice">현재가</div>
            <div className="simulMainHeaderStockDifferent">전일비</div>
            <div className="simulMainHeaderStockRange">등락률</div>
        </div>
        <div className="simulMainHeaderLine"></div>
    </div>
    )
}

export default Main_header;