import React, {useEffect, useState} from 'react';
import './css/StockInvestInput.css';
import { useNavigate } from 'react-router';

const StockInvestInputSwitch = ({ StockInvestInputSwitchActive, handleToggle, setStockInvestInput, AvailableAsset, Amount, CurrentPrice}) => {
    const navigate = useNavigate();
    const onClickCancel = () => {
        navigate(`/SimulMain`);
    } 
    const onClickSA = () => {
        const reset = window.confirm("전체 매도 하시겠습니까?");
        if(reset === true) {
            setStockInvestInput({"AvailableAsset":(AvailableAsset+(Amount*CurrentPrice)),"Amount":0});
        }
    }
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
            <button className='cancel' onClick={onClickCancel}>취소</button>
            <button className='sellAll' onClick={onClickSA}>전체 매도</button>
        </div>
    );
};
export default function StockInvestInput({AvailableAsset, Amount, CurrentPrice, setStockInvestInput}) {
    const [SwitchActive, setSwitch] = useState(true);
    const [availableAsset, setAvailableAsset] = useState();
    const [amount, setAmount] = useState();

    const handleAA = (e) => {
        setAvailableAsset(e.target.value);
    }
    const handleAmount = (e) => {
        setAmount(e.target.value);
    }
    const onClickBuy = () => {
        if(AvailableAsset<(availableAsset*amount)){
            alert("가용 자산이 부족합니다!");
        } else if(availableAsset<CurrentPrice) {
            alert("현재가 이하로는 매수할 수 없습니다.");
        } else if(parseInt(amount)<1||amount==null||amount==="") {
            alert("매수량을 입력해주세요.");
        } else {
            setStockInvestInput({"AvailableAsset":(AvailableAsset-(availableAsset*amount)),"Amount":(Amount+parseInt(amount))});
        }
    }
    const onClickSell = () => {
        if(Amount<amount){
            alert("현재 보유량 이내에서만 매도가 가능합니다.");
        } else if(parseInt(amount)<1||amount==null||amount==="") {
            alert("매도량을 입력해주세요.");
        } else {
            setStockInvestInput({"AvailableAsset":(AvailableAsset+(amount*CurrentPrice)),"Amount":(Amount-amount)});
        }
    }

    const addComma = (num) => {     //현재가, 전일비 값을 불러올 때 자동으로 3자리 마다 콤마(,)를 붙이는 코드
        let returnString = num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return(returnString)
    } 

    useEffect(()=>{
        if(!SwitchActive) {
            setAvailableAsset(CurrentPrice);
        } else {
            setAvailableAsset(null);
        }
    },[SwitchActive]);

    return (
        <div className="StockInvestInput">
            <StockInvestInputSwitch
                StockInvestInputSwitchActive= {SwitchActive}
                handleToggle={()=>setSwitch(!SwitchActive)}
                setStockInvestInput={setStockInvestInput}
                AvailableAsset={AvailableAsset}
                Amount={Amount}
                CurrentPrice={CurrentPrice}
            />
            <div className="StockInvestInputData">
                <div>
                    가용 자산: {addComma(AvailableAsset)}
                </div>
                <div>
                    보유량: {addComma(Amount)}
                </div>

            </div>
            <div className="StockInvestInputLower">
                <div className="StockInvestInputBox">
                    <div>
                        가격:
                        < div className="StockInvestInputPrice">
                            <input className='StockInvestInputPriceBox' placeholder={CurrentPrice} value={availableAsset||''} onChange={handleAA} disabled={SwitchActive==false}/> 원
                        </div>
                    </div>
                    <div>
                        {SwitchActive?"매수량:":"매도량:"}
                        <div className="StockInvestInputAmount">
                        <input className='StockInvestInputAmountBox' placeholder={1} value={amount||''} onChange={handleAmount}/> 주
                        </div>
                    </div>
                </div>

                {SwitchActive && (
                    <div className="StockInvestInputButton_buy" onClick={onClickBuy}>
                        <div className='StockInvestInputButton_buyText'>매수</div>
                    </div>
                )}
                {!SwitchActive && (
                    <div className="StockInvestInputButton_sell" onClick={onClickSell}>
                        <div className='StockInvestInputButton_sellText'>매도</div>
                    </div>
                )}
            </div>
        </div>
    );
}
;