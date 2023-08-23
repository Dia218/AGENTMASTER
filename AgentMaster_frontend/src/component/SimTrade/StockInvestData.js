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
                        9,000
                    </div>
                    <div className='col-4 StockInvestDataTop_body DR'>
                        +0.8%
                    </div>
                    <div className='col-4 StockInvestDataTop_body VOL'>
                        21,212,222
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
                        7,500 
                    </div>
                    <div className='col-4 StockInvestDataTop_body HP'>
                        11,000
                    </div>
                    <div className='col-4 StockInvestDataTop_body LP'>
                        7,000
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
                            -12.3%
                        </div>
                    </div>
                    <div className='StockInvestDataBottom_Right col-7'>
                        <div className='row'>
                            <div className='col-6 StockInvestDataBottom_Right_Header PL'>
                                손익
                            </div>
                            <div className='col-6 StockInvestDataBottom_Right_Body PL'>
                                +241,222
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6 StockInvestDataBottom_Right_Header PP'>
                                매입금액
                            </div>
                            <div className='col-6 StockInvestDataBottom_Right_Body PP'>
                                88,895,236,754
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6 StockInvestDataBottom_Right_Header AP'>
                                평균단가
                            </div>
                            <div className='col-6 StockInvestDataBottom_Right_Body AP'>
                                80,000
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}