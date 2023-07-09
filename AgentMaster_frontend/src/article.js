import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const socket = socketIOClient('/'); // 소켓 연결

    // 서버로부터 업데이트된 데이터 수신
    socket.on('articles', (data) => {
      setArticles(data);
    });

    // 임시 데이터
    const temporaryData = [
      { id: 1, title: 'Article 1' },
      { id: 2, title: 'Article 2' },
      { id: 3, title: 'Article 3' },
    ];
    setArticles(temporaryData);

    return () => {
      socket.disconnect(); // 컴포넌트가 언마운트될 때 소켓 연결 해제
    };
  }, []);

  return (
    <div className='Article'>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;



