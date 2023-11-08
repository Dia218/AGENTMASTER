import React, {useEffect, useState} from 'react';
import './css/StockInvestInput.css';
import { useNavigate } from 'react-router';
import axios from 'axios';

const StockInvestInputSwitch = ({ StockInvestInputSwitchActive, handleToggle, CurrentPrice, stockName, amount}) => {
    const navigate = useNavigate();
    const onClickCancel = () => {
        navigate(`/SimulMain`);
    } 
    const url = "http://localhost:8080/simulTrade/sell";
    const data = {
        'userId':sessionStorage.getItem("user"),
        'stockName':stockName,
        'currentPrice':CurrentPrice,
        'amount':amount
    };
    const config = {"Content-Type": 'application/json'};
    const onClickSA = () => {
        const reset = window.confirm("전체 매도 하시겠습니까?");
        if(reset === true) {
            axios.post(url,data,config)
            .then(function (response) {
                console.log("check to true");
            })
            .catch(function (error) {
                console.error('Error fetching sellAll data:', error);
            });
            //setStockInvestInput({"AvailableAsset":(AvailableAsset+(Amount*CurrentPrice)),"simulHoldingsnum":0});
            alert("전체 매도 되었습니다!");
            console.log(amount);
            navigate(`/SimulMain`);
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
export default function StockInvestInput({AvailableAsset, Amount, CurrentPrice, stockName}) {
    const [SwitchActive, setSwitch] = useState(true);
    const [availableAsset, setAvailableAsset] = useState();
    const [amount, setAmount] = useState();
    const navigate = useNavigate();
    
    const urlSell = "http://localhost:8080/simulTrade/sell";
    const urlBuy = "http://localhost:8080/simulTrade/Buy";
    const dataSell = {
        'userId':sessionStorage.getItem("user"),
        'stockName':stockName,
        'currentPrice':CurrentPrice,
        'amount':amount
    }
    const dataBuy = {
        'userId':sessionStorage.getItem("user"),
        'stockName':stockName,
        'currentPrice':CurrentPrice,
        'amount':amount
    }
    const config = {"Content-Type": 'application/json'};

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
            axios.post(urlBuy,dataBuy,config)
            .then(function (response) {
                console.log("check to true");
            })
            .catch(function (error) {
                console.error('Error fetching buy data:', error);
            });
            //setStockInvestInput({"AvailableAsset":(AvailableAsset-(availableAsset*amount)),"simulHoldingsnum":(Amount+parseInt(amount))});
            alert("선택하신 수량만큼 매수되었습니다.");
            navigate(`/SimulMain`);
        }
    }
    const onClickSell = () => {
        if(Amount<amount){
            alert("현재 보유량 이내에서만 매도가 가능합니다.");
        } else if(parseInt(amount)<1||amount==null||amount==="") {
            alert("매도량을 입력해주세요.");
        } else {
            axios.post(urlSell,dataSell,config)
            .then(function (response) {
                console.log("check to true");
            })
            .catch(function (error) {
                console.error('Error fetching sell data:', error);
            });
            //setStockInvestInput({"AvailableAsset":(AvailableAsset+(amount*CurrentPrice)),"simulHoldingsnum":(Amount-amount)});
            alert("선택하신 수량만큼 매도되었습니다.");
            navigate(`/SimulMain`);
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
                CurrentPrice={CurrentPrice}
                stockName={stockName}
                amount={Amount}
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