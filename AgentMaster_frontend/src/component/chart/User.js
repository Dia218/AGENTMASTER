import React, { useState } from 'react';

export function UserInfoForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    
    console.log('수정된 개인정보:', username, password, email);

    // 필요한 처리 완료 후 입력값 초기화
    setUsername('');
    setPassword('');
    setEmail('');
  };

  return (
    <div className='userForm'>
      <form onSubmit={handleSubmit}>
        <h1>개인정보 수정</h1>
        <div className="form-group">
          <label htmlFor="username">아이디:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group" style={{ marginTop: 'auto' }}>
          <button className="submit" type="submit">적용</button>
        </div>
        <div className="form-group" style={{ marginTop: 'auto' }}>
          <button className="cancel" type="submit">취소</button>
        </div>
      </form>
    </div>
  );
}
//아직 구현 중
export function KeywordAlert() {
    return (
      <div className="userForm">
        <h1>키워드 알림</h1>
        
      </div>
    );
  }
  //데이터베이스에서 저장된 스크랩 기사 링크
  export function ScrapedArticles() {
    const [articles, setArticles] = useState([
      { id: 1, title: 'News Article 1', url: 'https://example.com/article1' },
      { id: 2, title: 'News Article 2', url: 'https://example.com/article2' },
      { id: 3, title: 'News Article 3', url: 'https://example.com/article3' },
    ]);
  
    const handleArticleClick = (url) => {
      window.open(url, '_blank'); 
    };
  
    return (
      <div className="userForm">
        <h1>스크랩한 기사</h1>
        {articles.map((article) => (
          <div key={article.id} className="news-title" onClick={() => handleArticleClick(article.url)}>
            {article.title}
          </div>
        ))}
      </div>
    );
  }