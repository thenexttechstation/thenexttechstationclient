import React, { useState, useEffect } from "react";
import { getcategories, listProducts } from "./BookHouseAPICore";
import BookCard from "./BookCard";

const SearchBookHouse = () => {
  const [data, setData] = useState({
    bookhousecategories: [],
    bookhousecategory: "",
    search: "",
    results: [],
    searched: false
  });

  const {
    bookhousecategories,
    bookhousecategory,
    search,
    results,
    searched
  } = data;

  const loadCategories = () => {
    getcategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, bookhousecategories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    // console.log(search, category);
    if (search) {
      listProducts({
        search: search || undefined,
        bookhousecategory: bookhousecategory
      }).then(response => {
        if (response.error) {
          console.log(response.error);
        } else {
          setData({ ...data, results: response, searched: true });
        }
      });
    }
  };

  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  };

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };
  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };
  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
        <div className="row">
          {results.map((bookhouseproduct, i) => (
            <BookCard key={i} bookhouseproduct={bookhouseproduct} />
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <label>Search Books</label>

      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select
              className="btn btn-primary btn-lg btn-block"
              onChange={handleChange("bookhousecategory")}
            >
              <option value="All">Pick Category</option>
              {bookhousecategories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.categoryname}
                </option>
              ))}
            </select>
          </div>
          <br></br>
          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
          <br></br>
          <br></br>
          <button className="btn btn-success btn-lg btn-block">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <br></br>
      <div className="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
};

export default SearchBookHouse;
