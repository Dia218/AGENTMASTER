//주식페이지 메인
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import trophy from './icons/trophy.png'; 
import rank1 from './icons/rank1.png'; 
import rank2 from './icons/rank2.png';
import rank3 from './icons/rank3.png'; 
import rank4 from './icons/rank4.png';
import rank5 from './icons/rank5.png'; 
import rank6 from './icons/rank6.png';
import rank7 from './icons/rank7.png'; 
import rank8 from './icons/rank8.png';
import rank9 from './icons/rank9.png'; 
import rank10 from './icons/rank10.png';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';

//오늘의 뉴스
export function News() {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNews = async () => {
    try {
      const getNewsRep = await axios.get('http://localhost:8080/ChartMain/TodayNews');
      setNewsData(getNewsRep.data.Today);
      setLoading(false); // 로딩 완료
    } catch (error) {
      //임의 추가 부분
      const getNewsRep = await servedata();
      setNewsData(getNewsRep.Today);
      setLoading(false);
      //임의 추가 부분 종료
    }
  };

  //임의 추가 부분
  async function servedata() {
    const json = {"Today":[{"title":"Sample Title","summary":"나랏말싸미123듕13귁에 다라"}]};
    return json;
}
//임의 추가 부분 종료

  useEffect(() => {
    // 백엔드에서 데이터 요청
    getNews();
  }, []);

  const handleClick = (articleTitle) => {
    navigate(`/newsDetail?id=${articleTitle}`, {
      state: {
        id: articleTitle,
      },
    });
  };

  return (
    <div className="chartNews">
      {loading ? (
        <div className='loading_main'><LoadingOutlined />loading...</div>
      ) : (
        <>
          <h1 className="news-title">오늘의 뉴스</h1>
          <hr className="news-divider" />
          <div className="news-container">
            {newsData.length === 0 ? (
              <div>No news available.</div> // 데이터가 없는 경우에 대한 처리
            ) : (
              newsData.map((article) => (
                //백엔드 파트's 코드 수정 article.title => article.articleId (백엔드 DTO도 수정함 TodayArticle에 id 속성 추가)
                <div key={article.title} className="news-item" onClick={() => handleClick(article.articleId)}>
                  <p>{article.title}</p>
                  <p className="news-summary">{article.summary}</p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

 
//top5의 주식 종목 데이터 테이블
export function Table() {
  const [data, setData] = useState([]); // 데이터를 저장할 상태
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // 데이터 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 버튼 클릭 시 필요한 데이터 요청
  const handleButtonClick = (type) => {
    setLoading(true);

    // Axios를 사용하여 데이터를 백엔드에서 요청
    axios.get(`http://localhost:8080/${type}`) // "상한가", "하한가", "상승" 등의 타입에 따라 요청 URL 변경
      .then((response) => {
        // 요청이 성공하면 데이터 업데이트
        setData(response.data.TopRate); // "TopRate" 필드에서 데이터를 가져옴
        setLoading(true);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // 데이터 요청 시작 시 로딩 상태 설정
    setLoading(true);
    // 에러 초기화
    setError(null);

    // 초기 데이터 로딩 (상한가 데이터)
    axios.get('http://localhost:8080/TopRate')
      .then((response) => {
        // 요청이 성공하면 데이터 업데이트
        setData(response.data.TopRate); // "TopRate" 필드에서 데이터를 가져옴
        setLoading(false); // 로딩 완료
      })
      .catch((err) => {
        // 요청이 실패하면 에러 처리
        setError(err);
        setLoading(false); // 로딩 완료
      });
  }, []);

  const handleClick = () => {
    if (sessionStorage.getItem("user") != null) {
      navigate(`/SimulMain`);
    } else if (sessionStorage.getItem("user") == null) {
      alert("로그인이 필요한 기능입니다!");
      navigate(`/`);
    }
  };

  return (
    <div className="table-parent-container">
      <div className="table-buttons">
        <button onClick={() => handleButtonClick('TopReturn')}>상한가</button>
        <button onClick={() => handleButtonClick('BottomReturn')}>하한가</button>
        <button onClick={() => handleButtonClick('TopRate')}>상승</button>
        <button onClick={() => handleButtonClick('BottomRate')}>하락</button>
        <button onClick={() => handleButtonClick('TopVolume')}>거래량상위</button>
        <button className='test' onClick={handleClick}>모의투자 해보기</button>
      </div>
      <div className="table-container">
        <table className="table2">
          <thead>
            <tr>
              <th className="border-top">순위</th>
              <th className="border-top">종목명</th>
              <th className="border-top">현재가</th>
              <th className="border-top">전일비</th>
              <th className="border-top">등락률</th>
              <th className="border-top">거래량</th>
            </tr>
          </thead>
          <tbody className='top-list'>
            {data.map((item, index) => (
              <React.Fragment key={item.stockId}>
                <tr>
                  <td> {item.rank}</td>
                  <td
                    className="link-button"
                    onClick={() => {
                      navigate(`/ChartDetail?keyword=${item.stockName}`);
                    }}
                  >
                    {item.stockName}
                  </td>
                  <td>{item.stockPrice}</td>
                  <td>{item.stockDiff}</td>
                  <td>{item.stockRange}</td>
                  <td>{item.stockVolume}</td>
                </tr>
                <tr className="thin-border">
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//모의투자 랭킹
export function MockInvestmentRanking() {
  const [showRanking, setShowRanking] = useState(true); // 모의투자 랭킹 표시 여부
  const [rankingData, setRankingData] = useState([]); // 모의투자 랭킹 데이터
  const [loading, setLoading] = useState(true);

  //순위 아이콘들
  const getRankIcon = (rank) => {
    let iconSrc = ''; 
    if (rank === 1) {
      iconSrc = rank1;
    } else if (rank === 2) {
      iconSrc = rank2;
    }
    else if (rank === 3) {
      iconSrc = rank3;
    }
    else if (rank === 4) {
      iconSrc = rank4;
    }
    else if (rank === 5) {
      iconSrc = rank5;
    }
    else if (rank === 6) {
      iconSrc = rank6;
    }
    else if (rank === 7) {
      iconSrc = rank7;
    }
    else if (rank === 8) {
      iconSrc = rank8;
    }
    else if (rank === 9) {
      iconSrc = rank9;
    }
    else if (rank === 10) {
      iconSrc = rank10;
    }
    return <img src={iconSrc} alt={`Rank ${rank}`} className="rank-icon" />;
  };
  const getRanking=async () => {
    try {
      const getRankingRep= await axios.get('http://localhost:8080/Ranking');
      const userRank = getRankingRep.data.Ranking.sort((a,b) => b.ranking[0].profit - a.ranking[0].profit);
      for(var i = 0 ; i<10;i++){
        // userRank.Ranking[i].rank=i+1;
      }
      setRankingData(userRank);
      // setRankingData(getRankingRep.data.Ranking);
      setLoading(false); // 로딩 완료
    } catch (error) {
      setLoading(false);
    }
  }
  useEffect(() => {
    getRanking();
  }, []);

  return (
    <div>
      <div className="mockTitle">
        <img className="trophy" src={trophy} alt="trophy" />
        <h2>모의투자 랭킹</h2>
        <div className="mock-ranking-container">
          {loading ? (
            <div className="loading_main">
              <LoadingOutlined />loading...
            </div>
          ) : (
            showRanking && (
              <div className="ranking-list">
                <div className="ranking-left">
                  <ul style={{ listStyleType: 'none' }}>
                    <li className="title">
                      순위 <span className="item-text">수익률</span> <span className="item-titleId"> ID </span>
                    </li>
                  </ul>
                  <ul className="dot-list" start={1}>
                    {rankingData.slice(0, 5).map((item) => (
                      <li key={item.ranking[0].rank} className="ranking-item">
                        {getRankIcon(item.ranking[0].rank)} <span className="item-text">{item.ranking[0].profit}</span>{' '}
                        <span className="item-id">{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="ranking-right">
                  <ul className="dot-list" start={6}>
                    {rankingData.slice(5, 10).map((item) => (
                      <li key={item.ranking[0].rank} className="ranking-item">
                        {getRankIcon(item.ranking[0].rank)} <span className="item-text">{item.ranking[0].profit}</span>{' '}
                        <span className="item-id">{item.name}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="dot-line"></div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
  
  
 }
