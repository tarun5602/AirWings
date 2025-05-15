import React from "react";
import { useLocation } from "react-router-dom";
import "./styles.css";
import CustomPayment from "../../../../../../../../components/CustomPayment/CustomPayment";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function CheckOut() {
  const location = useLocation();
  const { flightDetail, profileDetail, baggageList, passportNumber } =
    location.state || {};

  return (
    <div className="checkoutBaseContainer">
      <h2 style={{ textAlign: "center" }}>Checkout</h2>
      <div className="checkoutContainer">
        <h3>Personal Details</h3>
        <div className="checkoutGridBaseContianer">
          <div className="checkoutGridContainer">
            <p>
              {profileDetail?.first_name ?? ""} {profileDetail?.last_name ?? ""}
            </p>
          </div>
          <div className="checkoutGridContainer">
            <p>{profileDetail?.age ?? ""}</p>
          </div>
          <div className="checkoutGridContainer">
            <p>{profileDetail?.gender ?? ""}</p>
          </div>
          <div className="checkoutGridContainer">
            <p>{profileDetail?.email ?? ""}</p>
          </div>
          <div className="checkoutGridContainer">
            <p>{profileDetail?.phone_number ?? ""}</p>
          </div>
        </div>
      </div>

      <div className="checkoutContainer">
        <h3>Flight Details</h3>
        <div className="checkoutGridBaseContianer">
          <div className="checkoutGridContainer">
            <p>{flightDetail?.flight_number ?? ""}</p>
          </div>
          <div className="checkoutGridContainer">
            <p>{flightDetail?.airline ?? ""}</p>
          </div>
          <div className="checkoutGridContainer">
            <p>
              {flightDetail?.departure ?? ""} - {flightDetail?.arrival ?? ""}
            </p>
          </div>
          <div className="checkoutGridContainer">
            <p>
              {new Date(
                flightDetail?.departure_time ?? ""
              ).toLocaleDateString()}{" "}
              -{" "}
              {new Date(flightDetail?.arrival_time ?? "").toLocaleDateString()}
            </p>
          </div>
          <div className="checkoutGridContainer">
            <p>
              {new Date(
                flightDetail?.departure_time ?? ""
              ).toLocaleTimeString()}{" "}
              -{" "}
              {new Date(flightDetail?.arrival_time ?? "").toLocaleTimeString()}
            </p>
          </div>
          <div className="checkoutGridContainer">
            <p>{flightDetail?.flights_class ?? ""}</p>
          </div>
        </div>
      </div>

      <div className="checkoutContainer">
        <h3>Baggae Details</h3>
        <div className="checkoutGridBaseContianer">
          <div className="checkoutGridContainer">
            <p>{baggageList?.weight ?? ""}Kg</p>
          </div>
          <div className="checkoutGridContainer">
            <p>{baggageList?.dimensions ?? ""}</p>
          </div>
          <div className="checkoutGridContainer">
            <p>{baggageList?.quantity ?? ""}</p>
          </div>
        </div>
      </div>

      <div className="checkoutContainer">
        <h3>Passport Details</h3>
        <div className="checkoutGridBaseContianer">
          <div className="checkoutGridContainer">
            <p>{passportNumber?.passportNumber ?? ""}</p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          backgroundColor: "red",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "paypal",
          }}
          createOrder={(data, actions) => {
            alert("Create ORDER DONE");
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "5.00",
                    currency_code: "USD",
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              alert(`Payment completed by ${details.payer.name.given_name}`);
              console.log("Full Payment Details:", details);
            });
          }}
          onError={(err) => {
            console.error("PayPal Checkout Error", err);
          }}
        />
      </div>
    </div>
  );
}
