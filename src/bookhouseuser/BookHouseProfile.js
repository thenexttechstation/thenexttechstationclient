import React, { useState, useEffect } from "react";
import BookhouseLayout from "../bookhousecore/BookhouseLayout";
import { isAuthenticated } from "../bookhouseapi/Bookhouseuserapi";
import { Link, Redirect } from "react-router-dom";
import { findProfileByUserId, update, updateUser } from "./Userapi";

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    error: false,
    success: false
  });
  const { bookhouseuser } = isAuthenticated();
  const { signedtoken } = isAuthenticated();
  const { username, email, password, error, success } = values;

  const clickSubmit = e => {
    e.preventDefault();
    update(match.params.bookhouseuserId, signedtoken, {
      username,
      email,
      password
    }).then(data => {
      if (data.error) {
        console.lgo(data.error);
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            name: data.username,
            email: data.email,
            success: true
          });
        });
      }
    });
  };

  const init = bookhouseuserId => {
    // console.log(userId);
    const { signedtoken } = isAuthenticated();
    findProfileByUserId(bookhouseuserId, signedtoken).then(data => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.username, email: data.email });
      }
    });
  };

  useEffect(() => {
    init(match.params.bookhouseuserId);
  }, []);

  const profileUpdate = (name, email, password) => (
    <form>
      <div className="form-group">
        <label>Name</label>
        <input type="text" onChange={handleChange("username")} />
      </div>
      <div className="form-group">
        <label>Existing User name</label>
        <h3>{bookhouseuser.username}</h3>
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={handleChange("email")}
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange("password")}
          className="form-control"
          value={password}
        />
      </div>

      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  const redirectUser = success => {
    if (success) {
      return <Redirect to="/cart" />;
    }
  };
  return (
    <BookhouseLayout
      pagetitle="Profile"
      pagedescription="Update your profile"
      className="container-fluid"
    >
      <h2 className="mb-4">Profile update</h2>
      {profileUpdate(username, email, password)}
      {redirectUser(success)}
    </BookhouseLayout>
  );
};

export default Profile;
