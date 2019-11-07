import { BOOKHOUSEAPI } from "../config";
export const addCategory = (userId, token, categoryname) => {
  return fetch(`${BOOKHOUSEAPI}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(categoryname)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const addProducts = (userId, token, product) => {
  return fetch(`${BOOKHOUSEAPI}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getcategories = () => {
  return fetch(`${BOOKHOUSEAPI}/category/all`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const listOrders = (bookhouseuserId, token) => {
  return fetch(`${BOOKHOUSEAPI}/order/list/${bookhouseuserId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
