//모의투자 메인화면에서 거래 상위 종목을 나타내는 부분입니다.

import "./css/Simul_main.css";
import Main_body from "./Main_body";
import Main_header from "./Main_header";

function Simul_main() {
    return (
        <div className="Simul_main">
            <Main_header />
            <Main_body />
        </div>
    )
}

export default Simul_main;