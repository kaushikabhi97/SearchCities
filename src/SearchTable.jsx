import React, { useRef, useState } from "react";
import { InputBox } from "./components/InputBox";
import CityTable from "./components/CityTable";
import Pagination  from "./components/Pagination";
import axios from "axios";
import { CITY_ENDPOINT, CITY_ENDPOINT_HOST } from "../constants";

const SearchTable = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchInputRef = useRef(null);
  const [warning,setWarning]=useState('');

  const fetchData = async () => {
    const api_key = import.meta.env.VITE_API_KEY;

    if (!query.trim()) return;
    setLoading(true);

    try {
      if (query && api_key) {
        
        let resp = await axios.get(`${CITY_ENDPOINT}?limit=${limit}`, {
          headers: {
            "x-rapidapi-key": api_key,
            "x-rapidapi-host": CITY_ENDPOINT_HOST,
          },
        });

        let citydata = resp.data?.data;

        if (resp.status == 200 && citydata.length >= 0) {
          setData(citydata);

          setTotalPages(Math.ceil(citydata.length / 3)); // Divide by 3 per page
        
        }else
        {
          setTotalPages(1);
          setData([])
        }
        setPage(1); // Reset to first page
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);

      setData([]);
      setTotalPages(1);
      setLoading(false);


    }
  };

  const displayData = data && data.slice((page - 1) * 3, page * 3);

  return (
    <div className="searchTable-Container">
      <h4>Search Cities</h4>

      <div>
        <InputBox
          query={query}
          setQuery={setQuery}
          onSearch={fetchData}
          setData={setData}
        />
        <CityTable data={displayData} loading={loading} query={query} />
        {data.length > 0 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          limit={limit}
          setLimit={setLimit}
          warning={warning}
          setWarning={setWarning}
        />
      )}      </div>
    </div>
  );
};

export default SearchTable;
