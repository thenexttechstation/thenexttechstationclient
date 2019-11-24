import React, { useState, useEffect } from "react";
import {
  getcategories,
  listProducts,
  listAuthorProducts
} from "./BookHouseAPICore";
import BookCardSearch from "./BookCardSearch";
import { getProducts } from "./BookHouseAPICore";
import BookhouseLayout from "./BookhouseLayout";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const SearchBookHouse = () => {
  const classes = useStyles();

  const [completed, setCompleted] = React.useState(0);
  const [data, setData] = useState({
    bookhousecategories: [],
    bookhouseproducts: [],
    bookhousecategory: "",
    search: "",
    searchauthor: "",
    results: [],
    searched: false
  });
  const {
    bookhousecategories,
    bookhouseproducts,
    bookhousecategory,
    search,
    searchauthor,
    results,
    searched
  } = data;

  const loadCategories = () => {
    getcategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, bookhousecategories: data });
        for (const categoryname in bookhousecategories) {
          console.log(`${categoryname}: ${bookhousecategories[categoryname]}`);
        }
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

  const searchAuthorData = () => {
    console.log(searchauthor);
    if (searchauthor) {
      listAuthorProducts({
        searchauthor: searchauthor || undefined,
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
    searchAuthorData();
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
        <div className="card">
          {results.map((bookhouseproduct, i) => (
            <BookCardSearch key={i} bookhouseproduct={bookhouseproduct} />
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <h3>
        <label>Search Books</label>
      </h3>

      {!searched && (
        <div className={classes.root}>
          <LinearProgress />
          <LinearProgress color="secondary" />
        </div>
      )}
      <br></br>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select
              className="btn btn-warning btn-lg btn-block"
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

          <input
            type="search"
            className="form-control"
            onChange={handleChange("searchauthor")}
            placeholder="Search by author"
          />

          <br></br>
          <br></br>
          <button className="btn btn-info btn-lg btn-block">
            <i>Search</i>
          </button>
        </div>
      </span>
    </form>
  );

  return (
    <div>
      <BookhouseLayout>
        <div className="container">{searchForm()}</div>
        <br></br>
        <div className="jumbotron1">{searchedProducts(results)}</div>
      </BookhouseLayout>
    </div>
  );
};

export default SearchBookHouse;
