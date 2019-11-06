import React from "react";
import BookHouseLayout from "../bookhousecore/BookhouseLayout";
import { isAuthenticated } from "../bookhouseapi/Bookhouseuserapi";
import { Link } from "react-router-dom";

const BookhouseUserDashboard = () => {
  const {
    bookhouseuser: { _id, username, email, userrole }
  } = isAuthenticated();

  const bookhouseuserlinks = () => {
    return (
      <div className="card">
        <h3 className="card-header">Customer Links</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/bookhouseprofile/update">
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userinfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header"> Book House User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <label>User Name: {username}</label>
          </li>
          <li className="list-group-item">
            <label>Email: {email}</label>
          </li>
          <li className="list-group-item">
            <label>Role : {userrole === 1 ? "Admin" : "Customer"}</label>
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = () => {
    return (
      <div className="card">
        <h3 className="card-header"> Book House Purchase</h3>
        <ul className="list-group">
          <li className="list-group-item">Books</li>
        </ul>
      </div>
    );
  };
  return (
    <BookHouseLayout
      pagetitle="Book House User Dashboard"
      pagedescription={`The Book House Welcomes you,${username}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{bookhouseuserlinks()}</div>
        <div className="col-9">
          {userinfo()} {purchaseHistory()}
        </div>
      </div>
    </BookHouseLayout>
  );
};

export default BookhouseUserDashboard;
