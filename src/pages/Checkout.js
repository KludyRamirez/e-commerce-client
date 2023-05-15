import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  saveUserCity,
  saveUserState,
  saveUsePostalCode,
  saveUserCountry,
  applyCoupon,
  createCashOrderForUser,
  saveUserProvince,
  saveUserPostalCode,
} from "../functions/user";
import { Form, Button } from "react-bootstrap";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [city, setCity] = useState("");
  const [citySaved, setCitySaved] = useState(false);
  const [province, setProvince] = useState("");
  const [provinceSaved, setProvinceSaved] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [postalCodeSaved, setPostalCodeSaved] = useState(false);
  const [country, setCountry] = useState("");
  const [countrySaved, setCountrySaved] = useState(false);
  const [coupon, setCoupon] = useState("");

  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is empty. Contniue shopping.");
    });
  };

  const saveAddressToDb = (e) => {
    e.preventDefault();
    console.log(saveAddressToDb);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.addressuser) {
        setAddressSaved(true);
        toast.success("Address Saved Successfully!");
      }
    });
  };

  const saveCityToDb = (e) => {
    e.preventDefault();
    console.log(saveCityToDb);
    saveUserCity(user.token, city).then((res) => {
      if (res.data.cityuser) {
        setCitySaved(true);
      }
    });
  };

  const saveProvinceToDb = (e) => {
    e.preventDefault();
    console.log(saveProvinceToDb);
    saveUserProvince(user.token, province).then((res) => {
      if (res.data.provinceuser) {
        setProvinceSaved(true);
      }
    });
  };

  const savePostalCodeToDb = (e) => {
    e.preventDefault();
    console.log(savePostalCodeToDb);
    saveUserPostalCode(user.token, postalCode).then((res) => {
      if (res.data.postalcodeuser) {
        setPostalCodeSaved(true);
      }
    });
  };

  const saveCountryToDb = (e) => {
    e.preventDefault();
    console.log(saveCountryToDb);
    saveUserCountry(user.token, country).then((res) => {
      if (res.data.countryuser) {
        setCountrySaved(true);
      }
    });
  };

  const saveAllToDb = (e) => {
    e.preventDefault();
    saveAddressToDb(e);
    saveCityToDb(e);
    saveProvinceToDb(e);
    savePostalCodeToDb(e);
    saveCountryToDb(e);
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showAddress = () => {
    return (
      <Form onSubmit={saveAllToDb}>
        <Form.Group controlId="address">
          <Form.Label>Mailing Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address, apt, space, floor, bld."
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="province">
          <Form.Label>Province</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Province"
            // value={province}
            required
            onChange={(e) => setProvince(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            // value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            // value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    );
  };

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control"
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Apply
      </button>
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>

        {showAddress()}

        <hr />
        <h4>Got Coupon?</h4>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total: {total}</p>

        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2">
            Discount Applied: Total Payable: ${totalAfterDiscount}
          </p>
        )}

        <div className="row">
          <div className="col-md-6">
            {COD ? (
              <button
                className="btn btn-primary"
                disabled={
                  // !addressSaved ||
                  !citySaved ||
                  // !provinceSaved ||
                  // !postalCodeSaved ||
                  // !countrySaved ||
                  !products.length
                }
                onClick={createCashOrder}
              >
                Place Order
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={
                  // !addressSaved ||
                  !citySaved ||
                  // !provinceSaved ||
                  // !postalCodeSaved ||
                  // !countrySaved ||
                  !products.length
                }
                onClick={() => history.push("/payment")}
              >
                Place Order
              </button>
            )}
          </div>

          <div className="col-md-6">
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
