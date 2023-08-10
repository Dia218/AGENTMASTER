import React from 'react';
import './css/StockSimilarCategoryBox.css'

export default function StockSimilarCategoryBox({
                                                    SimilarStockname,
                                                    SimilarStockcode,
                                                    SimilarStockPrice,
                                                    SimilarStockrates,
                                                }) {
    return (
        <div className="StockSimilarCategoryBox">
                <div className="StockSimilarCategoryBoxTitle">
                    {SimilarStockname}
                </div>
                <div className="StockSimilarCategoryBoxBody">
                    -{SimilarStockPrice} ({SimilarStockrates})
                </div>
                <div className="StockSimilarCategoryBoxCode">
                    {SimilarStockcode}
                </div>
        </div>
    );
}
