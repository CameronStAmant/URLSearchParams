import { useEffect, useState, type SyntheticEvent } from "react";
import {
  appendParams,
  deleteAppendedParam,
  getEntries,
  getForEach,
  getParam,
  getSizeOfSearchParameters,
  getURLSearchParams,
  writeURLSearchParams,
  type Params,
} from "./URLSearchParams";
import "./app.css";

function App() {
  const [queryParams, setQueryParams] = useState(() => getURLSearchParams());
  const [searchResults, setSearchResults] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string>("");

  useEffect(() => {
    writeURLSearchParams(queryParams);
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

  const entries = getEntries(queryParams);

  const displayForEach = () => {
    let list: React.JSX.Element[] = [];

    getForEach(queryParams).forEach((value, key) => {
      list.push(
        <div>
          Key: {key}, Value: {value}
        </div>,
      );
    });

    return list;
  };

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    setSearchResults(getParam(searchParam));
  };

  return (
    <div className="root">
      <div>
        <label htmlFor="search">Search</label>
        <input
          name="search"
          id="search"
          type="text"
          value={queryParams.q}
          onChange={(e) => handleChange(e, "q")}
        />
      </div>
      <div>
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
      </div>
      <div>
        The size of the search parameter entries is{" "}
        {getSizeOfSearchParameters(queryParams)}
      </div>
      <button
        onClick={() =>
          appendParams(
            queryParams,
            "isAppended",
            "true",
            (key: string, value: string) => {
              setQueryParams((params) => {
                return { ...params, ...{ [key]: value } };
              });
            },
          )
        }
      >
        Append value
      </button>
      <button
        onClick={() => {
          deleteAppendedParam(queryParams, "isAppended", setQueryParams);
        }}
      >
        Delete appended param
      </button>
      <div>
        <span>The current entries are</span>
        {entries.map((item) => {
          for (const [key, value] of Object.entries(item)) {
            return (
              <div>
                Key: {key}, Value: {value}
              </div>
            );
          }
        })}
      </div>
      <div>
        <span>Another list of entries, but using forEach</span>
        <div>{displayForEach()}</div>
      </div>
      <div>
        <form onSubmit={handleSearch}>
          <label htmlFor="search">Search for param</label>
          <input
            name="search"
            id="search"
            type="type"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <span>Results: {searchResults}</span>
      </div>
    </div>
  );
}

export default App;
