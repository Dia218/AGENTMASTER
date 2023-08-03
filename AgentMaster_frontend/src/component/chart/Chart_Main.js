import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Autosuggest from 'react-autosuggest';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
const socket = io(); // 웹소켓 서버 주소

export function News() {
  const [news, setNews] = useState([]);

  const tempNews = [
    {
      id: 1,
      description: '임시 뉴스 요약 1',
    },
    {
      id: 2,
      description: '임시 뉴스 요약 2',
    },
    {
      id: 3,
      description: '임시 뉴스 요약 3',
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
      <h1>오늘의 뉴스</h1>
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
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const fetchSuggestions = (inputValue) => {
    setTimeout(() => {
      const predefinedSuggestions = ['예시1', '예시2', '예시3'];
      const filteredSuggestions = [...new Set(predefinedSuggestions)].filter((suggestion) =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }, 300);
  };

  const handleInputChange = (event, { newValue }) => {
    setValue(newValue);
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

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '30px' }}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={({ value }) => fetchSuggestions(value)}
            onSuggestionsClearRequested={() => setSuggestions([])}
            onSuggestionSelected={handleSearch}
            getSuggestionValue={(suggestion) => suggestion}
            renderSuggestion={() => null}
            inputProps={{
              value: value,
              onChange: handleInputChange,
              style: {
                backgroundColor: 'white',
                border: '3px solid #9bccfb',
                padding: '30px',
                borderRadius: '10px',
                width: '550px',
                marginTop: '60px',
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
              backgroundColor: 'white',
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
          top: '190px',
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
export function Table() {
  const [data, setData] = useState([]);
  const [showFullTable, setShowFullTable] = useState(false);
  const socket = io();

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

  return (
    <div className="table-parent-container">
      <div className="table-buttons">
        <button onClick={() => handleButtonClick('상한가')}>상한가</button>
        <button onClick={() => handleButtonClick('하한가')}>하한가</button>
        <button onClick={() => handleButtonClick('상승')}>상승</button>
        <button onClick={() => handleButtonClick('보합')}>보합</button>
        <button onClick={() => handleButtonClick('하락')}>하락</button>
        <button className='test'>모의투자 해보기</button>
      </div>
      <div>
        <table className="table2">
          <thead>
            <tr>
              <th>순위</th>
              <th>종목명</th>
              <th>현재가</th>
              <th>전일비</th>
              <th>등락률</th>
              {showFullTable && (
                <>
                  <th>거래량</th>
                  <th>매수호가</th>
                  <th>매도호가</th>
                  <th>매수총잔량</th>
                  <th>매도총잔량</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.rank}>
                <td>{item.rank}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.change}</td>
                <td>{item.changeRate}</td>
                {showFullTable && (
                  <>
                    <td>{item.volume}</td>
                    <td>{item.buy}</td>
                    <td>{item.sell}</td>
                    <td>{item.buyTotal}</td>
                    <td>{item.sellTotal}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
/*
export function Table() {
  const [data, setData] = useState([]);
  const [showFullTable, setShowFullTable] = useState(false);

  const handleButtonClick = (type) => {
    if (type === '상한가') {
      const newData = [
        { rank: 1, name: '종목1', price: 100, change: '+10%', changeRate: '1.0%' },
        { rank: 2, name: '종목2', price: 200, change: '-20%', changeRate: '-2.0%' },
        { rank: 3, name: '종목3', price: 300, change: '+30%', changeRate: '3.0%' },
        { rank: 4, name: '종목4', price: 400, change: '-40%', changeRate: '-4.0%' },
        { rank: 5, name: '종목5', price: 500, change: '+50%', changeRate: '5.0%' },
        { rank: 6, name: '종목6', price: 600, change: '-60%', changeRate: '-6.0%' },
      ];
      setData(newData);
      setShowFullTable(false); //전체 테이블 안보여주기
    } 
    else if(type === '하한가') {
      const newData = [
        { rank: 1, name: '종목1', price: 100, change: '-10%', changeRate: '1.0%' },
        { rank: 2, name: '종목2', price: 200, change: '+20%', changeRate: '-2.0%' },
        { rank: 3, name: '종목3', price: 300, change: '-30%', changeRate: '3.0%' },
        { rank: 4, name: '종목4', price: 400, change: '-40%', changeRate: '-4.0%' },
        { rank: 5, name: '종목5', price: 500, change: '+50%', changeRate: '5.0%' },
        { rank: 6, name: '종목6', price: 600, change: '-60%', changeRate: '-6.0%' },
      ];
      setData(newData);
      setShowFullTable(false);
    } 
    else if (type === '상승') {
      const newData = [
        { rank: 1, name: '종목1', price: 100, change: '+10%', changeRate: '1.0%', volume: 1000, buy: 110, sell: 90, buyTotal: 10000, sellTotal: 20000 },
        { rank: 2, name: '종목2', price: 200, change: '-20%', changeRate: '-2.0%', volume: 2000, buy: 210, sell: 190, buyTotal: 20000, sellTotal: 30000 },
        { rank: 3, name: '종목3', price: 300, change: '+30%', changeRate: '3.0%', volume: 3000, buy: 310, sell: 290, buyTotal: 30000, sellTotal: 40000 },
        { rank: 4, name: '종목4', price: 400, change: '-40%', changeRate: '-4.0%', volume: 4000, buy: 410, sell: 390, buyTotal: 40000, sellTotal: 50000 },
        { rank: 5, name: '종목5', price: 500, change: '+50%', changeRate: '5.0%', volume: 5000, buy: 510, sell: 490, buyTotal: 50000, sellTotal: 60000 },
        { rank: 6, name: '종목6', price: 600, change: '-60%', changeRate: '-6.0%', volume: 6000, buy: 610, sell: 590, buyTotal: 60000, sellTotal: 70000 },
      ];
      setData(newData);
      setShowFullTable(true);
    }
    else if (type === '보합') {
      const newData = [
        { rank: 1, name: '종목1', price: 100, change: '+10%', changeRate: '1.0%', volume: 1000, buy: 110, sell: 90, buyTotal: 10000, sellTotal: 20000 },
        { rank: 2, name: '종목2', price: 200, change: '-22%', changeRate: '-2.0%', volume: 2000, buy: 210, sell: 190, buyTotal: 20000, sellTotal: 30000 },
        { rank: 3, name: '종목3', price: 300, change: '+33%', changeRate: '3.0%', volume: 3000, buy: 310, sell: 290, buyTotal: 30000, sellTotal: 40000 },
        { rank: 4, name: '종목4', price: 400, change: '-42%', changeRate: '-4.0%', volume: 4000, buy: 410, sell: 390, buyTotal: 40000, sellTotal: 50000 },
        { rank: 5, name: '종목5', price: 500, change: '+56%', changeRate: '5.0%', volume: 5000, buy: 510, sell: 490, buyTotal: 50000, sellTotal: 60000 },
        { rank: 6, name: '종목6', price: 600, change: '-60%', changeRate: '-6.0%', volume: 6000, buy: 610, sell: 590, buyTotal: 60000, sellTotal: 70000 },
      ];
      setData(newData);
      setShowFullTable(true);
    }
    else if (type === '하락') {
      const newData = [
        { rank: 1, name: '종목1', price: 100, change: '+10%', changeRate: '1.0%', volume: 1000, buy: 110, sell: 90, buyTotal: 10000, sellTotal: 20000 },
        { rank: 2, name: '종목2', price: 200, change: '-20%', changeRate: '-2.0%', volume: 2000, buy: 210, sell: 190, buyTotal: 20000, sellTotal: 30000 },
        { rank: 3, name: '종목3', price: 300, change: '+30%', changeRate: '3.0%', volume: 3000, buy: 310, sell: 290, buyTotal: 30000, sellTotal: 40000 },
        { rank: 4, name: '종목4', price: 400, change: '-48%', changeRate: '-4.0%', volume: 4000, buy: 410, sell: 390, buyTotal: 40000, sellTotal: 50000 },
        { rank: 5, name: '종목5', price: 500, change: '+51%', changeRate: '5.0%', volume: 5000, buy: 510, sell: 490, buyTotal: 50000, sellTotal: 60000 },
        { rank: 6, name: '종목6', price: 600, change: '-65%', changeRate: '-6.0%', volume: 6000, buy: 610, sell: 590, buyTotal: 60000, sellTotal: 70000 },
      ];
      setData(newData);
      setShowFullTable(true);
    }
  };


  return (
    <div className="table-parent-container">
      <div className="table-buttons">
        <button onClick={() => handleButtonClick('상한가')}>상한가</button>
        <button onClick={() => handleButtonClick('하한가')}>하한가</button>
        <button onClick={() => handleButtonClick('상승')}>상승</button>
        <button onClick={() => handleButtonClick('보합')}>보합</button>
        <button onClick={() => handleButtonClick('하락')}>하락</button>
        <button className='test'>모의투자 해보기</button>
      </div>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>순위</th>
              <th>종목명</th>
              <th>현재가</th>
              <th>전일비</th>
              <th>등락률</th>
              {showFullTable && (
                <>
                  <th>거래량</th>
                  <th>매수호가</th>
                  <th>매도호가</th>
                  <th>매수총잔량</th>
                  <th>매도총잔량</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.rank}>
                <td>{item.rank}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.change}</td>
                <td>{item.changeRate}</td>
                {showFullTable && (
                  <>
                    <td>{item.volume}</td>
                    <td>{item.buy}</td>
                    <td>{item.sell}</td>
                    <td>{item.buyTotal}</td>
                    <td>{item.sellTotal}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
*/ 

export function MockInvestmentRanking() {
  const [showRanking, setShowRanking] = useState(true); // 모의투자 랭킹 표시 여부
  const [rankingData, setRankingData] = useState([]); // 모의투자 랭킹 데이터
  const socket = io();

  // 임시 데이터
  const mockData = [
    { rank: 1, id: 'ID1', stock: '종목1', returns: '10.0%' },
    { rank: 2, id: 'ID2', stock: '종목2', returns: '8.0%' },
    { rank: 3, id: 'ID3', stock: '종목3', returns: '6.0%' },
    { rank: 4, id: 'ID4', stock: '종목4', returns: '4.0%' },
    { rank: 5, id: 'ID5', stock: '종목5', returns: '2.0%' },
    { rank: 6, id: 'ID6', stock: '종목6', returns: '1.0%' },
    { rank: 7, id: 'ID7', stock: '종목7', returns: '0.5%' },
    { rank: 8, id: 'ID8', stock: '종목8', returns: '0.3%' },
    { rank: 9, id: 'ID9', stock: '종목9', returns: '0.1%' },
    { rank: 10, id: 'ID10', stock: '종목10', returns: '0.05%' },
  ];

  useEffect(() => {
    const updateRankingData = () => {
     
      const updatedRankingData = mockData.map((item) => ({
        ...item,
        returns: getRandomReturns(),
      }));
      setRankingData(updatedRankingData);
    };

    
    const intervalId = setInterval(updateRankingData, 3000);

    return () => {
      clearInterval(intervalId); 
    };
  }, []);

  const getRandomReturns = () => {
    return (Math.random() * 10).toFixed(1) + '%';
  };

  return (
    <div className="mock-ranking-container">
      {showRanking && (
        <div className="ranking-list">
          <h2>모의투자 랭킹</h2>
          <div className="ranking-left">
            <ul style={{ listStyleType: 'none' }}>
              <li className='title'>순위- 아이디- 종목- 수익률</li>
              </ul>
              <ol className="dot-list" start={1}>
              {rankingData.slice(0, 5).map((item, index) => (
                <li key={item.rank}>
                  {item.id} - {item.stock} - {item.returns}
                </li>
              ))}
           </ol>
          </div>
          <div className="ranking-right">
            <ul style={{ listStyleType: 'none' }}>
              <li className='title'>순위 - 아이디 - 종목 - 수익률</li>
            </ul>
            <ol className="dot-list" start={6}>
              {rankingData.slice(5, 10).map((item, index) => (
                <li key={item.rank}>
                  {item.id} - {item.stock} - {item.returns}
                </li>
              ))}
            </ol>
            <div className="dot-line"></div>
          </div>
        </div>
      )}
    </div>
  );
  
}
