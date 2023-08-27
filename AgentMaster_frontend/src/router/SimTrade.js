//모의투자거래화면
import './css/SimTrade.css'
import React, { useEffect, useState } from "react";
import StockGraph from "../component/SimTrade/StockGraph";
import StockSimilarCategoryBox from "../component/SimTrade/StockSimilarCategoryBox";
import StockGraphChart from "../component/SimTrade/StockGraphChart";
import StockInvestData from "../component/SimTrade/StockInvestData";
import StockInvestInput from "../component/SimTrade/StockInvestInput";
import Header from '../component/Header';
import { io } from 'socket.io-client';

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
    const name = "종목명";
    const profitloss = "전일비";
    const price = "현재가";
    const rates = "등락률";
    const [siCategory,setSiCategory] = useState([]);
    const [stockInvestData,setStockInvestData] = useState({});
    const [stockInvestInput,setStockInvestInput] = useState({});
    const [scList,setScList] = useState([]);
    useEffect(()=>{
        setSiCategory([{"id":0,name:"카카오",profitloss:"-5000",rates:"-0.06",price:"230000"},{"id":1,name:"넷플릭스",profitloss:"+8000",rates:"+2.09",price:"120000"},
        {"id":2,name:"유튜브",profitloss:"+12000",rates:"+10.18",price:"4500000"}]);
    },[]);
    useEffect(()=>{
            setScList(siCategory.map((v) => (
            <StockSimilarCategoryBox key={v.id}
            SimilarStockcode={v.id} SimilarStockname={v.name} SimilarStockPrice={v.price}
            SimilarStockProfitloss={v.profitloss} SimilarStockrates={v.rates}/>)));
    },[siCategory]);

    const socketIo = io.connect();
    useEffect(()=>{
        socketIo.on();

        setStockInvestData({"CurrentPrice":9000,"DaysRange":"+0.8","Volume":12663533,"OpenPrice":7500,"HighPrice":11000,"LowPrice":9000,
        "ProfitRate":"-12.3","ProfitLoss":-124000,"PurchasePrice":2342300,"AveragePrice":80000});
        setStockInvestInput({"AvailableAsset":12523000,"Amount":0});
    },[])
    return (
        <div className="nd_body">
            <header className="mb-4"><Header /></header>
            <div className="StockTradeScene">
                <div className="StockLeft">
                    <div className="StockGraph">
                        <StockGraph stockName="종목명"/>
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
                        CurrentPrice={stockInvestData.CurrentPrice}
                        DaysRange={stockInvestData.DaysRange}
                        Volume={stockInvestData.Volume}
                        OpenPrice={stockInvestData.OpenPrice}
                        HighPrice={stockInvestData.HighPrice}
                        LowPrice={stockInvestData.LowPrice}
                        ProfitRate={stockInvestData.ProfitRate}
                        ProfitLoss={stockInvestData.ProfitLoss}
                        PurchasePrice={stockInvestData.PurchasePrice}
                        AveragePrice={stockInvestData.AveragePrice}
                    ></StockInvestData>
                    <StockInvestInput
                        AvailableAsset={stockInvestInput.AvailableAsset}
                        Amount={stockInvestInput.Amount}
                        CurrentPrice={stockInvestData.CurrentPrice}
                        setStockInvestInput={setStockInvestInput}
                        >
                    </StockInvestInput>

                </div>
            </div>
        </div>

    )
}