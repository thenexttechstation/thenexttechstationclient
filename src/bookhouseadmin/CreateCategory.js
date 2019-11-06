import React, { useState } from "react";
import BookHouseLayout from "../bookhousecore/BookhouseLayout";
import { isAuthenticated } from "../bookhouseapi/Bookhouseuserapi";
import { Link } from "react-router-dom";
import { addCategory } from "../bookhouseadmin/Bookhouseadminapi";
import BookHouseMenu from "../bookhousecore/BookHouseMenu";

const CreateCategory = () => {
  const [categoryname, setCategoryName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { bookhouseuser, signedtoken } = isAuthenticated();

  const handleChange = event => {
    setError("");
    setSuccess(false);
    setCategoryName(event.target.value);
  };
  const displayErrorMessage = () => {
    if (error) {
      return <h3 className="text-danger"> Category Name should be unique</h3>;
    }
  };

  const displaySuccessMessage = () => {
    if (success) {
      return <h3 className="text-success"> {categoryname} created!</h3>;
    }
  };

  const clickSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    addCategory(bookhouseuser._id, signedtoken, { categoryname }).then(data => {
      console.log("userid" + bookhouseuser._id);
      console.log("token" + signedtoken);
      console.log("category" + categoryname);

      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(true);
        setError("");
      }
    });
  };

  const goAdminDashBoard = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );
  const addCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Enter Book Category</label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          value={categoryname}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">
        <label>Add Category</label>
      </button>
    </form>
  );

  const addNewCategoryForm = () => (
    <div>
      <BookHouseMenu></BookHouseMenu>
      <div class="container">
        <h2>BOOK HOUSE CATEGORY CREATION</h2>
        <form class="form-horizontal" onSubmit={clickSubmit}>
          <div class="form-group">
            <label class="control-label col-sm-2">Category Name</label>
            <div class="col-sm-5">
              <input
                onChange={handleChange}
                type="text"
                className="form-control"
                value={categoryname}
                autoFocus
                required
              />
            </div>
          </div>

          <div class="form-group">
            <button className="btn btn-success btn-lg btn-block">
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div>
      {displayErrorMessage()}
      {displaySuccessMessage()}
      {addNewCategoryForm()}
      {goAdminDashBoard()}
    </div>
  );
};

export default CreateCategory;
