import React from "react";
import { BOOKHOUSEAPI } from "../config";

const ShowImage = ({ item, url }) => (
  <div>
    <img
      src={`${BOOKHOUSEAPI}/${url}/image/${item._id}`}
      alt={item.name}
      className="card-img-top"
      style={{ maxHeight: "20%", maxWidth: "40%" }}
    />
  </div>
);

export default ShowImage;
