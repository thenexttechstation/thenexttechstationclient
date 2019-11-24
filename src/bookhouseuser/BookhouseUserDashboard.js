import React, { useState, useEffect } from "react";
import BookHouseLayout from "../bookhousecore/BookhouseLayout";
import { isAuthenticated } from "../bookhouseapi/Bookhouseuserapi";
import { Link } from "react-router-dom";
import { getBookPurchaseHistory } from "./Userapi";
import moment from "moment";

const BookhouseUserDashboard = () => {
  const [history, setHistory] = useState([]);
  const token = isAuthenticated().signedtoken;
  const {
    bookhouseuser: { _id, username, email, userrole }
  } = isAuthenticated();

  const init = (bookhouseuserid, token) => {
    console.log("inside init" + bookhouseuserid);
    console.log("inside token" + token);

    getBookPurchaseHistory(bookhouseuserid, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);
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
            <Link className="nav-link" to={`/profile/${_id}`}>
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
  const purchaseBookHistory = history => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history.map((h, i) => {
              return (
                <div>
                  <hr />
                  {h.bookhouseproducts.map((p, i) => {
                    return (
                      <div key={i}>
                        {JSON.stringify(p)}
                        <h6>Product name: {p.bookname}</h6>
                        <h6>Product price: ${p.price}</h6>
                        <h6>Purchased date: {moment(p.createdAt).fromNow()}</h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
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
          {userinfo()} {purchaseBookHistory(history)}
        </div>
      </div>
    </BookHouseLayout>
  );
};

export default BookhouseUserDashboard;
