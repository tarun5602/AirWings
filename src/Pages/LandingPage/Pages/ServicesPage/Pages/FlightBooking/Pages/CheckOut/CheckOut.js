import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.css";
import CustomPayment from "../../../../../../../../components/CustomPayment/CustomPayment";
import { toast } from "react-toastify";
import ROUTES from "../../../../../../../../Config/routes";

export default function CheckOut() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    flightDetail = {},
    profileDetail = {},
    baggageList = [],
  } = location.state || {};

  return (
    <div className="checkoutBaseContainer">
      <h2 style={{ textAlign: "center" }}>Checkout</h2>
      <div className="checkoutContainer">
        <h3>Personal Details</h3>
        <div className="checkoutGridBaseContainer">
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
            <p>{baggageList?.[0]?.weight ?? ""}Kg</p>
          </div>
          <div className="checkoutGridContainer">
            <p>{baggageList?.[0]?.dimensions ?? ""}</p>
          </div>
          <div className="checkoutGridContainer">
            <p>{baggageList?.[0]?.quantity ?? ""}</p>
          </div>
        </div>
      </div>

      <div className="checkoutPayButton">
        <CustomPayment
          amount={flightDetail?.price ?? 500}
          onSuccess={(response) => {
            console.log(
              "Payment successful with ID: " + response.razorpay_payment_id
            );
            navigate(ROUTES.servicesPageMyTripsPage);
            // You can also trigger booking creation here
          }}
        />
      </div>
    </div>
  );
}
