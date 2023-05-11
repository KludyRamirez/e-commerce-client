import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { AiOutlineEye, AiOutlineShopping } from "react-icons/ai";
import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  const soldOutChecker = () => {
    if (product.quantity <= 0) {
      return (
        <div className="d-flex justify-content-center">
          <span className="fs-4 fw-semibold text-danger">Sold Out</span>
        </div>
      );
    } else {
      return (
        <>
          <div className="d-flex justify-content-around">
            <Link to={`/product/${slug}`}>
              <div
                className="colorborder1 p-3 shopaction d-flex justify-content-center align-items-center"
                eventKey="1"
              >
                <AiOutlineEye size={20} color="#231f20" />
              </div>
            </Link>
          </div>

          <Tooltip title={tooltip}>
            <div
              className="d-flex justify-content-center "
              onClick={handleAddToCart}
              disabled={product.quantity <= 0}
            >
              <div
                className="colorborder1 p-3 shopaction d-flex justify-content-center align-items-center"
                eventKey="1"
              >
                <AiOutlineShopping size={20} color="#231f20" />
              </div>
            </div>
          </Tooltip>
        </>
      );
    }
  };

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  // destructure
  const { images, title, description, slug, price } = product;
  return (
    <>
      <div className="container-fluid pb-4">
        <Card
          className="bcard"
          cover={
            <img
              src={images && images.length ? images[0].url : laptop}
              style={{ height: "200px", objectFit: "cover" }}
            />
          }
          actions={[
            <div className="d-flex justify-content-center gap-4 bgcard">
              {soldOutChecker()}
            </div>,
          ]}
        >
          <div className="d-flex align-items-center justify-content-around productCardCon gap-1">
            <div className="fw-semibold fs-6">{`${title}`}</div>
            <div className="mb-2">
              {product && product.ratings && product.ratings.length > 0 ? (
                showAverage(product)
              ) : (
                <div className="text-center pt-1 pb-3">No rating yet</div>
              )}
            </div>
            <div className="fw-bold fs-6">{`₱ ${price}`}</div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ProductCard;
