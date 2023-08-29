//회원가입 컴포넌트
import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import "./css/Join.css";

function Join({show,setShow,socketIo}){

    const [id,setId] = useState("");
    const [pw,setPw] = useState("");
    const [email,setEmail] = useState("");
    const [idList,setIdList] = useState([]);
    const [checkDup,setCheckDup] = useState();
    const [checkJoin,setCheckJoin] = useState(false);
    const [checkMessage,setCheckMessage] = useState("");
    
    const idCheck1 = /^[a-zA-Z]{5,15}$/;
    const idCheck2 = /^[a-zA-Z0-9]{5,15}$/;
    const pwCheck = /^[a-zA-Z0-9]{8,20}$/;
    const emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    //임의 데이터 지정(중복 확인용), 삭제 예정
    useEffect(()=>{
        setIdList([{"id":"idd"},{"id":"iddd"},{"id":"no"},{"id":"yes"}]);
    },[]);

    //회원가입 예외처리 부분
    const checkData = () => {
        if(id===""){
            setCheckJoin(false);
            alert("아이디를 입력해주세요.");
        }
        else if(!(idCheck1.test(id)||idCheck2.test(id))){
            setCheckJoin(false);
            alert("아이디는 5-15자의 영문 혹은 영문+숫자 조합만 가능합니다.");
        }
        else if (checkDup==null) {
            setCheckJoin(false);
            alert("아이디의 중복확인이 필요합니다.");
        }
        else if(pw===""){
            setCheckJoin(false);
            alert("비밀번호를 입력해주세요.");
        }
        else if(!((!idCheck1.test(pw))&&pwCheck.test(pw))){
            setCheckJoin(false);
            alert("비밀번호는 8-20자의 영문+숫자 조합만 가능합니다.");
        }
        else if(email===""){
            setCheckJoin(false);
            alert("이메일을 입력해주세요.");
        }
        else if(!(emailCheck.test(email))){
            setCheckJoin(false);
            alert("이메일의 형식이 올바르지 않습니다.");
        } 
        else {
            setCheckJoin(true);
        }
    }
    const handleJoin = () => {
        checkData();
    };
    useEffect(()=>{
        if(checkJoin){
            alert("회원가입이 완료되었습니다!");
            socketIo.emit('joinCheck',{ id:id,pw:pw,email:email });
            setShow(false);
            setId("");
            setPw("");
            setEmail("");
            setCheckDup();
            setCheckMessage("");
        }
    },[checkJoin])

    //창 닫는 버튼 구현
    const handleClose = () => {
        setShow(false);
        setId("");
        setPw("");
        setEmail("");
        setCheckDup();
        setCheckMessage("");
    };

    //아이디 중복확인 구현
    const handleDupCheck = () => {
        if(id===""){
            setCheckDup(true)
            setCheckMessage("아이디를 입력해주세요.");
        } else if (!(idCheck1.test(id)||idCheck2.test(id))){
            setCheckDup(true)
            setCheckMessage("아이디의 형식이 올바르지 않습니다.");
        }
        else {
            socketIo.emit('doubleCheckId',{ id:id });
            //임의로 중복x
            setCheckDup(true)
            setCheckMessage("사용 가능한 아이디 입니다.");
            //임의로 중복o
            //setCheckDup(false);
        }
    };
    useEffect(()=>{
        socketIo.on('doubleCheckIdResult',(data)=>{setCheckDup(data)});
        if(checkDup){
            setCheckMessage("사용 가능한 아이디 입니다.");
        }
    },[socketIo])
    const ShowMessage = () => {
        if(checkDup!=null){
            return <div className="doubleCheck_message">
                {(checkDup?checkMessage:"중복입니다.")}
            </div>
        }
    }

    return(
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                <Modal.Header className="joinTitle" closeButton>
                    <Modal.Title>회원 가입</Modal.Title>
                </Modal.Header>
            
                <Modal.Body className="joinBody">
                    <div className="warningId">*id는 변경할 수 없습니다.</div>
                    <InputGroup className="mt-2 inputId">
                        <div className="mx-3">아이디 :</div>
                        <Form.Control 
                        className="formId"
                        placeholder="5-15자의 영 또는 영+숫자"
                        value={id}
                        onChange={(e)=>{setId(e.target.value);}}/>
                        <Button 
                        variant="outline-primary"
                        onClick={handleDupCheck}>중복확인</Button>
                    </InputGroup>
                    <ShowMessage />
                    <InputGroup className="mt-3 inputPw">
                        <div className="mx-2">비밀번호 :</div>
                        <Form.Control 
                        className="formPw"
                        placeholder="8-20자의 영문+숫자 조합"
                        value={pw}
                        onChange={(e)=>{setPw(e.target.value)}}/>
                    </InputGroup>
                    <InputGroup className="mt-3 inputEmail">
                        <div className="mx-3">이메일 :</div>
                        <Form.Control 
                        className="formEmail"
                        placeholder="이메일"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}/>
                    </InputGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleJoin}>가입하기</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Join;