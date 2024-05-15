import React, { useState, useEffect } from 'react';
import './style.css';
import { fetchUser } from "../../services/userService"
import { fetchPaymentByUser, updatePayment } from '../../services/paymentService';
import { statusEnum, paymentMethodEnum } from '../../utility/utils';

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    fetchUser(getUserName())
      .then((res) => {
        fetchPaymentByUser(res.id)
          .then((res) => {
            setPayments(res);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getUserName = () => {
    return sessionStorage.getItem("username");
  };

  const handlePayPayment = (id) => {
    const payment = payments.find(payment => payment.id === id);
    if (payment) {
      updatePayment(payment)
        .then((res) => {
          alert("Payment has been updated")
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      alert("Payment not found");
    }
  }

return (
  <div className="payment-table-container">
    <h2>Payments List</h2>
    <table className="payment-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Order ID</th>
          <th>Payment Type</th>
          <th>Amount</th>
          <th>Payment Date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {payments.map(payment => (
          <tr key={payment.id}>
            <td>{payment.id}</td>
            <td>{payment.idOrder}</td>
            <td>{paymentMethodEnum(payment.paymentType)}</td>
            <td>{payment.amount}</td>
            <td>{payment.paymentDate}</td>
            <td>{statusEnum(payment.status)}</td>
            <td>
              {payment.status === 2 ? <button onClick={() => handlePayPayment(payment.id)}>Pay</button> : "no action"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default PaymentTable;
