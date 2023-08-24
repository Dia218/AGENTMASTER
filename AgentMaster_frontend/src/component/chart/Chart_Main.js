//주식페이지 메인
import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import io from 'socket.io-client';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
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
const socket = io(); // 웹소켓 서버 주소

export function News() {
  const [news, setNews] = useState([]);

  const tempNews = [
    {
      id: 1,
      description: '뉴스 기사 1',
    },
    {
      id: 2,
      description: '뉴스 기사 2',
    },
    {
      id: 3,
      description: '뉴스 기사 3',
    },
    {
      id: 4,
      description: '뉴스 기사 4',
    },
    {
      id: 5,
      description: '뉴스 기사 5',
    },
  ];

  useEffect(() => {
    const updateNews = (updatedNews) => {
      setNews(updatedNews);
    };

    // 웹소켓으로 실시간 뉴스 업데이트 수신
    socket.on('newsUpdate', updateNews);

    // 임시값 설정
    setNews(tempNews);

    return () => {
      socket.off('newsUpdate', updateNews); // 이벤트 리스너 해제
      socket.disconnect(); // 컴포넌트가 언마운트될 때 웹소켓 연결 해제
    };
  }, [tempNews]);

  return (
    <div className="chartNews">
      <h1 className="news-title">오늘의 뉴스</h1>
      <hr className="news-divider" />
      <div className="news-container">
        {news.map((article) => (
          <p key={article.id} className="news-description">
            {article.description}
          </p>
        ))}
      </div>
      
    </div>
  );
}

