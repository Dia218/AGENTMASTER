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
                    {PreviousDayPrice}
                </div>
                <div className="DL">
                    일일 최저가:
                    {DaysLow}
                </div>
                <div className="WL">
                    52주 최저가:
                    {WeekLow}
                </div>
                <div className="PER">
                    주가 수익률:
                    {PriceEarningsRatio}
                </div>
                <div className="PTB">
                    주당순자산비율:
                    {PriceToBook}
                </div>
            </div>
            <div className="StockInvestDataright">
                <div className="MCP">
                    시가 총액:
                    {MarketCapPrice}
                </div>
                <div className="MCP">
                    일일 최고가:
                    {DaysHigh}
                </div>
                <div className="MCP">
                    52주 최고가:
                    {WeekHigh}
                </div>
                <div className="MCP">
                    배당 수익률:
                    {DividendYield}
                </div>
            </div>
        </div>
    );
}