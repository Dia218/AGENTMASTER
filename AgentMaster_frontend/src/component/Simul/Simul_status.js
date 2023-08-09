//모의투자 메인화면에서 사용자의 투자 정보를 나타내는 곳입니다.

import "./css/Simul_status.css";
import { useEffect, useState } from "react";
import Status_list from "./Status_list";
import { Link } from "react-router-dom";

function Simul_status() {
    const [money, setMoney] = useState(320000);
    const [stock_money, setStockMoney] = useState(443200);
    const [total_money, setTotalMoney] = useState(money + stock_money);
    const [stock_holdings, setStockHoldings] = useState(20);

    const onClick = () => {     //클릭 리스너
        const reset = window.confirm("모의투자 정보를 초기화 하시겠습니까?");
        if(reset === true) {
            setMoney(10000);
            setStockMoney(0);
            setStockHoldings(0);
        }
    }

    useEffect(() => {   //총 자산 저장할 때 프론트에 바로 적용이 안되서 따로 적음. 필요없으면 지워도 됨.
        setTotalMoney(money + stock_money);
    },[money]);

    return (
        <div className="Simul_status"> 
            <div className="simulStatusHeader">
                <div className="simulStatusHeaderBar">
                    <div className="simulStatusTitle">나의 투자 정보</div>
                    <div className="simulStatusReset">
                        <button className="simulStatusResetBtn" onClick={onClick}>초기화</button>
                    </div>
                </div>
                <div className="simulStatusUsername">
                    Username 님
                </div>
                <div className="simulStatusHeaderLine"></div>
            </div>
            <div className="simulStatusUser">
                <Link className="simulStatusUser_a" to="/chartMain">
                    <div className="simulStatusUserRange">
                        모의투자 수익률...10%
                    </div>
                    <div className="simulStatusUserRanking">
                        순위: #1
                    </div>
                </Link>
            </div>
            <div className="simulStatusInfo">
                <ul className="simulStatusInfo_ul">
                    <li className="simulStatusInfo_li">
                        <div>총 자산: {total_money}</div>
                    </li>
                    <li className="simulStatusInfo_li">
                        <div>가용 자산: {money}</div>
                    </li>
                    <li className="simulStatusInfo_li">
                        <div>보유 주식 총액: {stock_money}</div>
                    </li>
                    <li className="simulStatusInfo_li">
                        <div>보유 종목 수: {stock_holdings}</div>
                    </li>
                </ul>
            </div>
            <Status_list stock_holdings={stock_holdings} />
        </div>
    )
}
export default Simul_status;