export function Search() {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const getKeyword = async (inputValue) => {
    try {
      if (isNaN(inputValue)) {
        const response = await fetch(
          "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=YOUR_SERVICE_KEY&resultType=json&basDt=20230802&likeItmsNm=" +
            encodeURIComponent(inputValue)
        );
        const data = await response.json();
        return data.response.body.items.item;
      } else {
        const response = await fetch(
          "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=YOUR_SERVICE_KEY&resultType=json&basDt=20230802&likeSrtnCd=" +
            encodeURIComponent(inputValue)
        );
        const data = await response.json();
        return data.response.body.items.item;
      }
    } catch (error) {
      console.error('Error fetching keyword suggestions:', error);
      return [];
    }
  };

  const fetchSuggestions = async (inputValue) => {
    const keywordSuggestions = await getKeyword(inputValue);
    setSuggestions(keywordSuggestions);
  };

  const handleInputChange = (event, { newValue }) => {
    setValue(newValue);
    fetchSuggestions(newValue);
  };

  const handleSearch = () => {
    if (value.trim() !== '') {
      navigate(`/chartDetail?result=${encodeURIComponent(value)}`, {
        state: {
          keyword: value,
        },
      });
    }
  };

  const onSuggestionSelected = (event, { suggestionValue }) => {
    // Implement your suggestion selection logic here
  };

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <div className='ChartMianSearch' style={{ borderRadius: '10px', padding: '30px' }}>
        <Autosuggest
  suggestions={suggestions}
  onSuggestionsFetchRequested={({ value }) => fetchSuggestions(value)}
  onSuggestionsClearRequested={() => setSuggestions([])}
  onSuggestionSelected={onSuggestionSelected}
  getSuggestionValue={(suggestion) => suggestion}
  renderSuggestion={(suggestion) => (
    <div key={suggestion} style={{ margin: '5px 0', listStyle: 'none' }}>
      {suggestion}
    </div>
  )}
  inputProps={{
    value: value,
    onChange: handleInputChange,
    style: {
      border: '3px solid #9bccfb',
      padding: '30px',
      borderRadius: '10px',
      width: '550px',
      marginTop: '40px',
      fontSize: '20px',
      marginLeft: '60px',
      listStyle: 'none',
    },
  }}
/>
        </div>
        {suggestions.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '60%',
              left: 50,
              right: 0,
              borderRadius: '5px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              padding: '10px',
              width: '600px',
              margin: 'auto',
              listStyle: 'none',
            }}
          >
            {suggestions.map((suggestion) => (
              <div key={suggestion} style={{ margin: '5px 0', listStyle: 'none' }}>
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      <IconButton
        type="submit"
        sx={{ p: '10px' }}
        aria-label="search"
        size="large"
        style={{
          position: 'absolute',
          top: '170px',
          marginLeft: '560px',
        }}
        onClick={handleSearch}
      >
        <SearchIcon fontSize="large" />
      </IconButton>
    </div>
  );
}


//상한가, 하한가 등등 데이터 필요해서 웹소켓 코드로 변경
/*
export function Table() {
  const [data, setData] = useState([]);
  const [showFullTable, setShowFullTable] = useState(false);
  const socket = io();
  const navigate = useNavigate();
  useEffect(() => {
    socket.on('dataUpdate', (newData) => {
      setData(newData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleButtonClick = (type) => {
    socket.emit('buttonClick', type);
  };

  const handleClick = () => {
    if(sessionStorage.getItem("user")!=null){
      navigate(`/SimulMain`);
    } else if (sessionStorage.getItem("user")==null) {
      alert("로그인이 필요한 기능입니다!");
      navigate(`/`);
    }
};

 return (
    <div className="table-parent-container">
      <div className="table-buttons">
      <button onClick={() => handleButtonClick('상한가')}>상한가</button>
        <button onClick={() => handleButtonClick('하한가')}>하한가</button>
        <button onClick={() => handleButtonClick('상승')}>상승</button>
        <button onClick={() => handleButtonClick('하락')}>하락</button>
        <button onClick={() => handleButtonClick('거래량상위')}>거래량상위</button>
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
          <tbody>
            {data.map((item, index) => (
              <React.Fragment key={item.rank}>
                <tr>
                  <td> {item.rank}</td>
                  <td >{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.change}</td>
                  <td>{item.changeRate}</td>
                  <td>{item.volume}</td>
                </tr>
                <tr className="thin-border">
                <td colSpan={showFullTable ? 10 : 5}></td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
*/


export function Table() {
  const [data, setData] = useState([]);
  const [showFullTable, setShowFullTable] = useState(false);
  const navigate = useNavigate();
  const handleButtonClick = (type) => {
    if (type === '상한가') {
      const newData = [
        { rank: 1, name: '종목1', price: 100, change: '+10%', changeRate: '1.0%', volume: 1000 },
        { rank: 2, name: '종목2', price: 200, change: '-20%', changeRate: '-2.0%', volume: 2000 },
        { rank: 3, name: '종목3', price: 300, change: '+30%', changeRate: '3.0%', volume: 3000 },
        { rank: 4, name: '종목4', price: 400, change: '-40%', changeRate: '-4.0%', volume: 4000 },
        { rank: 5, name: '종목5', price: 500, change: '+50%', changeRate: '5.0%', volume: 5000 },
        { rank: 6, name: '종목6', price: 600, change: '-60%', changeRate: '-6.0%', volume: 6000 },
      ];
      setData(newData);
      setShowFullTable(false); //전체 테이블 안보여주기
    } 
    else if(type === '하한가') {
      const newData = [
        { rank: 1, name: '종목1', price: 100, change: '-10%', changeRate: '1.0%', volume: 1000 },
        { rank: 2, name: '종목2', price: 200, change: '+20%', changeRate: '-2.0%', volume: 2000 },
        { rank: 3, name: '종목3', price: 300, change: '-30%', changeRate: '3.0%', volume: 3000 },
        { rank: 4, name: '종목4', price: 400, change: '-40%', changeRate: '-4.0%', volume: 4000 },
        { rank: 5, name: '종목5', price: 500, change: '+50%', changeRate: '5.0%', volume: 5000 },
        { rank: 6, name: '종목6', price: 600, change: '-60%', changeRate: '-6.0%', volume: 6000 },
      ];
      setData(newData);
      setShowFullTable(false);
    } 
    else if (type === '상승') {
      const newData = [
        { rank: 1, name: '종목1', price: 100, change: '+10%', changeRate: '1.0%', volume: 1000},
        { rank: 2, name: '종목2', price: 200, change: '-20%', changeRate: '-2.0%', volume: 2000},
        { rank: 3, name: '종목3', price: 300, change: '+30%', changeRate: '3.0%', volume: 3000},
        { rank: 4, name: '종목4', price: 400, change: '-40%', changeRate: '-4.0%', volume: 4000 },
        { rank: 5, name: '종목5', price: 500, change: '+50%', changeRate: '5.0%', volume: 5000},
        { rank: 6, name: '종목6', price: 600, change: '-60%', changeRate: '-6.0%', volume: 6000},
      ];
      setData(newData);
      setShowFullTable(true);
    }
    else if (type === '거래량상위') {
      const newData = [
        { rank: 1, name: '종목1', price: 100, change: '+10%', changeRate: '1.0%', volume: 1000},
        { rank: 2, name: '종목2', price: 200, change: '-22%', changeRate: '-2.0%', volume: 2000},
        { rank: 3, name: '종목3', price: 300, change: '+33%', changeRate: '3.0%', volume: 3000},
        { rank: 4, name: '종목4', price: 400, change: '-42%', changeRate: '-4.0%', volume: 4000},
        { rank: 5, name: '종목5', price: 500, change: '+56%', changeRate: '5.0%', volume: 5000},
        { rank: 6, name: '종목6', price: 600, change: '-60%', changeRate: '-6.0%', volume: 6000},
      ];
      setData(newData);
      setShowFullTable(true);
    }
    else if (type === '하락') {
      const newData = [
        { rank: 1, name: '종목1', price: 100, change: '+10%', changeRate: '1.0%', volume: 1000},
        { rank: 2, name: '종목2', price: 200, change: '-20%', changeRate: '-2.0%', volume: 2000},
        { rank: 3, name: '종목3', price: 300, change: '+30%', changeRate: '3.0%', volume: 3000},
        { rank: 4, name: '종목4', price: 400, change: '-48%', changeRate: '-4.0%', volume: 4000},
        { rank: 5, name: '종목5', price: 500, change: '+51%', changeRate: '5.0%', volume: 5000},
        { rank: 6, name: '종목6', price: 600, change: '-65%', changeRate: '-6.0%', volume: 6000},
      ];
      setData(newData);
      setShowFullTable(true);
    }
  };
  const handleClick = () => {
    if(sessionStorage.getItem("user")!=null){
      navigate(`/SimulMain`);
    } else if (sessionStorage.getItem("user")==null) {
      alert("로그인이 필요한 기능입니다!");
      navigate(`/`);
    }
};
  return (
    <div className="table-parent-container">
      <div className="table-buttons">
      <button onClick={() => handleButtonClick('상한가')}>상한가</button>
        <button onClick={() => handleButtonClick('하한가')}>하한가</button>
        <button onClick={() => handleButtonClick('상승')}>상승</button>
        <button onClick={() => handleButtonClick('하락')}>하락</button>
        <button onClick={() => handleButtonClick('거래량상위')}>거래량상위</button>
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
          <tbody>
            {data.map((item, index) => (
              <React.Fragment key={item.rank}>
                <tr>
                  <td> {item.rank}</td>
                  <td >{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.change}</td>
                  <td>{item.changeRate}</td>
                  <td>{item.volume}</td>
                </tr>
                <tr className="thin-border">
                <td colSpan={showFullTable ? 10 : 5}></td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export function MockInvestmentRanking() {
  const [showRanking, setShowRanking] = useState(true); // 모의투자 랭킹 표시 여부
  const [rankingData, setRankingData] = useState([]); // 모의투자 랭킹 데이터
  const socket = io();

  // 임시 데이터
  const mockData = [
    { rank: 1, id: 'ID1',returns: '10.0%' },
    { rank: 2, id: 'ID2', returns: '8.0%' },
    { rank: 3, id: 'ID3', returns: '6.0%' },
    { rank: 4, id: 'ID4',  returns: '4.0%' },
    { rank: 5, id: 'ID5',returns: '2.0%' },
    { rank: 6, id: 'ID6',  returns: '1.0%' },
    { rank: 7, id: 'ID7', returns: '0.5%' },
    { rank: 8, id: 'ID8',  returns: '0.3%' },
    { rank: 9, id: 'ID9', returns: '0.1%' },
    { rank: 10, id: 'ID10',  returns: '0.05%' },
  ];

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

  useEffect(() => {
    const updateRankingData = () => {
      const updatedRankingData = mockData.map((item) => ({
        ...item,
        returns: getRandomReturns(),
      }));
      setRankingData(updatedRankingData);
    };

    const intervalId = setInterval(updateRankingData, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getRandomReturns = () => {
    return (Math.random() * 10).toFixed(1) + '%';
  };

  return (
    <div>
      <div className='mockTitle'>
        <img className='trophy' src={trophy} alt="trophy" />
        <h2>모의투자 랭킹</h2>
      </div>

      <div className="mock-ranking-container">
        {showRanking && (
          <div className="ranking-list">

            <div className="ranking-left">
              <ul style={{ listStyleType: 'none' }}>
                <li className='title'>순위 <span className="item-text">수익률</span> <span className="item-titleId"> ID </span> </li>
              </ul>
              <ul className="dot-list" start={1}>
                {rankingData.slice(0, 5).map((item, index) => (
                  <li key={item.rank} className="ranking-item">
                    {getRankIcon(item.rank)} <span className="item-text">{item.returns}</span> <span className="item-id">{item.id}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ranking-right">
              <ul className="dot-list" start={6}>
                {rankingData.slice(5, 10).map((item, index) => (
                  <li key={item.rank} className="ranking-item">
                  {getRankIcon(item.rank)} <span className="item-text">{item.returns}</span> <span className="item-id">{item.id}</span>
                  </li>
                ))}
              </ul>
              <div className="dot-line"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
