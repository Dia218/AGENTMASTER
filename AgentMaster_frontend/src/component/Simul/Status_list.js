//사용자의 투자 정보에서 보유중인 모의투자 주식을 나타내는 곳입니다.

import "./css/Status_list.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Status_list({stock_holdings}) {

    const NoneSimulStock = () => {
        return (
            <div className="noneSimulStock">보유 중인 모의투자 주식이 없습니다.</div>
        )
    }

    return(
        <div className="simulStatusList">
            <ul className="simulStatusList_ul">
                {(stock_holdings === 0 ? <NoneSimulStock /> : null)}
                {[...Array(stock_holdings)].map((_, index) => (
                    <li className="simulStatusList_li" key={index + 1}>
                        <Link className="simulStatusList_a" to="/simul">
                        <div className="simulStatusList_div">보유 종목 예시{index + 1} </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )

}

Status_list.propTypes = {
    stock_holdings: PropTypes.number.isRequired,
}

export default Status_list;