// https://jsonplaceholder.typicode.com/users

import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [searchedData, setsSearchedData] = useState("");

  const filterData = searchedData
    ? data?.filter((item) => {
        return item.name.toLowerCase().includes(searchedData.toLowerCase());
      })
    : data;

  const geData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const resData = await res.json();
      setData(resData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    geData();
  }, []);

  return (
    <>
      <div>
        <input
          placeholder="search..."
          value={searchedData}
          onChange={(e) => setsSearchedData(e.target.value)}
        />
      </div>
      <div>
        {filterData?.map((item, _) => {
          return <div key={item.id}>{item.name}</div>;
        })}
      </div>
    </>
  );
}
