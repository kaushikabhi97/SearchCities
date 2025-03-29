import React, { useEffect, useRef } from "react";

export const InputBox = ({ query, setQuery, onSearch, setData }) => {
  let searchInputRef = useRef(null);

  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        searchInputRef.current.focus();
      }
    };
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  const handleQueryData = (data) => {
    setQuery(data);
    if (data === "") {
      setData([]);
    }
  };
  return (
    <div className="searchContainer">
      <input
        type="text"
        className="inputbox"
        ref={searchInputRef}
        placeholder="Search for a city...."
        value={query}
        onChange={(e) => handleQueryData(e.target.value)}
      />
      <button onClick={onSearch} className="actionbtn">
        Search
      </button>
    </div>
  );
};
