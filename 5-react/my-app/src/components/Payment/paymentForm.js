import React, { useState } from 'react';
import './style.css';

const PaymentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    idOrder: '',
    paymentType: '',
    amount: '',
    paymentDate: '',
    status: 'Pending'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="payment-form-container">
      <h2>Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="idOrder">Order ID:</label>
          <input type="text" id="idOrder" name="idOrder" value={formData.idOrder} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="paymentType">Payment Type:</label>
          <input type="text" id="paymentType" name="paymentType" value={formData.paymentType} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input type="text" id="amount" name="amount" value={formData.amount} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="paymentDate">Payment Date:</label>
          <input type="date" id="paymentDate" name="paymentDate" value={formData.paymentDate} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PaymentForm;
