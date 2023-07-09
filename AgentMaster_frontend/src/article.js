import React, { useState, useEffect } from 'react';
function ArticleList() {
    const [articles, setArticles] = useState([]);
  
    useEffect(() => {
      fetchArticles();
    }, []);
  
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles'); 
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
  
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
