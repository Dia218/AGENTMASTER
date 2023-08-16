//로그인 성공 전에 출력하는 컴포넌트. 기본 메인.
//로그인에 성공하면 유저 정보를 백에 넘겨줘야함.

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import './css/Login_before.css';
import Join from "./Join";

const Login_before = ({setIsLogin,socketIo}) => {
    const [id,setId] = useState("");
    const [pw, setPw] = useState("");
    const [show,setShow] = useState(false);
    const [result,setResult] = useState();
    const [click,setClick] = useState(false);

    //input에 변화가 있을때마다 value 값을 변경해서 state에 저장한다.
    const handleId = (e) => {
        setId(e.target.value);
    }

    const handlePw = (e) => {
        setPw(e.target.value);
    }

    //로그인 버튼 클릭 시 실행. 현재는 자동으로 성공 처리함.
    const onClickLogin = () =>{
        sessionStorage.setItem("user_id",id);
        sessionStorage.setItem("user_pw",pw);
        sessionStorage.setItem("isLogin",true);
        socketIo.emit('loginCheck',{ id:id, pw:pw });
        setResult(true);
        setClick(true);
    }

    useEffect(()=>{
        socketIo.on('loginCheck_Result',(data)=>{ setResult(data) });
    },[socketIo]);

    useEffect(()=>{
        if(click){
            if(result){
                setIsLogin(true);
                setClick(false);
            } else {
                alert("아이디/비밀번호가 틀립니다.");
                setId("");
                setPw("");
                setIsLogin(false);
                setClick(false);
            }
        }
    },[click])

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