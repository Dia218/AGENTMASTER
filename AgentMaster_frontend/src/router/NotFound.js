import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation

import Header from '../component/Header';
import './css/NotFound.css';

const NotFound = () => {
  const location = useLocation();

 
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
      <header className="mb-4">
        <Header />
      </header>

      <div className='option'>
        
        <Link to="/">홈으로 이동</Link>
        <div className="divider"></div>
        <b onClick={handleGoBack} className='back'>뒤로가기</b>
      </div>

      <div className="top">
        <h2>죄송합니다. </h2> <br />
        <h2>요청하신 페이지를 찾을 수 없습니다.</h2>
      </div>

      <div className="middle">
        <h3>
          방문하시려는 페이지의 주소가 잘못 입력되었거나 <br />
          <br />
          페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다. <br /> <br />
          입력하신 주소가 정확한지 다시 한번만 확인해 주시기 바랍니다.
        </h3>
      </div>

     
    </div>
  );
};

export default NotFound;

