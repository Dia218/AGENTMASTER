//로그인 성공 전에 출력하는 컴포넌트. 기본 메인.
//로그인에 성공하면 유저 정보를 백에 넘겨줘야함.

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import './css/Login_before.css';
import Join from "./Join";
import axios from "axios";

const Login_before = ({setIsLogin}) => {
    //
    const [id,setId] = useState("");
    const [pw, setPw] = useState("");
    const [show,setShow] = useState(false);
    const [result,setResult] = useState("");
    const [click,setClick] = useState(false);

    //input에 변화가 있을때마다 value 값을 변경해서 state에 저장한다.
    const handleId = (e) => {
        setId(e.target.value);
    }
    const handlePw = (e) => {
        setPw(e.target.value);
    }

    //GET함수를 이용해 백엔드에 유저가 입력한 id와 pw를 전송하고 로그인 결과를 전달받아 state에 저장하는 함수
    const checkLogin = async () => {
        try {
            const responseCheck_Login = await axios.get(`http://localhost:8080/newsMain/login?userId=${id}&userPassword=${pw}`);
            setResult(responseCheck_Login);
        } catch (error) {
            const responseCheck_Login = await success();
            setResult(responseCheck_Login);
            console.error('Error fetching login data:', error);
        }
    }

    //임시 로그인 성공/실패 함수
    async function success() {
        const json = {
            "UserInfo" : [
                {	
                    "customerId" : "customerid1"
                }
        	]
        };
        
        return json;
    }

    //로그인 버튼 클릭 시 실행. 현재는 자동으로 성공 처리함.
    const onClickLogin = async () =>{
        if(id==""||pw=="") {
            alert("아이디와 비밀번호를 입력해주세요!");
        } else {
            await checkLogin();
            setClick(true);
        }
    }

    useEffect(()=>{
        if(click){
            //백엔드 코드 수정 result.UserInfo[0].dustomerId -> result.data.UserInfo[0].customerId==id
            if(result.data.UserInfo[0].customerId==id){
                sessionStorage.setItem("user",'root1234');
                sessionStorage.setItem("isLogin",true);
                setIsLogin(true);
                setClick(false);
            } else {
                alert("아이디/비밀번호가 틀립니다.");
                setId("");
                setPw("");
                setClick(false);
            }
        }
    },[click]);

    const onClickJoin = () => {
        setShow(true);
    }

    return (
        <>
        <div className="loginForm">
            <div className="loginId">
                <input type='text' name='input_id' placeholder="아이디" value={id} onChange={handleId} required/>
            </div>
            <div className="loginPw">
                <input type='password' name='input_pw' placeholder="비밀번호" value={pw} onChange={handlePw} required/>
            </div>
            <div className="loginButton">
                <Button className="button" variant="primary" onClick={onClickLogin}>Login</Button>
            </div>
            <div className="signup" onClick={onClickJoin}>sign up</div>
        </div>
        <Join show={show} setShow={setShow}/>
        </>
    );
  }
  
  export default Login_before;