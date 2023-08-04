import React, {useState} from 'react';
import './css/StockInvestInput.css';

const StockInvestInputSwitch = ({ StockInvestInputSwitchActive, handleToggle }) => {
    return (
        <>
            <input
                checked={StockInvestInputSwitchActive}
                onChange={handleToggle}
                className="StockInvestInputCheckbox"
                id={`Price`}
                type="checkbox"
            />
            <label
                className="StockInvestInputLable"
                htmlFor={`Price`}
            >
                매수
                <span className={`react-switch-button`}/>
                매도
            </label>
        </>
    );
};
export default function StockInvestInput({AvailableAsset, Amount}) {
    const [SwitchActive, setSwitch] = useState(false);

    return (
        <div className="StockInvestInput">
            <StockInvestInputSwitch
                StockInvestInputSwitchActive= {SwitchActive}
                handleToggle={()=>setSwitch(!SwitchActive)}
            />
            <div className="StockInvestInputData">
                <div>
                    가용 자산: {AvailableAsset}
                </div>
                <div>
                    보유량: {Amount}
                </div>

            </div>
            <div className="StockInvestInputLower">
                <div className="StockInvestInputBox">
                    <div>
                        가격:
                        < div className="StockInvestInputPrice">
                            <input/>
                        </div>
                    </div>
                    <div>
                        매수량:
                        <div className="StockInvestInputAmount">
                            <input/>
                        </div>
                    </div>
                </div>

                {SwitchActive && (
                    <div className="StockInvestInputButton">
                        매수
                    </div>
                )}
                {!SwitchActive && (
                    <div className="StockInvestInputButton">
                        매도
                    </div>
                )}
            </div>
        </div>
    );
}
;