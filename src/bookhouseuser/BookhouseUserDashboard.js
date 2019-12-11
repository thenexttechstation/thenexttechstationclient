import React, { useState, useEffect } from "react";
import BookHouseLayout from "../bookhousecore/BookhouseLayout";
import { isAuthenticated } from "../bookhouseapi/Bookhouseuserapi";
import { Link } from "react-router-dom";
import { getBookPurchaseHistory } from "./Userapi";
import moment from "moment";
import { Button, Segment } from "semantic-ui-react";

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
              <Segment inverted>
                <Button color="yellow" inverted size="massive">
                  My Cart
                </Button>
              </Segment>{" "}
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              <Segment inverted>
                <Button color="orange" inverted size="massive">
                  Update Profile
                </Button>
              </Segment>
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
            <h3>User Name: {username}</h3>
          </li>
          <li className="list-group-item">
            <h3>Email: {email}</h3>
          </li>
          <li className="list-group-item">
            <h3>Role : {userrole === 1 ? "Admin" : "Customer"}</h3>
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
                        <h3>Product name: {p.bookname}</h3>
                        <h3>Product price: ${p.price}</h3>
                        <h3>Purchased date: {moment(h.createdAt).fromNow()}</h3>
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
