import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import ASSETS from "../../assets/index";

const CustomPayment = ({ amount, onSuccess }) => {
  const handlePayment = () => {
    if (!amount || isNaN(amount)) {
      console.error("Invalid or missing amount for Razorpay.");
      return;
    }

    if (typeof window.Razorpay === "undefined") {
      toast.error("Razorpay SDK failed to load.");
      return;
    }

    const options = {
      key: "rzp_test_dRWiKHS7zr2Gki",
      amount: amount * 100,
      currency: "INR",
      name: "AirWings",
      description: "Flight Ticket Payment",
      image: ASSETS.paymentImage,
      handler: function (response) {
        console.log("Payment successfull:", response);
        if (onSuccess) {
          onSuccess(response);
        }
      },
      // prefill: {
      //   name: "",
      //   email: "",
      //   contact: "",
      // },
      // notes: {
      //   purpose: "Flight booking",
      // },
      theme: {
        color: "#1f1f1f",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <CustomButton onClick={handlePayment} title={`Pay ₹${amount}`} />
      <ToastContainer draggable autoClose={5000} transition={Bounce} />
    </div>
  );
};

export default CustomPayment;
