//모의투자 메인화면에서 거래 상위 종목의 내용을 나타내는 곳입니다.

import "./css/Main_body.css";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Main_body() {
    
    const [bodyList, setBodyList] = useState([]);   //api로 불러온 json 형식 데이터를 저장하는 배열
    const getBodyList = async () => {
        const json = await (    //api에 데이터 불러오는 코드
            await fetch("https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=3lxB%2F1OXwuo7FgMdLkt0cG6kMEVKc1fHITjq6%2F5aAF5wYK5UQbaKvl7JxcXkdZnLL6ao2N2U6NbUpMKXRA8NqQ%3D%3D&resultType=json&beginFltRt=20")
        ).json();
        setBodyList(json.response.body.items.item);
        //console.log("거래 상위 불러오기 완료.");
    };
    useEffect(() => {               //상위 종목 값을 불러오는 코드
        getBodyList();
    }, []);

    const onClick = (e) => {        //클릭 리스너
        //console.log(e.currentTarget.id + "번 모의투자 화면으로 이동.");
    }

    const addComma = (num) => {     //현재가, 전일비 값을 불러올 때 자동으로 3자리 마다 콤마(,)를 붙이는 코드
        let returnString = num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return(returnString)
    } 

    return(
        <div className="simulMainBody">
            <ul>
                {bodyList.map((stock) => (
                    <li className="simulMainBody_li" key={stock.srtnCd}>
                    <div className="simulMainBody_div" id={stock.srtnCd} onClick={onClick}>
                        <Link className="simulMainBody_a" to={"/simul" + stock.srtnCd}>
                            <div className="simulMainBodyStockId">{stock.srtnCd}</div>

                            <div className="simulMainBodyStockName">{stock.itmsNm}</div>
                            
                            <div className="simulMainBodyStockPrice">{addComma(stock.clpr)}</div>

                            {(stock.vs > 0) && <div className="simulMainBodyStockDifferent" style={{color: "red"}}>▲{addComma(stock.vs)}</div>}
                            {(stock.vs < 0) && <div className="simulMainBodyStockDifferent" style={{color: "blue"}}>▼{addComma(stock.vs)}</div>}
                            {(stock.vs == 0) && <div className="simulMainBodyStockDifferent" >{addComma(stock.vs)}</div>}

                            {(stock.fltRt > 0) && <div className="simulMainBodyStockRange" style={{color: "red"}}>+{stock.fltRt}%</div>}
                            {(stock.fltRt < 0) && <div className="simulMainBodyStockRange" style={{color: "blue"}}>{stock.fltRt}%</div>}
                            {(stock.fltRt == 0) && <div className="simulMainBodyStockRange" >{stock.fltRt}%</div>}
                        </Link>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default Main_body;