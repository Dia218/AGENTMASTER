
import "./css/Status_list.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Status_list({ stock_holdings }) {
  const NoneSimulStock = () => {
    return <div className="noneSimulStock">보유 중인 모의투자 주식이 없습니다.</div>;
  };

  // 임시 데이터 생성
  const tempData = [
    { name: "종목1", profit: 10000, profitRate: 5.0, quantity: 100 },
    { name: "종목2", profit: -5000, profitRate: -2.5, quantity: 50 },
    { name: "종목3", profit: -5000, profitRate: +2.5, quantity: 50 },
    { name: "종목4", profit: -5000, profitRate: -3.5, quantity: 50 },
    { name: "종목5", profit: -5000, profitRate: +3.5, quantity: 50 },
    { name: "종목6", profit: -5000, profitRate: -4.5, quantity: 50 },
    { name: "종목7", profit: -5000, profitRate: +4.5, quantity: 50 },
    { name: "종목8", profit: -5000, profitRate: -5.5, quantity: 50 },
    { name: "종목9", profit: -5000, profitRate: +5.5, quantity: 50 },
  ];

  return (
    <div className="simulStatusList">
      <div className="simulStatusList_tableContainer">
        <table className="simulStatusList_table">
          <thead>
            <tr className="simulStatusList_title">
              <th>종목명</th>
              <th>손익(가격)</th>
              <th>손익률(%)</th>
              <th>보유량(주)</th>
            </tr>
          </thead>
          <tbody>
            {stock_holdings === 0 ? (
              <tr>
                <td colSpan="4">
                  <NoneSimulStock />
                </td>
              </tr>
            ) : (
              tempData.map((data, index) => (
                <tr className="simulStatusList_row" key={index + 1}>
                  <td>
                    <Link className="simulStatusList_a" to={"/simulTrade?keyword="+ data.name}>
                      {data.name}
                    </Link>
                  </td>
                  <td>{data.profit} 원</td>
                  <td>{data.profitRate} %</td>
                  <td>{data.quantity} 주</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Status_list.propTypes = {
  stock_holdings: PropTypes.number.isRequired,
};

export default Status_list;


