//주식 상세 페이지
import React, { useState, useRef,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import ReactApexChart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';

//그래프 아래 관련 뉴스 띄우는 부분
export function ArticleList() {
  const [selectedArticle, setSelectedArticle] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState([
    { id: 1, publisher: '신문사1', title: '뉴스 기사 1', summary: '기사 1 요약 문장입니다.' },
    { id: 2, publisher: '신문사2', title: '뉴스 기사 2', summary: '기사 2 요약 문장입니다.' },
    { id: 3, publisher: '신문사3', title: '뉴스 기사 3', summary: '기사 3 요약 문장입니다.' },
    { id: 4, publisher: '신문사4', title: '뉴스 기사 4', summary: '기사 4 요약 문장입니다.' },
    { id: 5, publisher: '신문사5', title: '뉴스 기사 4', summary: '기사 4 요약 문장입니다.' },
  ]); // 초기값 빈 배열로 설정
  const [loading, setLoading] = useState(true);

  const getArticle=async () =>{
   try{
    const getArticleRep= await axios.get('localhost:8080/article?stockCode=${selectedArticle.stockCode}');
    setArticles(getArticleRep.data.articles);
    setLoading(false); // 로딩 완료
   }catch (error) {
    setLoading(false);
  }
  } 
  useEffect(() => {
    getArticle();
  }, []); // 빈 배열을 전달하여 한 번만 데이터를 가져오도록 설정

  const openModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArticle(null);
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/NewsDetail`, { state: selectedArticle });
  };

  return (
    <div className="Article">
      {loading ? (
        <div className="loading_main">
          <LoadingOutlined />loading...
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 10 }}>
          {articles.map((article) => (
            <li key={article.articleId}>
              <p className="article-title" onClick={() => openModal(article)}>
                {`[${article.publisher}]  ${article.title}`}
              </p>
              <hr className="article-bottom" />
            </li>
          ))}
        </ul>
      )}
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
            {selectedArticle.articleContent ? (
              <div className="ModalBox">
                <p className="ModalText">{selectedArticle.summary}</p>
              </div>
            ) : (
              <div className="ModalBox">
                <p className="ModalText">기사 내용이 없습니다.</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
   }  

export function Table() {
  const [data, setData] = useState([{"stockDiff":'-',"stockStartPrice":'-',"stockhighPrice":'-',"stocklowPrice":'-',
  "stockTradingAmount":'-',"stockTradingTotalPrice":'-',
  }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Axios를 사용하여 데이터를 백엔드에서 요청
    axios.get('http://localhost:8080/stockData?stockCode=${stockCode}') //url 임시 설정
      .then((response) => {
        // 요청이 성공하면 데이터 업데이트
        setData(response.data);
        setLoading(false); // 로딩 완료
      })
      .catch((err) => {
        // 요청이 실패하면 에러 처리
        setError(err);
        setLoading(false); // 로딩 완료
      });
  }, []);

  return (
    <div>
      <table className="custom-table">
        <tbody>
          <tr>
            <th className="divider">전일비</th>
            <th className="divider">시가</th>
            <th className="divider">금일 최고가</th>
          </tr>
          <tr>
            <td>{data[0].stockDiff}</td>
            <td>{data[0].stockStartPrice}</td>
            <td>{data[0].stockhighPrice}</td>
          </tr>
          <tr>
            <th className="divider">금일 최저가</th>
            <th className="divider">거래량</th>
            <th className="divider">거래대금</th>
          </tr>
          <tr>
            <td>{data[0].stocklowPrice}</td>
            <td>{data[0].stockTradingAmount}</td>
            <td>{data[0].stockTradingTotalPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


export function Rechart1() {
const [stockData, setStockData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const getChart1 = async () => {
  try{
    const queryParams = new URLSearchParams(window.location.search);
    const keywordFromURL = queryParams.get('keyword');
    const getChart1Rep= await axios.get('http://localhost:8080/ChartData?stockId=${keywordFromURL}');
    setStockData(getChart1Rep.data);
    setLoading(false);
  }catch(error) {
    setLoading(false);
  }
}
useEffect(() => {
 getChart1();
}, []);

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
      {loading ? (
        <div className='loading_main'><LoadingOutlined />loading...</div>
      ) : (
        <ReactApexChart options={options} series={seriesData} type="line" height={350} />
      )}
    </div>
  );  
}

export function Rechart2({ keywordFromChartMain, keywordFromSearch2 }) {
  const location = useLocation();
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [chartData, setChartData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [date, setDate] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state) {
      setKeyword(decodeURIComponent(location.state.keyword));
    } else {
      setKeyword('');
    }
  }, [location]);

  useEffect(() => {
    setSearchKeyword(keywordFromSearch2);
  }, [keywordFromSearch2]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/ChartData?stockId=${keywordFromChartMain}`)
      .then((response) => {
        setChartData(response.data);
        updateXAxisCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching chart data:', error);
        setLoading(false);
      });

    axios
      .get(`http://localhost:8080/ChartData?stockId=${keywordFromSearch2}`)
      .then((response) => {
        setSearchData(response.data);
        updateXAxisCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching search data:', error);
        setLoading(false);
      });
  }, [keywordFromChartMain, keywordFromSearch2]);

  const updateXAxisCategories = (data) => {
    const uniqueDates = [...new Set(data.map((item) => item.stockDate))];
    setDate(uniqueDates); 
  };

  const seriesData = [
    {
      name: [keywordFromChartMain],
      data: chartData.map((data) => data.stockPrice),
    },
  ];

  if (searchData.length > 0) {
    seriesData.push({
      name: [keywordFromSearch2],
      data: searchData.map((data) => data.stockPrice),
    });
  }

  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [5, 7, 5],
      curve: 'straight',
      dashArray: [0, 8, 5],
    },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
       let legendText = val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex];
        
        if (opts.seriesIndex === 0) {
          legendText += ` (${keywordFromChartMain})`;
        } else if (opts.seriesIndex === 1) {
          legendText += ` (${keywordFromSearch2})`;
        }
  
        return legendText;
      },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: date, 
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val + ' 종목가';
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val + ' 종목가';
            },
          },
        },
      ],
    },
    grid: {
      borderColor: '#D5D5D5',
    },
  };

  return (
    <div className="Rechart2">
      {loading ? (
        <div className='loading_main'><LoadingOutlined />loading...</div>
      ) : (
        <ReactApexChart options={options} series={seriesData} type="line" height={400} />
      )}
    </div>
  );
  
}
