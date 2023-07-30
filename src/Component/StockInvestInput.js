import React from 'react';
import './css/StockInvestInput.css';

export default function StockInvestInput() {
    return (
        <div className="StockInvestInput">
            <div className="toggle-switch">
                <input
                    type="checkbox"
                    className="toggle-switch-checkbox"
                    name="toggleSwitch"
                    id="toggleSwitch"
                />
                <label className="toggle-switch-label" htmlFor="toggleSwitch">
                    <span className="toggle-switch-inner" />
                    <span className="toggle-switch-switch" />
                </label>
            </div>
            <div className="StockInvestInputData">
                <div>
                    가용 자산: -
                </div>
                <div>
                    보유량: -
                </div>

            </div>
            < div className="StockInvestInputField">
                <div>
                    가격:<input/>
                </div>
                <div>
                    매수량:<input/>
                </div>
            </div>
            <div className="StockInvestInputButton">
                <button>매수</button>
            </div>
        </div>
    );
}
;