import React, { useState, useEffect } from "react";
import BookHouseLayout from "../bookhousecore/BookhouseLayout";
import { getProducts } from "./BookHouseAPICore";
import BookCardHome from "./BookCardHome";
import Carousal from "../bookhousecore/Carousal";
import SearchBookHouse from "./SearchBookHouse";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsByPurchase = () => {
    getProducts("mostPurchased").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsRecent = () => {
    getProducts("createdAt").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByPurchase();
    loadProductsRecent();
  }, []);

  return (
    <BookHouseLayout
      pagetitle="Book House"
      pagedescription="The Next Tech Station Innovation"
      className="container-fluid"
    >
      <Carousal></Carousal>
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((bookhouseproduct, i) => (
          <div key={i} className="col-4 mb-3">
            <BookCardHome key={i} bookhouseproduct={bookhouseproduct} />
          </div>
        ))}
      </div>

      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((bookhouseproduct, i) => (
          <div key={i} className="col-4 mb-3">
            <BookCardHome bookhouseproduct={bookhouseproduct} />
          </div>
        ))}
      </div>
    </BookHouseLayout>
  );
};

export default Home;
