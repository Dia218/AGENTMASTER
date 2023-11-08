import React from 'react';
import './css/StockInvestData.css'

export default function StockInvestData({
                                            CurrentPrice,
                                            DaysRange,
                                            Volume,
                                            OpenPrice,
                                            HighPrice,
                                            LowPrice,
                                            ProfitRate,
                                            ProfitLoss,
                                            PurchasePrice,
                                            AveragePrice
                                        }
) {
    const addComma = (num) => {     //현재가, 전일비 값을 불러올 때 자동으로 3자리 마다 콤마(,)를 붙이는 코드
        let returnString = num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return(returnString)
    } 

    return (
        <div className="StockInvestDataHeader row">
            <div className='StockInvestDataTop'>
                <div className='row'>
                    <div className='col-4 StockInvestDataTop_Header CP'>
                        현재가
                    </div>
                    <div className='col-4 StockInvestDataTop_Header DR'>
                        등락률
                    </div>
                    <div className='col-4 StockInvestDataTop_Header VOL'>
                        거래량
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4 StockInvestDataTop_body CP'>
                        {addComma(CurrentPrice)}
                    </div>
                    <div className='col-4 StockInvestDataTop_body DR'>
                        {DaysRange}%
                    </div>
                    <div className='col-4 StockInvestDataTop_body VOL'>
                        {addComma(Volume)}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4 StockInvestDataTop_Header OP'>
                        시가
                    </div>
                    <div className='col-4 StockInvestDataTop_Header HP'>
                        고가
                    </div>
                    <div className='col-4 StockInvestDataTop_Header LP'>
                        저가
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4 StockInvestDataTop_body OP'>
                        {addComma(OpenPrice)} 
                    </div>
                    <div className='col-4 StockInvestDataTop_body HP'>
                        {addComma(HighPrice)}
                    </div>
                    <div className='col-4 StockInvestDataTop_body LP'>
                        {addComma(LowPrice)}
                    </div>
                </div>
            </div>
            <div className='StockInvestDataBottom'>
                <div className='row'>
                    <div className='StockInvestDataBottom_Left col-4'>
                        <div className='PR_H'>
                            손익률
                        </div>
                        <div className='PR_B'>
                            {ProfitRate}%
                        </div>
                    </div>
                    <div className='StockInvestDataBottom_Right col-7'>
                        <div className='row'>
                            <div className='col-6 StockInvestDataBottom_Right_Header PL'>
                                손익
                            </div>
                            <div className='col-6 StockInvestDataBottom_Right_Body PL'>
                                {addComma(ProfitLoss)}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6 StockInvestDataBottom_Right_Header PP'>
                                매입금액
                            </div>
                            <div className='col-6 StockInvestDataBottom_Right_Body PP'>
                                {addComma(PurchasePrice)}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6 StockInvestDataBottom_Right_Header AP'>
                                평균단가
                            </div>
                            <div className='col-6 StockInvestDataBottom_Right_Body AP'>
                                {addComma(AveragePrice)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}