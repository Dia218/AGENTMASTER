// // import './css/StockGraphChart.css';
// // import {
// //     BarChart,
// //     Bar,
// //     XAxis,
// //     YAxis,
// //     CartesianGrid,
// //     Tooltip,
// //     Legend,
// //     ResponsiveContainer, ReferenceLine,
// // } from "recharts";
// // import React from "react";

// // export default function StockGraphChart({ GraphChartInput }) {
// //     // "stockPrice" 필드만 추출하여 새로운 배열 생성
// //     const stockPrices = GraphChartInput.map(data => data.stockPrice);

// //     return (
// //         <ResponsiveContainer width="100%" height={400}>
// //             <BarChart
// //                 data={stockPrices}
// //                 margin={{
// //                     top: 5,
// //                     right: 30,
// //                     left: 20,
// //                     bottom: 5,
// //                 }}
// //             >
// //                 <CartesianGrid strokeDasharray="3 3"/>
// //                 <XAxis dataKey={stockPrices}/>
// //                 <YAxis/>
// //                 <Tooltip wrapperStyle={{ color: "white" }}/>
// //                 <Legend/>
// //                 <ReferenceLine y={0} stroke="#000"/>
// //                 <Bar dataKey={stockPrices} fill="blue"/>
// //             </BarChart>
// //         </ResponsiveContainer>
// //     );
// // }

// import './css/StockGraphChart.css';
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer, ReferenceLine,
// } from "recharts";
// import React from "react";

// export default function StockGraphChart({GraphChartInput}) {
//     return (
//        <ResponsiveContainer width="100%" height={400}>
//             <BarChart
//                 data={GraphChartInput}
//                 margin={{
//                     top: 5,
//                     right: 30,
//                     left: 20,
//                     bottom: 5,
//                 }}
//             >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="stockDate" />
//                 <YAxis />
//                 <Tooltip wrapperStyle={{ color: "#fff" }} />
//                 <Legend />
//                 <ReferenceLine y={0} stroke="#000" />
//                 <Bar dataKey="stockPrice" fill="blue" />
//             </BarChart>
//         </ResponsiveContainer>
//     );
// }

import './css/StockGraphChart.css';
import axios from 'axios';
import React, { useState, useRef,useEffect} from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import ReactApexChart from 'react-apexcharts';

export default function StockGraphChart({ GraphChartInput }) {
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

const getChart1 = async () => {
  try{
    const queryParams = new URLSearchParams(window.location.search);
    const keywordFromURL = queryParams.get('keyword');
    const getChart1Rep= await axios.get(`http://localhost:8080/ChartData?stockId=${keywordFromURL}`);
    setStockData(getChart1Rep.data.ChartData);
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
        <ReactApexChart options={options} series={seriesData} type="line" height={350} width={700} />
      )}
    </div>
  ); 
}