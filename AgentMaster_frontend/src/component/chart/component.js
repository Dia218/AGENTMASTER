//주식 상세 페이지
import React, { useState, useRef,useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';
import Autosuggest from 'react-autosuggest';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';

import Modal from 'react-modal';

export function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const socket = socketIOClient('/'); // 소켓 연결

    // 서버로부터 업데이트된 데이터 수신
    socket.on('articles', (data) => {
      setArticles(data);
    });

    // 임시 데이터
    const temporaryData = [
      { id: 1, title: '뉴스 기사 1', summary: '기사 1 요약 문장입니다.' },
      { id: 2, title: '뉴스 기사 2', summary: '기사 2 요약 문장입니다.' },
      { id: 3, title: '뉴스 기사 3', summary: '기사 3 요약 문장입니다.' },
      { id: 4, title: '뉴스 기사 3', summary: '기사 4 요약 문장입니다.' },
      { id: 5, title: '뉴스 기사 3', summary: '기사 5 요약 문장입니다.' },
    ];
    setArticles(temporaryData);

    return () => {
      socket.disconnect(); // 컴포넌트가 언마운트될 때 소켓 연결 해제
    };
  }, []);

  const openModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArticle(null);
    setIsModalOpen(false);
  };

  return (
    <div className="Article">
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {articles.map((article) => (
          <li key={article.id}>
            <p className="article-title" onClick={() => openModal(article)}>{article.title}</p>
            <hr className='article-bottom' />
          </li>
        ))}
      </ul>
      <Modal isOpen={isModalOpen} 
      onRequestClose={closeModal} 
      className="Custom" 
      overlayClassName="CustomOverlay">

  {selectedArticle && (
    <div className='Modal_main'>
      <div className='ModalTop'>
        <p className='ModalMove' onClick={() => window.location.href=`/news/${selectedArticle.id}`}>&lt;- 상세페이지로</p>
        <p className='ModalClose' onClick={closeModal}>X</p>
      </div>
      <h2>{selectedArticle.title}</h2>
      <div className='ModalBox'>
      <p className="ModalText">{selectedArticle.summary}</p>
      </div>
    </div>
  )}
</Modal>
</div>
  
  );
}



