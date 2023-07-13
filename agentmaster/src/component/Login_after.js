//로그인 성공 시 출력되는 컴포넌트.
//로그인시 유저의 이름을 출력하는 기능 추가 예정.
//로그아웃 기능과 사용자 페이지클릭 시 넘어가기 기능 구현 필요 

import { useCallback } from "react";
import { Button, Stack } from "react-bootstrap";
import './css/Login_after.css'

const Login_after = ({setIsLogin}) => {
    
    const onLogout = useCallback(() => {
        sessionStorage.removeItem('user_id')
        setIsLogin(false)
    },[])

    return (
        <div className="loginForm">
            <div className="welcomeUser">
                <p>.....님{"\n"}환영합니다!</p>
            </div>
            <div className="buttons">
                <Stack direction='horizontal' gap={3}>
                    <Button variant="info">사용자 페이지</Button>
                    <Button variant="primary" onClick={onLogout}>로그아웃</Button>
                </Stack>
            </div>
        </div>
    );
  }
  
  export default Login_after;