import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { api } from "../config/API";

export default function Payment() {
  const createOrder = (data) => {
    return fetch(`${api}/payment/create-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        cart: [
          {
            sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
            quantity: "YOUR_PRODUCT_QUANTITY",
          },
        ],
      }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create PayPal order");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error creating PayPal order:", error);
      // Handle error (e.g., show an error message to the user)
    });
  };

  const onApprove = (data) => {
    return fetch(`${api}/payment/capture_paypal_order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to capture PayPal order");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error capturing PayPal order:", error);
      // Handle error (e.g., show an error message to the user)
    });
  };

  return (
    <>
      <PayPalButtons
        createOrder={(data) => createOrder(data)}
        onApprove={(data) => onApprove(data)}
      />
    </>
  );
}