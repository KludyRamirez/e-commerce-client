import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import { useState } from "react";

const Orders = ({ orders, handleStatusChange }) => {
  const [keyword, setKeyword] = useState("");

  const searched = (keyword) => (order) =>
    order.orderStatus.toLowerCase().includes(keyword);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Product Type</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((order, i) => (
          <tr key={i}>
            <td>
              <b>{order && order.product && order.product.title}</b>
            </td>
            <td>{order && order.product && order.product.price}</td>
            <td>{order && order.product && order.product.brand}</td>
            <td>{order && order.product && order.product.color}</td>
            <td>{order && order.count}</td>
            <td>
              {order &&
              order.product &&
              order.product.shipping === "Door-to-Door Delivery" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <input
        type="search"
        placeholder="Filter"
        value={keyword}
        onChange={handleSearchChange}
        className="form-control mb-4"
      />
      {orders.filter(searched(keyword)).map((order) => (
        <div key={order._id} className="row pb-5">
          <div className="btn btn-block bg-light">
            <ShowPaymentInfo order={order} showStatus={false} />

            <div className="row">
              <div className="col-md-4">Delivery Status</div>
              <div className="col-md-8">
                <select
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="form-control"
                  defaultValue={order.orderStatus}
                  name="status"
                >
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {showOrderInTable(order)}
        </div>
      ))}
    </>
  );
};

export default Orders;
