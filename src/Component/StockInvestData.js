import React from 'react';
import './css/StockInvestData.css'

export default function StockInvestData({
                                            PreviousDayPrice,
                                            MarketCapPrice,
                                            DaysHigh,
                                            DaysLow,
                                            WeekHigh,
                                            WeekLow,
                                            PriceEarningsRatio,
                                            DividendYield,
                                            PriceToBook
                                        }
) {
    return (
        <div className="StockInvestDataHeader">
            <div className="StockInvestDataLeft">
                <div className="PDP">
                    전일 종가:
                    <div>
                        {PreviousDayPrice}
                    </div>
                </div>
                <div className="DL">
                    일일 최저가:
                    <div>
                        {DaysLow}
                    </div>
                </div>
                <div className="WL">
                    52주 최저가:
                    <div>
                        {WeekLow}
                    </div>
                </div>
                <div className="PER">
                    주가 수익률:
                    <div>
                        {PriceEarningsRatio}
                    </div>
                </div>
                <div className="PTB">
                    주당순자산비율:
                    <div>
                        {PriceToBook}
                    </div>
                </div>
            </div>
            <div className="StockInvestDataRight">
                <div className="MCP">
                    시가 총액:
                    <div>
                        {MarketCapPrice}
                    </div>
                </div>
                <div className="DH">
                    일일 최고가:
                    <div>
                        {DaysHigh}
                    </div>
                </div>
                <div className="WH">
                    52주 최고가:
                    <div>
                        {WeekHigh}
                    </div>
                </div>
                <div className="DY">
                    배당 수익률:
                    <div>
                        {DividendYield}
                    </div>
                </div>
            </div>
        </div>
    );
}