//모의투자거래화면
import './css/SimTrade.css'
import React, { useEffect, useState } from "react";
import StockGraph from "../component/SimTrade/StockGraph";
import StockSimilarCategoryBox from "../component/SimTrade/StockSimilarCategoryBox";
import StockGraphChart from "../component/SimTrade/StockGraphChart";
import StockInvestData from "../component/SimTrade/StockInvestData";
import StockInvestInput from "../component/SimTrade/StockInvestInput";
import Header from '../component/Header';

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
    const price = "전일비";
    const rates = "현재가";
    const code = "등락률";
    const [siCategory,setSiCategory] = useState([]);
    const [longerThenFour,setLongerThenFour] = useState(false);
    const [scList,setScList] = useState([]);
    useEffect(()=>{
        setSiCategory([{name,price,rates,code},{name,price,rates,code},]);
    },[]);
    useEffect(()=>{
            setScList(siCategory.map((v) => (
            <StockSimilarCategoryBox key={v.name}
            SimilarStockname={v.name} SimilarStockPrice={v.price}
            SimilarStockcode={v.code} SimilarStockrates={v.rates}/>)));
    },[siCategory])
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
                        CurrentPrice={'bruh'}
                        DaysRange='bruh'
                        Volume='bruh'
                        OpenPrice='bruh'
                        HighPrice='bruh'
                        LowPrice='bruh'
                        ProfitRate='bruh'
                        ProfitLoss='bruh'
                        PurchasePrice='bruh'
                        AveragePrice='bruh'
                    ></StockInvestData>
                    <StockInvestInput
                        AvailableAsset='bruh'
                        Amount='bruh'
                        >
                    </StockInvestInput>

                </div>
            </div>
        </div>

    )
}