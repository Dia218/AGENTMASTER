import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import "./css/Join.css";

function Join({show,setShow}){

    const [id,setId] = useState("");
    const [pw,setPw] = useState("");
    const [email,setEmail] = useState("");
    const [idList,setIdList] = useState([]);
    const [check,setCheck] = useState(null);

    useEffect(()=>{
        setIdList([{"id":"idd"},{"id":"iddd"},{"id":"no"},{"id":"yes"}]);
    },[]);

    const handleJoin = () => {
        console.log(id,pw,email);
        setShow(false);
        setId("");
        setPw("");
        setEmail("");
    };
    const handleClose = () => {
        setShow(false);
        setId("");
        setPw("");
        setEmail("");
    };
    /*const handleChange = (e) => {
        setId(e.target.value);
        const double = idList.map((a) => {
            if(a.id === id){
                return true;
            }
        });
        console.log(double);
        setCheck(double);
    };*/

    return(
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                <Modal.Header className="joinTitle" closeButton>
                    <Modal.Title>회원 가입</Modal.Title>
                </Modal.Header>
            
                <Modal.Body className="joinBody">
                    <div className="warningId">*id는 변경할 수 없습니다.</div>
                    <InputGroup className="mb-3 inputId">
                        <div className="mx-3">아이디 :</div>
                        <Form.Control 
                        className="formId"
                        placeholder="아이디"
                        value={id}
                        onChange={(e)=>{setId(e.target.value);}}/>
                        <Button variant="outline-secondary">중복확인</Button>
                    </InputGroup>
                    <div>
                        {(check?"중복입니다!!!다른 아이디를 써주세요!":"")}
                    </div>
                    <InputGroup className="mb-3 inputPw">
                        <div className="mx-2">비밀번호 :</div>
                        <Form.Control 
                        className="formPw"
                        placeholder="비밀번호"
                        value={pw}
                        onChange={(e)=>{setPw(e.target.value)}}/>
                    </InputGroup>
                    <InputGroup className="mb-3 inputEmail">
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