export function Table() {
  const data = [
    { id: 1, name: '전일', price: 7730 },
    { id: 2, name: '고가', price: 9630 },
    { id: 3, name: '거래량', price: 39193815 },
    { id: 4, name: '시가', price: 7930 },
    { id: 5, name: '저가', price: 7930 },
    { id: 6, name: '거래대금', price: '349,695백만' },
  ];

  return (
    <div>
      <table className="custom-table">
        <tbody>
          <tr>
            <th className="divider">전일</th>
            <th className="divider">고가</th>
            <th className="divider">거래량</th>
          </tr>
          <tr>
            <td>{data[0].price}</td>
            <td>{data[1].price}</td>
            <td>{data[2].price}</td>
          </tr>
          <tr>
            <th className="divider">시가</th>
            <th className="divider">저가</th>
            <th className="divider">거래대금</th>
          </tr>
          <tr>
            <td>{data[3].price}</td>
            <td>{data[4].price}</td>
            <td>{data[5].price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
//웹소켓  Rechart1()
export function Rechart1() {
  const [data, setData] = useState([]); // JSON 데이터를 저장할 상태 변수

  useEffect(() => {
    // 웹소켓 연결
    const websocket = new WebSocket('ws://your-websocket-url'); // 웹소켓 URL을 여기에 입력

    // 웹소켓으로부터 데이터 수신
    websocket.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      setData(receivedData); // 웹소켓으로 받은 JSON 데이터를 상태 변수에 저장
    };

    // 컴포넌트 언마운트 시 웹소켓 연결 종료
    return () => {
      websocket.close();
    };
  }, []);

  // 데이터가 비어있을 때 로딩 상태 처리
  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <ResponsiveContainer width={650} height={400}>
      <LineChart
        data={data}
        margin={{
          top: 50,
          left: 100,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        {/* 여기서 키워드에 해당하는 데이터 표시 */}
        <Line type="monotone" dataKey="yourKeyword" stroke="#0092F3" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
//임시값을 넣은  Rechart1()
/*export function Rechart1() {
  const location = useLocation();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (location.state) {
      setKeyword(decodeURIComponent(location.state.keyword));
    } else {
      setKeyword('');
    }
  }, [location]);

  const data1 = [
    {
      name: '오전 10:00',
      [keyword]: 4000,
    },
    {
      name: '오전 12:00',
      [keyword]: 3000,
     
    },
    {
      name: '오후 2:00',
      [keyword]: 2000,
      
    },
  ];

  return (
    <ResponsiveContainer width={650} height={400}>
      <LineChart
        data={data1}
        margin={{
          top: 50,
          left: 100,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={keyword} stroke="#0092F3" activeDot={{ r: 8 }} />
        
      </LineChart>
    </ResponsiveContainer>
  );
}
*/
//웹소켓 Rechart2
export function Rechart2({ keywordFromChartMain, keywordFromSearch2 }) {
  const location = useLocation();
  const [data, setData] = useState([]); // JSON 데이터를 저장할 상태 변수

  useEffect(() => {
    // 웹소켓 연결
    const websocket = new WebSocket('ws://your-websocket-url'); 

    // 웹소켓으로부터 데이터 수신
    websocket.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      setData(receivedData); // 웹소켓으로 받은 JSON 데이터를 상태 변수에 저장
    };

    // 컴포넌트 언마운트 시 웹소켓 연결 종료
    return () => {
      websocket.close();
    };
  }, []);

  // 데이터가 비어있을 때 로딩 상태 처리
  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <ResponsiveContainer width={700} height={500}>
      <LineChart
        data={data}
        margin={{
          top: 150,
          left: 150,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={keywordFromChartMain} stroke="#0092F3" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey={keywordFromSearch2} stroke="#008C8C" />
        <Label value={`${keywordFromSearch2} & ${keywordFromChartMain}`} position="top" offset={10} style={{ fill: 'black' }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
//임시값 Rechart2
/*
export function Rechart2({ keywordFromChartMain ,keywordFromSearch2}) {
  const location = useLocation();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (location.state) {
      setKeyword(decodeURIComponent(location.state.keyword));
    } else {
      setKeyword('');
    }
  }, [location]);
  
  const data2 = [
    {
      name: '오전 10:00',
      [keywordFromChartMain]: 2400,
      [keywordFromSearch2]: 4000,
     
    },
    {
      name: '오전 12:00',
      [keywordFromChartMain]: 1398,
      [keywordFromSearch2]: 3000,
     
    },
    {
      name: '오후 2:00',
      [keywordFromChartMain]: 9800,
      [keywordFromSearch2]: 2000,
      
    },
  ];

  useEffect(() => {
    if (location.state) {
     
    }
  }, [location]);

  return (
    <ResponsiveContainer width={700} height={500}>
      <LineChart
        data={data2}
        margin={{
          top: 150,
          left: 150,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={keywordFromChartMain} stroke="#0092F3" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey={keywordFromSearch2} stroke="#008C8C" />
        <Label value={`${keywordFromSearch2} & ${keywordFromChartMain}`} position="top" offset={10} style={{ fill: 'black' }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
*/

export function Search2({ onKeywordChange }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const searchInputRef = useRef(null);
  const resultContainerRef = useRef(null);
  const webSocketRef = useRef(null);

  useEffect(() => {
    webSocketRef.current = new WebSocket('ws:/your-websocket-server-url'); //웹소켓 주소

    webSocketRef.current.onopen = () => {
      console.log('웹소켓 연결이 성립되었습니다.');
    };

    webSocketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSuggestions(data);
      setIsOpen(data.length > 0);
    };

    webSocketRef.current.onclose = () => {
      console.log('웹소켓 연결이 종료되었습니다.');
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, []);

  const sendWebSocketMessage = (message) => {
    if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
      webSocketRef.current.send(JSON.stringify({ query: message }));
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    sendWebSocketMessage(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (resultContainerRef.current && !resultContainerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleSearch = () => {
    console.log('검색어:', value);
    setSearchHistory([...searchHistory, value]);
    onKeywordChange(value); 
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setValue(suggestion);
    setIsOpen(false);
  };

  const renderSuggestion = (suggestion) => {
    return <div>{suggestion}</div>;
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className='ChartDetailSearch'
        ref={resultContainerRef}
        style={{ position: 'absolute', width: '400px', background: '#9bccfb', marginTop: '80px', marginLeft: '250px', zIndex: 1 }}
      >
        {isOpen && (
          <ul className='search-list' style={{ listStyle: 'none', padding: 0 }}>
            {searchHistory.map((searchItem, index) => (
              <li key={index}>{searchItem}</li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionSelected}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={renderSuggestion}
          inputProps={{
            value: value,
            onChange: (event, { newValue }) => setValue(newValue),
            style: {
              backgroundColor: 'white',
              border: '3px solid #9bccfb',
              padding: '10px',
              borderRadius: '5px',
              width: '500px',
              marginLeft: '200px',
              marginTop: '40px',
              height:'50px',
            },
            ref: searchInputRef,
          }}
        />
        <IconButton
          type="submit"
          sx={{ p: '10px' }}
          aria-label="search"
          size="large"
          style={{ marginLeft: '-70px', marginTop: '40px' }}
          onClick={handleSearch}
        >
          <SearchIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}