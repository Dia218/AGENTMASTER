//모의투자 메인 페이지의 보유중인 주식 리스트를 나타내는 부분
import "./css/Status_list.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StatusList() {
  const [stockHoldings, setStockHoldings] = useState([]);

  useEffect(() => {
    // 백엔드에서 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getHoldingInfo'); // 백엔드에서 보유 주식 정보를 가져오는 엔드포인트
        setStockHoldings(response.data.HoldingInfo); // 받아온 데이터를 stockHoldings 상태로 설정
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // 데이터 가져오는 함수 호출
  }, []);

  return (
    <div className="simulStatusList">
      <div className="simulStatusList_tableContainer">
        <table className="simulStatusList_table">
          <thead>
            <tr className="simulStatusList_title">
              <th className="simulStatusList_name">종목명</th>
              <th>손익(가격)</th>
              <th>손익률(%)</th>
              <th>보유량(주)</th>
            </tr>
          </thead>
          <tbody>
            {stockHoldings.length === 0 ? (
              <tr>
                <td colSpan="4">보유 중인 모의투자 주식이 없습니다.</td>
              </tr>
            ) : (
              stockHoldings.map((holding, index) => (
                <tr className="simulStatusList_row" key={index + 1}>
                  <td>
                    <Link className="simulStatusList_a" to={`/simulTrade?keyword=${holding.stockName}`}>
                      {holding.stockName}
                    </Link>
                  </td>
                  <td>{holding.simulReturn} ({holding.stockPerchaseAmount})</td>
                  <td>{holding.simulRange}%</td>
                  <td>{holding.simulHoldingsnum}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

StatusList.propTypes = {
  stock_holdings: PropTypes.number.isRequired,
};

export default StatusList;
