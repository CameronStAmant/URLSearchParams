import { useEffect, useState } from "react";
import {
  useGetURLSearchParams,
  useWriteURLSearchParams,
  type Params,
} from "./useURLSearchParams";
import "./app.css";

function App() {
  const [queryParams, setQueryParams] = useState(() => useGetURLSearchParams());

  useEffect(() => {
    useWriteURLSearchParams(queryParams);
  }, [queryParams]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement, HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
    key: keyof Params,
  ) => {
    setQueryParams((params) => {
      return { ...params, ...{ [key]: e.target.value } };
    });
  };

  return (
    <>
      <label htmlFor="search">Search</label>
      <input
        name="search"
        id="search"
        type="text"
        value={queryParams.q}
        onChange={(e) => handleChange(e, "q")}
      />
      <label htmlFor="amount">Amount</label>
      <select
        name="amount"
        id="amount"
        value={queryParams.amount}
        onChange={(e) => handleChange(e, "amount")}
      >
        <option value="">Choose an option</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </>
  );
}

export default App;
