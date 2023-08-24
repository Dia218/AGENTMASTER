import React from 'react';
import './css/StockGraph.css';

export default function StockGraph({stockName}) {

    return (
        <div className='StockGraphHeader'>
            <h3 className='StockGraphTitle'>
                {stockName}
            </h3>
            <div className='StockGraphSeperationLine'>

            </div>
        </div>
    );
}
