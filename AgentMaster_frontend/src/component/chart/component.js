//주식 상세 페이지
import React, { useState, useRef,useEffect} from 'react';
import socketIOClient from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import ReactApexChart from 'react-apexcharts';

import { useNavigate } from 'react-router-dom';


export function ArticleList() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState([]); // 초기값 빈 배열로 설정
  const [isSearchVisible, setIsSearchVisible] = useState(true);

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
      { id: 4, title: '뉴스 기사 4', summary: '기사 4 요약 문장입니다.' },
    ];
    setArticles(temporaryData);

    return () => {
      socket.disconnect(); // 컴포넌트가 언마운트될 때 소켓 연결 해제
    };
  }, []);

  const openModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
    setIsSearchVisible(false); // 모달 열 때 검색창 숨김
  };

  const closeModal = () => {
    setSelectedArticle(null);
    setIsModalOpen(false);
    setIsSearchVisible(true); // 모달 닫을 때 검색창 보이게 설정
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/NewsDetail`, { state: selectedArticle });
  };

  return (
    <div className="Article">
      <ul style={{ listStyle: 'none', padding: 10 }}>
        {articles.map((article) => (
          <li key={article.id}>
            <p className="article-title" onClick={() => openModal(article)}>
              {article.title}
            </p>
            <hr className="article-bottom" />
          </li>
        ))}
      </ul>
       <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="Custom"
        overlayClassName="CustomOverlay"
      >
        {selectedArticle && (
          <div className="Modal_main">
            <div className="ModalTop">
              <p className="ModalMove" onClick={handleClick}>
                &lt;- 상세페이지로
              </p>
              <p className="ModalClose" onClick={closeModal}>
                X
              </p>
            </div>
            <h2>{selectedArticle.title}</h2>
            <div className="ModalBox">
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
  const stockData = [
    {
      "stockId": "stockId1",
      "stockName": "name1",
      "stockField": "field",
      "stockDate": "2023-08-10",
      "stockPrice": 11000,
      "stockDiff": 1000,
      "stockRange": 5.0
    },
    {
      "stockId": "stockId1",
      "stockName": "name1",
      "stockField": "field",
      "stockDate": "2023-08-11",
      "stockPrice": 12000,
      "stockDiff": 1000,
      "stockRange": 5.0
    },
    // ... 기타 데이터 항목 ...
    {
      "stockId": "stockId1",
      "stockName": "name1",
      "stockField": "field",
      "stockDate": "2023-08-19",
      "stockPrice": 20000,
      "stockDiff": 1000,
      "stockRange": 5.0
    }
  ];

  const seriesData = [{
    name: "종목가",
    data: stockData.map(item => ({
      x: new Date(item.stockDate).getTime(),
      y: item.stockPrice,
      stockDiff: item.stockDiff,
      stockRange: item.stockRange
    }))
  }];

  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      title: {
        text: '가격'
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      },
      y: {
        title: {
          formatter: (val) => val 
        }
      },
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const item = stockData[dataPointIndex];
        if (item && item.stockDiff !== undefined && item.stockRange !== undefined) {
          return (
            `<div class="custom-tooltip">
              <span>종목가: ${item.stockPrice}</span><br>
              <span>전일대비: ${item.stockDiff}</span><br>
              <span>등락률: ${item.stockRange}%</span>
            </div>`
          );
        }
        return '';
      }
    }
  };

  return (
    <div className='Rechart1'>
      <ReactApexChart options={options} series={seriesData} type="line" height={350} />
    </div>
  );
}

export function Rechart2({ keywordFromChartMain ,keywordFromSearch2}) {
  const location = useLocation();
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');


  useEffect(() => {
    if (location.state) {
      setKeyword(decodeURIComponent(location.state.keyword));
    } else {
      setKeyword('');
    }
  }, [location]);

  useEffect(() => {
    setSearchKeyword(keywordFromSearch2); // 검색어 변경 시 상태 업데이트
  }, [keywordFromSearch2]);



  const seriesData = [
    {
      name: [keywordFromChartMain],
      data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8],
    },
  ];

  if (keywordFromSearch2 === '카카오') {
    seriesData.push({
      name: [keywordFromSearch2],
      data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51],
    });
  }

  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [5, 7, 5],
      curve: 'straight',
      dashArray: [0, 8, 5]
    },
    legend: {
      tooltipHoverFormatter: function(val, opts) {
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
      }
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6
      }
    },
    xaxis: {
      categories: ['08-10', '08-11', '08-12', '08-13', '08-14', '08-15', '08-16', '08-17', '08-18',
        '08-19'
      ],
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val + " 종목가"
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val + " 종목가"
            }
          }
        },
      ]
    },
    grid: {
      borderColor: '#D5D5D5',
    }
  };

  return (
    <div className="Rechart2">
      
        <ReactApexChart options={options} series={seriesData} type="line" height={400} />
  
    </div>
  );
  }
