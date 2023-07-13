//차트 메인 페이지

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Autosuggest from 'react-autosuggest';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const socket = io(); // 웹소켓 서버 주소


export function News() {
  const [news, setNews] = useState([]);

  const tempNews = [
    {
      id: 1,
      title: '임시 뉴스 제목 1',
      description: '임시 뉴스 설명 1',
    },
    {
      id: 2,
      title: '임시 뉴스 제목 2',
      description: '임시 뉴스 설명 2',
    },
    {
      id: 3,
      title: '임시 뉴스 제목 3',
      description: '임시 뉴스 설명 3',
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
    <div className='news'>
      <h1>오늘의 뉴스</h1>
      {news.map((article) => (
        <div key={article.id}  className='news-container'>
          <h2 className='news-title'>{article.title}</h2>
          <p className='news-description'>{article.description}</p>
        </div>
      ))}
    </div>
  );
}

export function Search() {
  const predefinedSuggestions = ['검색어1', '검색어2', '검색어3'];
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionsFetchRequested = ({ value }) => {
    const filteredSuggestions = predefinedSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    // 선택된 검색어 항목 처리 로직을 작성
  };

  const handleSearch = () => {
    console.log('Search:', value);
  };

  return (
    <div>
      <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '30px' }}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionSelected}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={(suggestion) => <div>{suggestion}</div>}
          inputProps={{
            value: value,
            onChange: (event, { newValue }) => setValue(newValue),
            style: {
              backgroundColor: 'white',
              border: '3px solid #9bccfb',
              padding: '30px',
              borderRadius: '10px',
              width: '500px',
              marginTop:'60px',
              fontSize: '20px'
            },
          }}
        />
      </div>
      <IconButton
          type="submit"
          sx={{ p: '10px' }}
          aria-label="search"
          size="large"
          style={{
            position: 'absolute',
            top: '110px', 
            marginLeft: '530px', 
          }}
          onClick={handleSearch}
        >
          <SearchIcon fontSize="large" />
        </IconButton>
    </div>
  );
}


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
      setShowFullTable(false);
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
