//사용자 페이지
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function UserInfoForm() {
 
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

 

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    
    console.log('수정된 개인정보:', password, email);

    // 필요한 처리 완료 후 입력값 초기화
    
    setPassword('');
    setEmail('');
  };

  const handleClickBack = () => {
    navigate(`/`);
  }

  return (
    <div className='userForm'>
      <form onSubmit={handleSubmit}>
        <h1>개인정보 수정</h1>
        <div className="form-group">
          <label className="PW" htmlFor="password">비밀번호:</label>
          <input className='IP' type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div className="form-group">
          <label className='Em' htmlFor="email">이메일:</label>
          <input className='IP' type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group" style={{ marginTop: 'auto' }}>
          <button className="cancel" onClick={handleClickBack}>취소</button>
        </div>
        <div className="form-group" style={{ marginTop: 'auto' }}>
          <button className="submit" type="submit">적용</button>
        </div>
        
      </form>
    </div>
  );
}


  //데이터베이스에서 저장된 스크랩 기사 링크
  export function ScrapedArticles() {
    const [articles, setArticles] = useState([
      { id: 1, title: 'News Article 1', author: 'Author 1', date: '2023-07-28', url: 'https://example.com/article1' },
      { id: 2, title: 'News Article 2', author: 'Author 2', date: '2023-07-29', url: 'https://example.com/article2' },
      { id: 3, title: 'News Article 3', author: 'Author 3', date: '2023-07-30', url: 'https://example.com/article3' },
      { id: 4, title: 'News Article 4', author: 'Author 4', date: '2023-07-31', url: 'https://example.com/article3' },
    ]);
    const navigate = useNavigate();
    const handleClick = (articleId) => {
      navigate(`/newsDetail?id=${articleId}`, {
        state: {
          id: articleId
        }
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
                <td >{article.title}</td>
                <td>{article.author}</td>
                <td>{article.date}</td>
                <td><a href={article.url} target="_blank" rel="noopener noreferrer">기사 링크</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }