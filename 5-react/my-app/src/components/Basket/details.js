import React, { useState } from "react";
import { paymentTypeMapper, deliveryTypeMapper, paymentMethodMapper } from "../../utility/utils";


const Details = ({ user, deliveryTypes, paymentTypes, paymentMethods, totalPrice, selectPaymentType, selectDeliveryType, selectedPaymentMethod, selectedPayNow }) => {
    const [paymentTypeOption, setPaymentTypeOption] = useState("null");
    const [deliveryTypeOption, setDeliveryTypeOption] = useState("null");
    const [paymentMethodOption, setPaymentMethodOption] = useState("null");
    const [payNow, setPayNow] = useState(false);

    const handlePaymentTypeOption = (event) => {
        let value = event.target.value;
        setPaymentTypeOption(value);
        selectPaymentType(paymentTypeMapper(value))
    };

    const handleDeliveryTypeOption = (event) => {
        let value = event.target.value;
        setDeliveryTypeOption(value);
        selectDeliveryType(deliveryTypeMapper(value));
    }

    const handlePaymentMethodOption = (event) => {
        let value = event.target.value;
        setPaymentMethodOption(value);
        selectedPaymentMethod(paymentMethodMapper(value));
    }

    const handlePayNowChange = (event) => {
        setPayNow(event.target.checked);
        selectedPayNow(event.target.checked);
    };

    return (
        <div className="cart-details">
            <div style={{ width: "48%" }}>
                <h2>User Details</h2>
                <div>
                    <label>Name:</label>
                    <p>
                        <b>{user.name}</b>
                    </p>
                </div>

                <div>
                    <label>Surname:</label>
                    <p>
                        <b>{user.surname}</b>
                    </p>
                </div>

                <div>
                    <label>Address:</label>
                    <p>
                        <b>{user.address}</b>
                    </p>
                </div>
                <div>
                    <label>Selected payment type</label>
                    <p>
                        <b>{paymentTypeOption}</b>
                    </p>
                </div>

                <div>
                    <label>Selected delivery type:</label>
                    <p>
                        <b>{deliveryTypeOption}</b>
                    </p>
                </div>
                <div>
                    <label>Selected payment method:</label>
                    <p>
                        <b>{paymentMethodOption}</b>
                    </p>
                </div>
                <div>
                    <label>Total price:</label>
                    <p>
                        <b>{totalPrice}</b>
                    </p>
                </div>
            </div>
            <div style={{ width: "48%" }}>
                <h2>Payment and Delivery</h2>
                <div>
                    <label htmlFor="paymentMethod">Payment Method:</label>
                    <select
                        id="selectOptions"
                        value={paymentTypeOption}
                        onChange={handlePaymentTypeOption}
                    >
                        <option value="">Select Payment Method</option>
                        {paymentTypes.map((option) => (
                            <option key={option.id} value={option.name}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="selectOptions">Select Delivery Type:</label>
                    <select
                        id="selectOptions"
                        value={deliveryTypeOption}
                        onChange={handleDeliveryTypeOption}
                    >
                        <option value="">Select Delivery Type</option>
                        {deliveryTypes.map((option) => (
                            <option key={option.id} value={option.name}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="selectOptions">Select Payment Method:</label>
                    <select
                        id="selectOptions"
                        value={paymentMethodOption}
                        onChange={handlePaymentMethodOption}
                    >
                        <option value="">Select Payment Method</option>
                        {paymentMethods.map((option) => (
                            <option key={option.id} value={option.name}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="payNowCheckbox">Pay now</label>
                    <input type="checkbox" id="payNowCheckbox" checked={payNow} onChange={handlePayNowChange} />
                </div>
            </div>
        </div>
    );
};

export default Details;