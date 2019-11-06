import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./bookhouseuser/Register";
import Login from "./bookhouseuser/Login";
import SocialLogin from "./bookhouseuser/SocialLogin";
import Home from "./bookhousecore/Home";
import PrivateRoute from "./bookhouseapi/PrivateRoute";
import AdminRoute from "./bookhouseapi/AdminRoute";

import BookhouseUserDashboard from "./bookhouseuser/BookhouseUserDashboard";
import BookhouseSocialUserDashboard from "./bookhouseuser/BookhouseSocialUserDashboard";
import AdministratorDashboard from "./bookhouseuser/AdministratorDashboard";
import CreateCategory from "./bookhouseadmin/CreateCategory";
import CreateProduct from "./bookhouseadmin/CreateProduct";
import SocialUserRoute from "./bookhouseapi/SocialUserRoute";
import BookHouseError from "./bookhousecore/BookHouseError";
import BookShop from "./bookhousecore/BookShop";
import ProductDetails from "./bookhousecore/ProductDetails";
import BookHouseCart from "./bookhousecore/BookHouseCart";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/login" exact component={Login} />
        <Route path="/sociallogin" exact component={SocialLogin} />
        <Route path="/bookshop" exact component={BookShop} />

        <Route path="/register" exact component={Register} />
        <PrivateRoute
          path="/bookhouseuser/dashboard"
          exact
          component={BookhouseUserDashboard}
        />
        <SocialUserRoute
          path="/bookhousesocialuser/dashboard"
          exact
          component={BookhouseSocialUserDashboard}
        />

        <AdminRoute
          path="/admin/dashboard"
          exact
          component={AdministratorDashboard}
        />
        <AdminRoute path="/category/create" exact component={CreateCategory} />
        <AdminRoute path="/product/create" exact component={CreateProduct} />
        <Route
          path="/product/:bookhouseproductId"
          exact
          component={ProductDetails}
        />
        <Route path="/cart" exact component={BookHouseCart} />

        <Route path="*" component={BookHouseError} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
