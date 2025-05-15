import React, { useEffect, useRef } from "react";

const CustomPayment = ({ amount, onSuccess }) => {
  const paypalRef = useRef();

  useEffect(() => {
    if (!window.paypal) return;

    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toString(),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log("Order approved:", order);
          onSuccess(order); // Send to Django
        },
        onError: (err) => {
          console.error("PayPal error", err);
        },
      })
      .render(paypalRef.current);
  }, [amount, onSuccess]);

  return <div ref={paypalRef}>
  </div>;
};

export default CustomPayment;
