//사용자 페이지
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function UserInfoForm() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(''); // 이메일 형식 오류 상태
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    // 이메일 형식을 검증하는 정규 표현식
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$/;

    if (!emailRegex.test(enteredEmail)) {
      setEmailError('유효한 이메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailError) {
     
      console.error('이메일 형식 오류:', emailError);
      return;
    }

    console.log('수정된 개인정보:', password, email);

   
    axios
      .post('http://localhost:8080/updateUserInfo', { password, email })
      .then((response) => {
        console.log('개인정보 수정 성공:', response.data);
        // 필요한 처리 완료 후 입력값 초기화
        setPassword('');
        setEmail('');
      })
      .catch((error) => {
        console.error('개인정보 수정 실패:', error);
       
      });
  };

  const handleClickBack = () => {
    navigate(`/`);
  };

  useEffect(() => {
    // Axios를 사용하여 백엔드에서 현재 사용자의 정보를 가져와서 email 상태 업데이트
    axios
      .get('http://localhost:8080/getUserInfo')
      .then((response) => {
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.error('사용자 정보 가져오기 실패:', error);
      });
  }, []);

  useEffect(() => {
    // Axios를 사용하여 백엔드에서 현재 사용자의 정보를 가져와서 password 상태 업데이트
    axios
      .get('http://localhost:8080/getUserInfo')
      .then((response) => {
        setPassword(response.data.password);
      })
      .catch((error) => {
        console.error('사용자 정보 가져오기 실패:', error);
      });
  }, []);

  return (
    <div className="userForm">
      <form onSubmit={handleSubmit}>
        <h1>개인정보 수정</h1>
        <div className="form-group">
          <label className="PW" htmlFor="password">
            비밀번호:
          </label>
          <input
            className="IP"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="form-group">
          <label className="Em" htmlFor="email">
            이메일:
          </label>
          <input
            className="IP"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div className="form-group" style={{ marginTop: 'auto' }}>
          <button className="cancel" onClick={handleClickBack}>
            취소
          </button>
        </div>
        <div className="form-group" style={{ marginTop: 'auto' }}>
          <button className="submit" type="submit">
            적용
          </button>
        </div>
      </form>
    </div>
  );
}

//스크랩한 기사 
export function ScrapedArticles() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 데이터 요청 시작 시 로딩 상태 설정
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getScrapedArticles'); // 백엔드에서 스크랩된 기사 목록을 가져오는 엔드포인트
        setArticles(response.data); // 받아온 데이터를 articles 상태로 설정
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // 데이터 가져오는 함수 호출
  }, []);

  const handleClick = (articleId) => {
    navigate(`/newsDetail?id=${articleId}`, {
      state: {
        id: articleId,
      },
    });
  };

  return (
    <div className="userForm2">
      <h1>스크랩한 기사</h1>
      <table className="article-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>기자</th>
            <th>날짜</th>
            <th>기사</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="news-article" onClick={() => handleClick(article.id)}>
              <td>{article.title}</td>
              <td>{article.author}</td>
              <td>{article.date}</td>
              <td>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  기사 링크
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
