import React, {useState} from 'react';
import './css/StockInvestInput.css';

const StockInvestInputSwitch = ({ StockInvestInputSwitchActive, handleToggle }) => {
    return (
        <div className=''>
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
                <div className='StockInvestInputLable_buy'>매수</div>
                <span className={`react-switch-button`}/>
                <div className='StockInvestInputLable_sell'>매도</div>
            </label>
            <button className='cancel'>취소</button>
            <button className='sellAll'>전체 매도</button>
        </div>
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
                            <input className='StockInvestInputPriceBox' placeholder='1000'/> 원
                        </div>
                    </div>
                    <div>
                        매수량:
                        <div className="StockInvestInputAmount">
                        <input className='StockInvestInputAmountBox' placeholder='1'/> 주
                        </div>
                    </div>
                </div>

                {SwitchActive && (
                    <div className="StockInvestInputButton_buy">
                        <div className='StockInvestInputButton_buyText'>매수</div>
                    </div>
                )}
                {!SwitchActive && (
                    <div className="StockInvestInputButton_sell">
                        <div className='StockInvestInputButton_sellText'>매도</div>
                    </div>
                )}
            </div>
        </div>
    );
}
;