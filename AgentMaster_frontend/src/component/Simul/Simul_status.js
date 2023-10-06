import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Status_list from './Status_list';
import "./css/Simul_status.css";
import { LoadingOutlined } from '@ant-design/icons';

function Simul_status({ userName }) {
  const [money, setMoney] = useState(320000);
  const [stock_money, setStockMoney] = useState(443200);
  const [total_money, setTotalMoney] = useState(money + stock_money);
  const [stock_holdings, setStockHoldings] = useState(20);
  const [customerRank, setCustomerRank] = useState('-');
  const [customerRankRange, setCustomerRankRange] = useState('-');
  const [loading, setLoading] = useState(true);
  const resetAccount = () => {
    const resetConfirmed = window.confirm('모의투자 정보를 초기화 하시겠습니까?');

    if (resetConfirmed) {
     
      axios.post(`http://localhost:8080/resetAccount`, { userName })
        .then((response) => {
          
          //console.log('초기화 성공', response.data);
          
          setMoney(10000);
          setStockMoney(0);
          setStockHoldings(0);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error('초기화 실패', error);
        });
    }
  };

  useEffect(() => {
    setTotalMoney(money + stock_money);
  }, [money, stock_money]);

  useEffect(() => {
    // 사용자 모의투자 순위 정보를 백엔드에서 요청
    axios.get(`http://localhost:8080/RankInfo?userName=${userName}`)
      .then((response) => {
        const rankInfo = response.data.RankInfo[0]; // 첫 번째 사용자 순위 정보를 가져옴
        setCustomerRank(rankInfo.customerRank);
        setCustomerRankRange(rankInfo.customerRankRange);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching rank data:', error);
        setLoading(false);
      });

    // 사용자 계좌 정보를 백엔드에서 요청
    axios.get(`http://localhost:8080/AccountInfo?userName=${userName}`)
      .then((response) => {
        const accountInfo = response.data.AccountInfo[0]; // 첫 번째 사용자 계좌 정보를 가져옴
        // 백엔드에서 제공되는 필드 이름에 따라 설정
        setMoney(accountInfo.customerSimulMoney);
        setStockMoney(accountInfo.customerStockMoney);
        setStockHoldings(accountInfo.customerStockHoldingNum);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching account data:', error);
        setLoading(false);
      });
  }, []); // 빈 배열을 전달하여 한 번만 데이터를 가져오도록 설정

  return (
    <div className="Simul_status">
      {loading ? (
        <div className='loading_main'><LoadingOutlined />loading...</div>
      ) : (
        <>
          <div className="simulStatusHeader">
            <div className="simulStatusHeaderBar">
              <div className="simulStatusTitle">{sessionStorage.getItem('user')} 님의 투자 정보</div>
              <div className="simulStatusReset">
                <button className="simulStatusResetBtn" onClick={resetAccount}>
                  초기화
                </button>
              </div>
            </div>
          </div>
          <div className="simulStatusUser">
            <div className="simulStatusUserRanking">
              랭킹
              <div className="Ranking">{customerRank}</div>
            </div>
            <div className="simulStatusUserRange">
              수익률
              <div className="Range">{customerRankRange}%</div>
            </div>
          </div>
          <div className="simulStatusInfo">
            <ul className="simulStatusInfo_ul">
              <li className="simulStatusInfo_li">
                <div className="simulStatusInfo_label">총 자산:</div>
                <div className="simulStatusInfo_value">{total_money}</div>
              </li>
              <li className="simulStatusInfo_li">
                <div className="simulStatusInfo_label">가용 자산:</div>
                <div className="simulStatusInfo_value">{money}</div>
              </li>
              <li className="simulStatusInfo_li">
                <div className="simulStatusInfo_label">보유 주식 총액:</div>
                <div className="simulStatusInfo_value">{stock_money}</div>
              </li>
              <li className="simulStatusInfo_li">
                <div className="simulStatusInfo_label">보유 종목 수:</div>
                <div className="simulStatusInfo_value">{stock_holdings}</div>
              </li>
            </ul>
          </div>
          <Status_list stock_holdings={stock_holdings} />
        </>
      )}
    </div>
  );
      }
  

export default Simul_status;
