import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const PaymentTable = () => {
    //TODO: Fake data
  const [payments, setPayments] = useState([
    { id: 1, idOrder: 101, paymentType: 'Credit Card', amount: 100.00, paymentDate: '2024-05-01', status: 'Completed' },
    { id: 2, idOrder: 102, paymentType: 'PayPal', amount: 50.00, paymentDate: '2024-05-02', status: 'Pending' },
    { id: 3, idOrder: 103, paymentType: 'Bank Transfer', amount: 200.00, paymentDate: '2024-05-03', status: 'Failed' },
  ]);

  const navigate = useNavigate();

  const handlePayPayment = (id) => {
    console.log(`Zatwierdzanie płatności o ID: ${id}`);
    navigate('/payment-form');
  };

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
              <td>{payment.paymentType}</td>
              <td>{payment.amount}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.status}</td>
              <td>
                <button>Edit</button>
                {payment.status === 'Pending' && <button onClick={() => handlePayPayment(payment.id)}>Pay</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
