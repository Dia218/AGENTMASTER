import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  return <SearchBar />;
}

function SearchBar() {
  const predefinedSuggestions = [
    "검색어1",
    "검색어2",
    "검색어3",
    // 미리 정의된 검색어 목록을 추가
  ];
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionsFetchRequested = ({ value }) => {
    const filteredSuggestions = predefinedSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    // 선택된 검색어 항목 처리 로직을 작성
  };

  const renderSuggestion = (suggestion) => {
    return <div>{suggestion}</div>;
  };

  const handleSearch = () => {
    console.log("Search:", value);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={renderSuggestion}
        inputProps={{
          value: value,
          onChange: (event, { newValue }) => setValue(newValue),
          style: {
            backgroundColor: "white",
            border: "3px solid #9bccfb",
            padding: "10px",
            borderRadius: "5px",
            width: "200px",
            marginLeft: "70px",
            marginTop: "20px",
          },
        }}
      />
      <IconButton
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
        size="large"
        style={{ marginLeft: "-50px", marginTop: "20px" }} // 아이콘의 위치를 조정
        onClick={handleSearch} // 검색 버튼 클릭 시 handleSearch 함수 호출
      >
        <SearchIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

