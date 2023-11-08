import React from 'react';
import './css/StockSimilarCategoryBox.css'
import { useNavigate } from 'react-router';

export default function StockSimilarCategoryBox({
                                                    SimilarStockname,
                                                    SimilarStockProfitloss,
                                                    SimilarStockPrice,
                                                    SimilarStockrates,
                                                }) 
{
    const addComma = (num) => {     //현재가, 전일비 값을 불러올 때 자동으로 3자리 마다 콤마(,)를 붙이는 코드
        let returnString = num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return(returnString)
    } 
    const navigate = useNavigate();
    const onClickTitle = () => {
        navigate(`/simulTrade?keyword=${SimilarStockname}`)
        
        //백엔드's 수정 코드 추가 재호출
        const url = `/simulTrade?keyword=${SimilarStockname}`;
        window.location.href = url;
    }

    return (
        <div className="StockSimilarCategoryBox">
                <div className="StockSimilarCategoryBoxTitle" onClick={onClickTitle}>
                    {SimilarStockname}
                </div>
                {(SimilarStockProfitloss < 0)&&<div className="StockSimilarCategoryBoxBody" style={{color:"#004AAD"}}>▼{addComma(SimilarStockProfitloss)}</div>}
                {(SimilarStockProfitloss > 0)&&<div className="StockSimilarCategoryBoxBody" style={{color:"#FF66C4"}}>▲{addComma(SimilarStockProfitloss)}</div>}
                <div className="StockSimilarCategoryBoxCurrentPrice">
                    ({"현재가: "}{addComma(SimilarStockPrice)})
                </div>
                {(SimilarStockProfitloss < 0)&&<div className="StockSimilarCategoryBoxCode" style={{color:"#004AAD"}}>{SimilarStockrates}%</div>}
                {(SimilarStockProfitloss > 0)&&<div className="StockSimilarCategoryBoxCode" style={{color:"#FF66C4"}}>{SimilarStockrates}%</div>}
        </div>
    );
}
