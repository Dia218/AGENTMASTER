//모의투자거래화면
import './css/SimTrade.css'
import React, { useEffect, useState } from "react";
import StockGraph from "../component/SimTrade/StockGraph";
import StockSimilarCategoryBox from "../component/SimTrade/StockSimilarCategoryBox";
import StockGraphChart from "../component/SimTrade/StockGraphChart";
import StockInvestData from "../component/SimTrade/StockInvestData";
import StockInvestInput from "../component/SimTrade/StockInvestInput";
import Header from '../component/Header';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import io from 'socket.io-client';

const GraphInput = [
    {
        name: 'day 1',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'day 2',
        uv: -3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'day 3',
        uv: -2000,
        pv: -9800,
        amt: 2290,
    },
    {
        name: 'day 4',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'day 5',
        uv: -1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'day 6',
        uv: 2390,
        pv: -3800,
        amt: 2500,
    },
    {
        name: 'day 7',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export default function SimTrade() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keywordFromURL = queryParams.get('keyword');
    const [siCategory,setSiCategory] = useState([]);
    const [stockInvestData,setStockInvestData] = useState([{"stockPrice":9000,"stockRange":"+0.8","stockAmount":12663533,"stockStartPrice":7500,"stockHighPrice":11000,"stockLowPrice":9000,
    "ProfitRate":"-12.3","ProfitLoss":-124000,"PurchasePrice":2342300,"AveragePrice":80000}]);
    const [stockInvestInput,setStockInvestInput] = useState([{"AvailableAsset":12523000,"simulHoldingsnum":0}]);
    const [scList,setScList] = useState([]);

    const getStockInvestData = async () => {
        try {
            //const responseStockInvestData = await axios.get(`http://localhost:8080/simulTrade/stockInvestData?keyword=${keywordFromURL}&userId=${sessionStorage.get("user")}`);
            //setStockInvestData(responseStockInvestData);
            const responseStockInvestData = await stockData();
            setStockInvestData(responseStockInvestData);
        } catch (error) {
            console.error('Error fetching stockInvestData data:', error);
        }
    }

    const getStockInvestInput = async () => {
        try {
            //const responseStockInvestInput = await axios.get(`http://localhost:8080/simulTrade/stockInvestInput?userId=${sessionStorage.get("user")}`);
            //setStockInvestInput(responseStockInvestInput);
            const responseStockInvestInput = await stockInputData();
            setStockInvestInput(responseStockInvestInput);
        } catch (error) {
            console.error('Error fetching stockInvestInput data:', error);
        }
    }

    const getSiCategory = async () => {
        try {
            //const responseSiCategory = await axios.get(`http://localhost:8080/simulTrade/stockInvestInput?userId=${sessionStorage.get("user")}`);
            //setSiCategory(responseSiCategory);
            const responseSiCategory = await siCategoryData();
            setSiCategory(responseSiCategory);
        } catch (error) {
            console.error('Error fetching siCategory data:', error);
        }
    }

    async function stockData() {
        const json = [{"stockPrice":9000,"stockRange":"+0.8","stockAmount":12663533,"stockStartPrice":7500,"stockHighPrice":11000,"stockLowPrice":9000,
        "ProfitRate":"-12.3","ProfitLoss":-124000,"PurchasePrice":2342300,"AveragePrice":80000}];
        
        return json;
    }

    async function stockInputData() {
        const json = [{"AvailableAsset":12523000,"simulHoldingsnum":10}];
        
        return json;
    }

    async function siCategoryData() {
        const json = [{"id":0,name:"카카오",profitloss:"-5000",rates:"-0.06",price:"230000"},{"id":1,name:"넷플릭스",profitloss:"+8000",rates:"+2.09",price:"120000"},
        {"id":2,name:"유튜브",profitloss:"+12000",rates:"+10.18",price:"4500000"}];
        
        return json;
    }

    useEffect(()=>{
        getSiCategory();
        getStockInvestData();
        getStockInvestInput()
    },[]);
    useEffect(()=>{
            setScList(siCategory.map((v) => (
            <StockSimilarCategoryBox key={v.id}
            SimilarStockcode={v.id} SimilarStockname={v.name} SimilarStockPrice={v.price}
            SimilarStockProfitloss={v.profitloss} SimilarStockrates={v.rates}/>)));
    },[siCategory]);

    return (
        <div className="nd_body">
            <header className="mb-4"><Header /></header>
            <div className="StockTradeScene">
                <div className="StockLeft">
                    <div className="StockGraph">
                        <p className='simultradetitle'>{keywordFromURL}</p>
                        <div className="StockGraphChart">
                            <StockGraphChart GraphChartInput={GraphInput}/>
                        </div>
                    </div>
                    <div className="StockSimilarCategory">
                        동일 분야 투자 종목
                    </div>
                    <div className="StockSimilarCategoryGroup">
                        {scList}
                    </div>
                </div>
                <div className="StockRight">
                    <StockInvestData
                        CurrentPrice={stockInvestData[0].stockPrice}
                        DaysRange={stockInvestData[0].stockRange}
                        Volume={stockInvestData[0].stockAmount}
                        OpenPrice={stockInvestData[0].stockStartPrice}
                        HighPrice={stockInvestData[0].stockHighPrice}
                        LowPrice={stockInvestData[0].stockLowPrice}
                        ProfitRate={stockInvestData[0].ProfitRate}
                        ProfitLoss={stockInvestData[0].ProfitLoss}
                        PurchasePrice={stockInvestData[0].PurchasePrice}
                        AveragePrice={stockInvestData[0].AveragePrice}
                    ></StockInvestData>
                    <StockInvestInput
                        AvailableAsset={stockInvestInput[0].AvailableAsset}
                        Amount={stockInvestInput[0].simulHoldingsnum}
                        CurrentPrice={stockInvestData[0].stockPrice}
                        stockName={keywordFromURL}
                        >
                    </StockInvestInput>

                </div>
            </div>
        </div>

    )
}