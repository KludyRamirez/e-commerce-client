import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div>
    <p>
      <span>Order Id: {order.paymentIntent.id}</span>
      {" / "}
      <span>
        Amount:{" / "}
        {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
          style: "currency",
          currency: "PHP",
        })}
      </span>
      {" / "}
      <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
      {" / "}
      <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
      {" / "}
      <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
      {" / "}
      <span>Name: {order && order.orderdBy && order.orderdBy.name}</span>
      {" / "}
      <span>Email: {order && order.orderdBy && order.orderdBy.email}</span>
      {" / "}
      <span>Address: {order && order.orderdBy && order.orderdBy.address}</span>
      {" / "}
      <span>
        Ordered on:{" / "}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      {" / "}
      <br />
      {showStatus && (
        <span className="badge bg-primary text-black">
          STATUS: {order.orderStatus}
        </span>
      )}
    </p>
  </div>
);

export default ShowPaymentInfo;
