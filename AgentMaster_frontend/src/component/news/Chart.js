//주식 차트를 출력하는 컴포넌트.
//props로 데이터를 넘겨받으면 해당 데이터로 테이블을 작성한다.

import { useEffect, useState } from 'react';
import './css/Chart.css';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom/dist";
import axios from 'axios';

function Chart() {

    //주식 데이터를 담을 useState 훅
    const [stockData, setStockData] = useState([]);

    //GET함수를 이용해 백엔드에 메인페이지 주식 데이터 4개를 요청하고 state에 저장하는 함수.
    const getStock_Main = async () => {
        try {
            const responseStock_Main = await axios.get('http://localhost:8080/newsMain/stockChart');
            setStockData(responseStock_Main.FluctuationStockInfo);
        } catch (error) {
            const responseStock_Main = await data();
            setStockData(responseStock_Main.FluctuationStockInfo);
            console.error('Error fetching chart data:', error);
        }
    };

    //임시 주식차트 데이터 반환 함수
    async function data() {
        const json = {
            "FluctuationStockInfo" : [{ stockId:"stock1", stockName: "카나리아 바이오 주식회사", stockPrice: 1000, diffFromPrevday: +100, range: +25.00 },
                { stockId:"stock2", stockName: "종목2", stockPrice: 1294, diffFromPrevday: -250, range: -9.00 },
                { stockId:"stock3", stockName: "종목3", stockPrice: 3021, diffFromPrevday: +250, range: +12.34 },
                { stockId:"stock4", stockName: "종목4", stockPrice: 23400, diffFromPrevday: -330, range: -12.78 },
            ]
        };
        
        return json;
    }


    const addComma = (num) => {     //현재가, 전일비 값을 불러올 때 자동으로 3자리 마다 콤마(,)를 붙이는 코드
        let returnString = num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return(returnString)
    } 

    useEffect(()=>{
        getStock_Main();
    },[])

    return (
        
            <div className="newsMain_chart">
                <table className="newsMain_table">
                    <thead>
                        <tr className="newsMain_chart_title">
                            <th className='newsMain_chart_titlehead_name'>종목명</th>
                            <th className='newsMain_chart_titlehead'>현재가</th>
                            <th className='newsMain_chart_titlehead'>전일비</th>
                            <th className='newsMain_chart_titlehead'>등락률</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockData.map((data, index) => (
                            <tr className="newsMain_chart_row" key={index + 1}>
                            <td className='newsMain_chart_rowdata'>
                                <Link className="newsMain_chart_a" to={"/chartDetail?keyword="+ data.stockName}>
                                {data.stockName}
                                </Link>
                            </td>
                            <td className='newsMain_chart_rowdata'>{addComma(data.stockPrice)}</td>
                            <td className='newsMain_chart_rowdata'>{data.diffFromPrevday<0?addComma(data.diffFromPrevday):"+"+addComma(data.diffFromPrevday)}</td>
                            <td className='newsMain_chart_rowdata'>{data.range<0?data.range:"+"+data.range}%</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        
    );
  }
  
  export default Chart;