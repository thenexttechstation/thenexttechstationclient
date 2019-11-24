import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import BookHouseImageCart from "./BookHouseImageCart";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { green } from "@material-ui/core/colors";
import { addItem, updateCart, removeProductFromCart } from "./Cart";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
const BookCardCart = ({
  bookhouseproduct,
  showViewProductButton = true,
  viewAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(bookhouseproduct.count);
  const [state, setState] = React.useState({
    outofstock: false,
    instock: true
  });
  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      button: {
        margin: theme.spacing(1),
        size: "large"
      },

      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5)
      }
    }
  }));
  const classes = useStyles();
  const longText = `
  This Book is currently Out of stock.Please write to thenexttechstation@gmail.com for further enquires
  `;
  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${bookhouseproduct._id}`} className="mr-2">
          <button className="btn btn-primary btn-lg btn-block">
            View Product
          </button>
        </Link>
      )
    );
  };

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <Button
          fullWidth="true"
          variant="contained"
          color="secondary"
          onClick={() => {
            removeProductFromCart(bookhouseproduct._id);
            setRun(!run);
          }}
          className={classes.button}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      )
    );
  };

  const handleChange = bookhouseproductId => event => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateCart(bookhouseproductId, event.target.value);
    }
  };

  const showCartUpdate = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group ">
            <div className="input-group-prepend">
              <button
                type="button"
                disabled
                class="btn btn-danger btn-lg btn-block"
              >
                Quantity
              </button>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(bookhouseproduct._id)}
            />
          </div>
        </div>
      )
    );
  };
  const handleDelete = () => {
    alert(
      "The book " +
        bookhouseproduct.bookname +
        " is available" +
        " and Quantity is: " +
        bookhouseproduct.quantity
    );
  };

  const addToCart = () => {
    console.log("inside addtocart");
    addItem(bookhouseproduct, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const showAddToCartButton = viewAddToCartButton => {
    return (
      viewAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-warning btn-lg btn-block"
        >
          Add to card1
        </button>
      )
    );
  };
  const showStock = quantity => {
    return quantity > 0 ? (
      <div className={classes.root}>
        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  edge="start"
                  checked={state.instock}
                  onChange={handleChange("instock")}
                  value="instock"
                  disabled="true"
                  color="default"
                  size="medium"
                />
              }
              label="Book In Stock"
            />
          </FormGroup>
        </FormControl>
        <Chip
          icon={<FaceIcon />}
          label="Book in Stock"
          onDelete={handleDelete}
          color="primary"
          size="medium"
          fullwidth="true"
          deleteIcon={<DoneIcon />}
        />
      </div>
    ) : (
      <div>
        <Tooltip title={longText}>
          <Button className={classes.button}>Book is Out of Stock</Button>
        </Tooltip>
      </div>
    );
  };
  return (
    <div>
      <div className="card">
        {showRemoveButton(showRemoveProductButton)}

        <div className="card-header name">
          <h4>{bookhouseproduct.bookname}</h4>
        </div>
        <div className="card-body">
          {shouldRedirect(redirect)}
          <BookHouseImageCart item={bookhouseproduct} url="product" />
          <p className="lead mt-2">
            {bookhouseproduct.bookdescription.substring(0, 100)}
          </p>
          <p className="black-9">
            <h3>Category: </h3>
            {bookhouseproduct.bookhousecategory &&
              bookhouseproduct.bookhousecategory.categoryname}
          </p>
          <p className="black-8">
            <h3> Added on {moment(bookhouseproduct.createdAt).fromNow()}</h3>
          </p>
          <p className="black-10">
            <h3>Author:</h3>
            {bookhouseproduct.author}
          </p>
          <h3>Rs {bookhouseproduct.price}</h3>

          <br />

          {showStock(bookhouseproduct.quantity)}
          <br />
          {showViewButton(showViewProductButton)}

          {showAddToCartButton(viewAddToCartButton)}

          {showCartUpdate(cartUpdate)}
        </div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default BookCardCart;
