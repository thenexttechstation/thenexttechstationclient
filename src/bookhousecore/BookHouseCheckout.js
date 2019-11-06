import React, { useState, useEffect } from "react";
import BookHouseLayout from "./BookhouseLayout";
import { emptyCart } from "./Cart";
import ReactDOM from "react-dom";
import RazorPay from "./RazorPay";

import {
  getProducts,
  getBraintreeClientToken,
  processPayment,
  createBookhouseOrder
} from "./BookHouseAPICore";
import BookCard from "./BookCard";
import {
  isAuthenticated,
  isSocialAuthenticated
} from "../bookhouseapi/Bookhouseuserapi";
import { Link } from "react-router-dom";
import "braintree-web";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ bookhouseproducts }) => {
  const { bookhouseuser, signedtoken } = isAuthenticated();

  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: ""
  });

  let deliveryAddress = data.address;
  const bookhouseuserId =
    isAuthenticated() && isAuthenticated().bookhouseuser._id;
  const token = isAuthenticated() && isAuthenticated().signedtoken;

  const getToken = (bookhouseuserId, token) => {
    console.log("bookhouseuserid" + bookhouseuserId);
    console.log("token" + token);

    getBraintreeClientToken(bookhouseuserId, token).then(data => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        console.log("success" + data.clientToken);
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(bookhouseuserId, token);
  }, []);
  const getTotal = () => {
    return bookhouseproducts.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() || isSocialAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/login">
        <button className="btn btn-primary">Sign in </button>
      </Link>
    );
  };
  const handledeliveryAddress = event => {
    setData({ ...data, address: event.target.value });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && bookhouseproducts.length > 0 ? (
        <div>
          <div className="gorm-group mb-3">
            <label className="text-muted">Delivery address:</label>
            <textarea
              onChange={handledeliveryAddress}
              className="form-control"
              value={data.address}
              placeholder="Type your delivery address here..."
            />
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault"
              }
            }}
            onInstance={instance => (data.instance = instance)}
          />
          <button
            onClick={makePayment}
            className="btn btn-success btn-lg btn-block"
          >
            Make Payment
          </button>
          ReactDOM.render(
          <RazorPay
            bookhouseuser={bookhouseuser}
            bookhouseproducts={bookhouseproducts}
            address={data.address}
          />
          , document.getElementById("RazorPay"));
        </div>
      ) : null}
    </div>
  );

  const makePayment = () => {
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then(data => {
        // console.log(data);
        nonce = data.nonce;
        // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
        // and also total to be charged
        // console.log(
        //     "send nonce and total to process: ",
        //     nonce,
        //     getTotal(products)
        // );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(bookhouseproducts)
        };

        processPayment(bookhouseuserId, token, paymentData)
          .then(response => {
            // console.log(response

            const createOrderData = {
              bookhouseproducts: bookhouseproducts,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAddress,
              bookhouseusername: bookhouseuser.username,
              bookhouseuseremail: bookhouseuser.email
            };

            createBookhouseOrder(bookhouseuserId, token, createOrderData)
              .then(response => {
                emptyCart(() => {
                  console.log("payment success and empty cart");
                  setData({
                    loading: false,
                    success: true
                  });
                });
              })
              .catch(error => {
                console.log(error);
                setData({ loading: false });
              });
          })
          .catch(error => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch(error => {
        // console.log("dropin error: ", error);
        setData({ ...data, error: error.message });
      });
  };
  const showError = error => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = success => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Payment successfull
    </div>
  );

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
