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


export default function SimTrade() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keywordFromURL = queryParams.get('keyword');
    const [siCategory,setSiCategory] = useState([]);
    const [stockInvestData,setStockInvestData] = useState([{"stockPrice":9000,"stockRange":"+0.8","stockAmount":12663533,"stockStartPrice":7500,"stockHighPrice":11000,"stockLowPrice":9000,
    "simulRange":"-12.3","simulReturn":-124000,"PurchasePrice":2342300,"stockAveragePrice":80000}]);
    const [stockInvestInput,setStockInvestInput] = useState([{"AvailableAsset":12523000,"simulHoldingsnum":0}]);
    const [scList,setScList] = useState([]);

    const [graphInput, setGraphInput] = useState([]);

    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/simulTrade/ChartData?keyword=${keywordFromURL}`);
          const fetchedData = response.data.ChartData;
          setGraphInput(fetchedData);
        } catch (error) {
          console.error('데이터 가져오기 오류:', error);
        }
      };

    const getStockInvestData = async () => {
        try {
            const responseStockInvestData = await axios.get(`http://localhost:8080/simulTrade/stockInvestData?keyword=${keywordFromURL}&userId=${sessionStorage.getItem("user")}`);
            setStockInvestData(responseStockInvestData.StockInfo);
        } catch (error) {
            const responseStockInvestData = await stockData();
            setStockInvestData(responseStockInvestData.StockInfo);
            console.error('Error fetching stockInvestData data:', error);
        }
    }

    const getStockInvestInput = async () => {
        try {
            const responseStockInvestInput = await axios.get(`http://localhost:8080/simulTrade/stockInvestInput?keyword=${keywordFromURL}&userId=${sessionStorage.getItem("user")}`);
            setStockInvestInput(responseStockInvestInput.StockHodingData);
        } catch (error) {
            const responseStockInvestInput = await stockInputData();
            setStockInvestInput(responseStockInvestInput.StockHodingData);
            console.error('Error fetching stockInvestInput data:', error);
        }
    }

    const getSiCategory = async () => {
        try {
            const responseSiCategory = await axios.get(`http://localhost:8080/simulTrade/SiCategory?keyword=${keywordFromURL}`);
            setSiCategory(responseSiCategory.sameFieldStock);
        } catch (error) {
            const responseSiCategory = await siCategoryData();
            setSiCategory(responseSiCategory.sameFieldStock);
            console.error('Error fetching siCategory data:', error);
        }
    }

    async function stockData() {
        const json = {
            "StockInfo": [{"stockPrice":9000,"stockRange":"+0.8","stockAmount":12663533,"stockStartPrice":7500,"stockHighPrice":11000,"stockLowPrice":9000,
            "simulRange":"-12.3","simulReturn":-124000,"PurchasePrice":2342300,"stockAveragePrice":80000}]
        };
        
        return json;
    }

    async function stockInputData() {
        const json = {
            "StockHodingData": [{"AvailableAsset":12523000,"simulHoldingsnum":10}]
        };
        
        return json;
    }

    async function siCategoryData() {
        const json = {
            "sameFieldStock": [{"stockName":"카카오","simulReturn":"-5000","simulRate":"-0.06","stockPrice":"230000"},
            {"stockName":"넷플릭스","simulReturn":"+8000","simulRate":"+2.09","stockPrice":"120000"},
            {"stockName":"유튜브","simulReturn":"+12000","simulRate":"+10.18","stockPrice":"4500000"}]
        };
        
        return json;
    }

    useEffect(()=>{
        getSiCategory();
        getStockInvestData();
        getStockInvestInput();
        fetchData();
    },[]);
    useEffect(()=>{
            setScList(siCategory.map((v) => (
            <StockSimilarCategoryBox key={v.stockName}
            SimilarStockname={v.stockName} SimilarStockPrice={v.stockPrice}
            SimilarStockProfitloss={v.simulReturn} SimilarStockrates={v.simulRate}/>)));
    },[siCategory]);

    return (
        <div className="nd_body">
            <header className="mb-4"><Header /></header>
            <div className="StockTradeScene">
                <div className="StockLeft">
                    <div className="StockGraph">
                        <p className='simultradetitle'>{keywordFromURL}</p>
                        <div className="StockGraphChart">
                        <StockGraphChart GraphChartInput={graphInput} />
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
                        ProfitRate={stockInvestData[0].simulRange}
                        ProfitLoss={stockInvestData[0].simulReturn}
                        PurchasePrice={stockInvestData[0].PurchasePrice}
                        AveragePrice={stockInvestData[0].stockAveragePrice}
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