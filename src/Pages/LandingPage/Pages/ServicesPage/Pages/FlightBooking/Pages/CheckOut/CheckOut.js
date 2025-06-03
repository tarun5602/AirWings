import React from "react";
import axios from "axios";
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
    members = [],
  } = location.state || {};

  const basePrice = flightDetail?.price ?? 500;
  const gstRate = 0.18;
  const platformFeeRate = 0.02;

  const gstAmount = basePrice * gstRate;
  const platformFee = basePrice * platformFeeRate;

  const totalAmount = basePrice + gstAmount + platformFee;
  const totalAmountInPaise = Math.round(totalAmount * 100);

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
        <div className="checkoutGridBaseContainer">
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
        <div className="checkoutGridBaseContainer">
          <div className="checkoutGridContainer">
            <p>{baggageList?.[0]?.weight ?? ""} Kg</p>
          </div>
          <div className="checkoutGridContainer">
            <p>{baggageList?.[0]?.dimensions ?? ""} Dimensions</p>
          </div>
          <div className="checkoutGridContainer">
            <p>{baggageList?.[0]?.quantity ?? ""} Bag</p>
          </div>
        </div>
      </div>

      {members.length > 0 && (
        <div className="checkoutContainer">
          <h3>Additional Members</h3>
          <div className="checkoutGridBaseContainer">
            {members.map((member, index) => (
              <div key={index} className="checkoutGridContainer">
                <p>
                  <strong>Full Name:</strong> {member.full_name}
                </p>
                <p>
                  <strong>Age:</strong> {member.age}
                </p>
                <p>
                  <strong>Gender:</strong> {member.gender}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="checkoutContainer">
        <h3>Payment Summary</h3>
        <div>
          <div className="checkoutGridContainer">
            <p style={{ fontWeight: "bold" }}>Base Price:</p>
            <p>₹{basePrice.toFixed(2)}</p>
          </div>
          <div className="checkoutGridContainer">
            <p style={{ fontWeight: "bold" }}>GST (18%):</p>
            <p>₹{gstAmount.toFixed(2)}</p>
          </div>
          <div className="checkoutGridContainer">
            <p style={{ fontWeight: "bold" }}>Platform Fee (2%):</p>
            <p>₹{platformFee.toFixed(2)}</p>
          </div>
          <div className="checkoutGridContainer" style={{ fontWeight: "bold" }}>
            <p>Total Amount:</p>
            <p>₹{totalAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="checkoutPayButton">
        <CustomPayment
          amount={totalAmountInPaise}
          onSuccess={async (response) => {
            try {
              const username = localStorage.getItem("username");
              const flightId = flightDetail.id;
              const profileId = profileDetail.id;
              let user_id;

              const userRes = await axios.get(
                `${process.env.REACT_APP_API_URL}profile?username=${username}`
              );
              const profile = userRes.data?.data;
              if (!profile?.user_id) {
                toast.error("Invalid profile response.");
                return;
              }
              user_id = profile.user_id;

              const baggageIds = [];

              for (const baggage of baggageList) {
                const baggageRes = await axios.post(
                  `${process.env.REACT_APP_API_URL}baggage/`,
                  {
                    user: user_id,
                    weight: baggage.weight,
                    flight: flightId,
                    dimensions: baggage.dimensions,
                    description: baggage.description,
                    quantity: baggage.quantity,
                  }
                );

                if (baggageRes.data.status) {
                  baggageIds.push(baggageRes.data.data.baggage_id);
                } else {
                  toast.error("Failed to add baggage.");
                  return;
                }
              }

              // Save bookings and capture booking IDs
              const bookingIds = [];
              for (const baggageId of baggageIds) {
                console.log("Booking Payload", {
                  user_id: user_id,
                  profile_id: profileId,
                  flight_id: flightId,
                  baggage_id: baggageId,
                  username: username,
                  num_passengers: members.length + 1,
                  members: members,
                });

                const bookingRes = await axios.post(
                  `${process.env.REACT_APP_API_URL}booking/`,
                  {
                    user_id: user_id,
                    profile_id: profileId,
                    flight_id: flightId,
                    baggage_id: baggageId,
                    username: username,
                    num_passengers: members.length + 1,
                    members: members,
                  }
                );

                if (!bookingRes.data.status) {
                  toast.error("Booking failed for baggage ID " + baggageId);
                  return;
                }

                bookingIds.push(bookingRes.data.data.booking_id);
              }

              // Save members — assuming each belongs to profile or booking
              for (const member of members) {
                const memberRes = await axios.post(
                  `${process.env.REACT_APP_API_URL}members/`, // adjust endpoint if different
                  {
                    full_name: member.full_name,
                    age: member.age,
                    gender: member.gender,
                    booking_id: bookingIds, // or use booking_id if needed
                  }
                );

                if (!memberRes.data.status) {
                  toast.error("Failed to add member: " + member.full_name);
                  return;
                }
              }

              toast.success("Booking successful!");
              navigate(ROUTES.servicesPageMyTripsPage);
            } catch (error) {
              console.error(error);
              console.error("Booking error after payment:", error);
              toast.error("Booking error after payment.");
            }
          }}
        />
      </div>
    </div>
  );
}
