//모의투자거래화면
import './css/SimTrade.css'
import React from "react";
import StockGraph from "../component/SimTrade/StockGraph";
import StockSimilarCategoryBox from "../component/SimTrade/StockSimilarCategoryBox";
import StockGraphChart from "../component/SimTrade/StockGraphChart";
import StockInvestData from "../component/SimTrade/StockInvestData";
import StockInvestInput from "../component/SimTrade/StockInvestInput";

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
    return (
        <div className="StockTradeScene">
            <div className="StockLeft">
                <div className="StockGraph">
                    <StockGraph stockName="BRUH"/>
                    <div className="StockGraphChart">
                        <StockGraphChart GraphChartInput={GraphInput}/>
                    </div>
                </div>
                <div className="StockSimilarCategory">
                    동일 업종
                </div>
                <div className="StockSimilarCategoryGroup">
                    <StockSimilarCategoryBox
                        SimilarStockname="bruh" SimilarStockPrice="bruh"
                        SimilarStockrates="bruh" SimilarStockcode="bruh"/>
                    <StockSimilarCategoryBox
                        SimilarStockname="bruh" SimilarStockPrice="bruh"
                        SimilarStockrates="bruh" SimilarStockcode="bruh"/>
                    <StockSimilarCategoryBox
                        SimilarStockname="bruh" SimilarStockPrice="bruh"
                        SimilarStockrates="bruh" SimilarStockcode="bruh"/>
                    <StockSimilarCategoryBox
                        SimilarStockname="bruh" SimilarStockPrice="bruh"
                        SimilarStockrates="bruh" SimilarStockcode="bruh"/>
                </div>
            </div>
            <div className="StockRight">
                <StockInvestData
                    PreviousDayPrice='bruh'
                    MarketCapPrice='bruh'
                    DaysHigh='bruh'
                    DaysLow='bruh'
                    WeekHigh='bruh'
                    WeekLow='bruh'
                    PriceEarningsRatio='bruh'
                    DividendYield='bruh'
                    PriceToBook='bruh'
                ></StockInvestData>
                <StockInvestInput
                    AvailableAsset='bruh'
                    Amount='bruh'
                    >
                </StockInvestInput>

            </div>
        </div>

    )
}