//차트 새페이지

import React, { useState, useEffect } from 'react';
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

export function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const socket = socketIOClient('/'); // 소켓 연결

    // 서버로부터 업데이트된 데이터 수신
    socket.on('articles', (data) => {
      setArticles(data);
    });

    // 임시 데이터
    const temporaryData = [
      { id: 1, title: '기사 1' },
      { id: 2, title: '기사 2' },
      { id: 3, title: '기사 3' },
    ];
    setArticles(temporaryData);

    return () => {
      socket.disconnect(); // 컴포넌트가 언마운트될 때 소켓 연결 해제
    };
  }, []);

  return (
    <div className="Article">
      <ul>
        {articles.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
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
  const rows = [];
  for (let i = 0; i < data.length; i += 3) {
    rows.push(
      <tr key={i}>
        {data.slice(i, i + 3).map((item, index) => (
          <React.Fragment key={item.id}>
            <td>{item.name}</td>
            <td>{item.price}</td>
          </React.Fragment>
        ))}
      </tr>
    );
  }

  return (
    <div className="table-container">
      <table className="custom-table">
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export function Rechart1() {
  const data = [
    {
      name: '오전 10:00',
      백광산업: 4000,
      amt: 2400,
    },
    {
      name: '오전 12:00',
      백광산업: 3000,
      amt: 2210,
    },
    {
      name: '오후 2:00',
      백광산업: 2000,
      amt: 2290,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 65,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="백광산업"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Label
          value="백광산업"
          position="top"
          offset={10}
          style={{ fill: 'black' }}
        />
        {data.map((entry, index) => (
          <text
            key={`label-${index}`}
            x={90} // x 위치 조정
            y={40} // y 위치 조정
            textAnchor="middle"
            fill="black"
            style={{ fontSize: 20 }}
          >
            백광산업
          </text>
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function Rechart2() {
  const data = [
    {
      name: '오전 10:00',
      백광산업: 4000,
      LX인터내셔널: 2400,
      amt: 2400,
    },
    {
      name: '오전 12:00',
      백광산업: 3000,
      LX인터내셔널: 1398,
      amt: 2210,
    },
    {
      name: '오후 2:00',
      백광산업: 2000,
      LX인터내셔널: 9800,
      amt: 2290,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 65,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="백광산업"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="LX인터내셔널" stroke="#82ca9d" />
        <Label
          value="백광산업"
          position="top"
          offset={10}
          style={{ fill: 'black' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function Search2() {
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

  const renderSuggestion = (suggestion) => {
    return <div>{suggestion}</div>;
  };

  const handleSearch = () => {
    console.log('Search:', value);
  };

  return (
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
            width: '200px',
            marginLeft: '70px',
            marginTop: '20px',
          },
        }}
      />
      <IconButton
        type="submit"
        sx={{ p: '10px' }}
        aria-label="search"
        size="large"
        style={{ marginLeft: '-50px', marginTop: '20px' }} // 아이콘의 위치를 조정
        onClick={handleSearch} // 검색 버튼 클릭 시 handleSearch 함수 호출
      >
        <SearchIcon fontSize="large" />
      </IconButton>
    </div>
  );
}