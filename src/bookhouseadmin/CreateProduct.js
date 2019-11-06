import React, { useState, useEffect } from "react";
import BookHouseLayout from "../bookhousecore/BookhouseLayout";
import { isAuthenticated } from "../bookhouseapi/Bookhouseuserapi";
import { Link } from "react-router-dom";
import {
  addProducts,
  getcategories
} from "../bookhouseadmin/Bookhouseadminapi";

const AddProduct = () => {
  const [values, setValues] = useState({
    bookname: "",
    bookdescription: "",
    price: "",
    bookhousecategories: [],
    bookhousecategory: "",
    deliverable: "",
    quantity: "",
    image: "",
    loading: false,
    error: "",
    createdBook: "",
    redirectToProfile: false,
    formData: "",
    author: ""
  });

  const { bookhouseuser, signedtoken } = isAuthenticated();
  const {
    bookname,
    author,
    bookdescription,
    price,
    bookhousecategories,
    bookhousecategory,
    deliverable,
    quantity,
    loading,
    error,
    createdBook,
    redirectToProfile,
    formData
  } = values;

  // load categories and set form data
  const init = () => {
    getcategories().then(data => {
      console.log("categories" + JSON.stringify(data));
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          bookhousecategories: data,
          formData: new FormData()
        });
        console.log(
          "Book house categories" + +JSON.stringify(bookhousecategories)
        );
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = name => event => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({
      ...values,
      error: "",
      loading: true,
      author: ""
    });

    addProducts(bookhouseuser._id, signedtoken, formData).then(data => {
      console.log("hello" + JSON.stringify(data.data.bookname));
      if (data.data.error) {
        setValues({ ...values, error: data.data.error });
      } else {
        setValues({
          ...values,
          bookname: "",
          bookdescription: "",
          image: "",
          price: "",
          quantity: "",
          loading: false,
          createdBook: data.data.bookname
        });
      }
    });
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Upload Image</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("image")}
            type="file"
            name="image"
            accept="image/*"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Book Name</label>
        <input
          onChange={handleChange("bookname")}
          type="text"
          className="form-control"
          value={bookname}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Book Description</label>
        <textarea
          onChange={handleChange("bookdescription")}
          className="form-control"
          value={bookdescription}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Author</label>
        <input
          onChange={handleChange("author")}
          type="text"
          className="form-control"
          value={author}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Book HouseCategory</label>
        <select
          onChange={handleChange("bookhousecategory")}
          className="form-control"
        >
          <option>Please select</option>
          {bookhousecategories &&
            bookhousecategories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.categoryname}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Delivery</label>
        <select onChange={handleChange("deliverable")} className="form-control">
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>

      <button className="btn btn-outline-primary">Create Book</button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdBook ? "" : "none" }}
    >
      <h2>{`${createdBook}`} is created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <BookHouseLayout
      pagetitle="Add Book Category"
      pagedescription={`The Book House Welcomes you,${bookhouseuser.username}`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
        </div>
      </div>
    </BookHouseLayout>
  );
};

export default AddProduct;
