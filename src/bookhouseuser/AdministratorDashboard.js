import React from "react";
import BookHouseLayout from "../bookhousecore/BookhouseLayout";
import { isAuthenticated } from "../bookhouseapi/Bookhouseuserapi";
import { Link } from "react-router-dom";

const AdministratorDashboard = () => {
  const {
    bookhouseuser: { _id, username, email, userrole }
  } = isAuthenticated();

  const bookhouseadminlinks = () => {
    return (
      <div className="card">
        <h3 className="card-header">Admin Links</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/category/create">
              Create BookHouse category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/product/create">
              Create Books
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">
              View Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const admininfo = () => {
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

  return (
    <BookHouseLayout
      pagetitle="Book House Admin Dashboard"
      pagedescription={`The Book House Welcomes you,${username}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{bookhouseadminlinks()}</div>
        <div className="col-9">{admininfo()}</div>
      </div>
    </BookHouseLayout>
  );
};

export default AdministratorDashboard;
