//모의투자 메인화면 입니다.

import "./css/SimulMain.css";
import Header from "../component/Header";
import Simul_search from "../component/Simul/Simul_search";
import Simul_main from "../component/Simul/Simul_main";
import Simul_status from "../component/Simul/Simul_status";

function SimulMain() {

    return (
        <div className="nd_body">
            <header className="mb-4"><Header /></header>
            <div className="simulMain">
                <div className="simulMain_up">
                    <Simul_search />
                </div>
                <div className="simulMain_down">
                    <div className="simulMain_left">
                        <Simul_main />
                    </div>
                    <div className="simulMain_right">
                        <Simul_status />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SimulMain;