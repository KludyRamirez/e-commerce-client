import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import { useState } from "react";
import { changeStatus } from "../../functions/admin";
import { toast } from "react-toastify";

const Orders = ({ orders, user, loadOrders }) => {
  const [keyword, setKeyword] = useState("");
  const [selectedOption, setSelectedOption] = useState("Processing");

  const searched = (keyword) => (order) =>
    order && order.orderdBy.name.toLowerCase().includes(keyword);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status Updated");
      loadOrders();
    });
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleBothChange = (e, order) => {
    handleStatusChange(order._id, e.target.value);
    handleSelectChange(e);
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
                <div>
                  <select
                    onChange={(e) => handleBothChange(e, order)}
                    className="form-control"
                    defaultValue={order.orderStatus}
                    name="status"
                  >
                    <option
                      value="Processing"
                      disabled={
                        selectedOption === "Completed" ||
                        selectedOption === "Dispatched"
                      }
                    >
                      Processing
                    </option>
                    <option
                      value="Dispatched"
                      disabled={selectedOption === "Completed"}
                    >
                      Dispatched
                    </option>
                    <option
                      value="Completed"
                      disabled={selectedOption === "Processing"}
                    >
                      Completed
                    </option>
                  </select>
                </div>
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
