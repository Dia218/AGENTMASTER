//모의투자 메인화면에서 종목을 검색하는 곳에 사용되는 버튼을 나타내는 곳입니다.

import "./css/Search_button.css";
import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { SearchOutlined } from "@ant-design/icons";

const Search_button = ({ btnClick }) => {
    return (
        
        <div className="simulSearchBtn">
            <Button 
                variant="outline-primary" 
                onClick={btnClick}
                style={{
                        border: 'none', 
                        borderRadius: '100%', 
                        padding: '0'
                }} 
            >
                <SearchOutlined 
                    style={{ 
                        display: 'block', 
                        margin: 'auto', 
                        fontSize: '25px'
                    }} 
                />
            </Button>
        </div>
    )
}

Search_button.propTypes = {
    btnClick: PropTypes.func.isRequired,
}

export default Search_button;