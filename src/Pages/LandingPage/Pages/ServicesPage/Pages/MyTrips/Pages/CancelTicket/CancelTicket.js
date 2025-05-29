import React from "react";
import "./styles.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import CustomButton from "../../../../../../../../components/CustomButton/CustomButton";
import ROUTES from "../../../../../../../../Config/routes";

export default function CancelTicket() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { tripDetails, airlineName, bookingId } = state || {};
  console.log("Trip Details for Cancellation:", tripDetails);

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  const refundPolicy = {
    "Air India": {
      EC: 0.6,
      BC: 0.9,
      VC: 0.8,
    },
    IndiGo: {
      EC: 0.5,
      BC: 0.9,
      VC: 0.8,
    },
    Vistara: {
      EC: 0.5,
      BC: 0.9,
      VC: 0.8,
    },
    SpiceJet: {
      EC: 0.5,
      BC: 0.9,
      VC: 0.8,
    },
    GoAir: {
      EC: 0.5,
      BC: 0.9,
      VC: 0.8,
    },
  };

  const originalPrice = parseFloat(tripDetails.totalPrice);
  const airline = airlineName?.trim();
  const fareClass = tripDetails.class;

  const refundRate = refundPolicy[airline]?.[fareClass] ?? 0;

  const refundAmount = originalPrice * refundRate;
  const cancellationFee = originalPrice - refundAmount;

  const handleConfirmCancellation = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}cancel-booking/`,
        {
          booking_id: bookingId,
        }
      );

      if (response.data.success) {
        toast.success("Booking cancelled successfully", {
          onClose: () => navigate(ROUTES.servicesPageMyTripsPage),
        });
      } else {
        toast.error("Cancellation failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  const handleKeepTicket = async () => {
    navigate(ROUTES.servicesPageMyTripsPage);
  };

  return (
    <div className="cancelTicketBaseContainer">
      <div className="cancelTicketContainer">
        <div className="cancelTicketHeadingContainer">
          <h3>Flight Cancellation</h3>
          <p>Please review the cancellation details below</p>
        </div>

        <div className="cancelTicketContentBaseContainer">
          <p style={{ fontSize: "19px", fontWeight: "bold" }}>Flight Details</p>

          <div className="cancelTicketContentFlightBaseContainer">
            <div className="cancelTicketContentFlightContainer">
              <p style={{ fontWeight: "bold" }}>Flight Number</p>
              <p>{tripDetails.flightNo}</p>
            </div>
            <div className="cancelTicketContentFlightContainer">
              <p style={{ fontWeight: "bold" }}>Passengers</p>
              <p>{tripDetails.passengers}</p>
            </div>
            <div className="cancelTicketContentFlightContainer">
              <p style={{ fontWeight: "bold" }}>Airline Name</p>
              <p>{airline}</p>
            </div>
            <div className="cancelTicketContentFlightContainer">
              <p style={{ fontWeight: "bold" }}>Flight Class</p>
              <p>{tripDetails.class}</p>
            </div>
            <div className="cancelTicketContentFlightContainer">
              <p style={{ fontWeight: "bold" }}>From</p>
              <p>{tripDetails.fromLocation}</p>
            </div>
            <div className="cancelTicketContentFlightContainer">
              <p style={{ fontWeight: "bold" }}>To</p>
              <p>{tripDetails.toLocation}</p>
            </div>
            <div className="cancelTicketContentFlightContainer">
              <p style={{ fontWeight: "bold" }}>Departure</p>
              <p>
                {tripDetails.fromDate} at {tripDetails.fromTime}
              </p>
            </div>
            <div className="cancelTicketContentFlightContainer">
              <p style={{ fontWeight: "bold" }}>Arrival</p>
              <p>
                {tripDetails.toDate} at {tripDetails.toTime}
              </p>
            </div>
          </div>

          <div className="cancelTicketContentRefundBaseContainer">
            <p style={{ fontWeight: "bold" }}>Refund Fee Details</p>
            <div className="cancelTicketContentRefundContainer">
              <div className="cancelTicketContentRefundPrice">
                <p>Original Price </p>
                <p>{formatPrice(originalPrice)}</p>
              </div>
              <div className="cancelTicketContentRefundPrice">
                <p style={{ color: "var(--redColor)" }}>
                  Cancellation Fee{" "}
                  <span
                    style={{
                      color: "var(--grayColor)",
                    }}
                  >
                    ({Math.round((1 - refundRate) * 100)}% cut)
                  </span>
                </p>
                <p style={{ color: "var(--redColor)" }}>
                  {formatPrice(cancellationFee)}
                </p>
              </div>
              <div className="cancelTicketContentRefundTotalPrice">
                <p style={{ fontWeight: "bold" }}>Total Price</p>
                <p style={{ color: "var(--greenColor)", fontWeight: "bold" }}>
                  {formatPrice(refundAmount)}
                </p>
              </div>
            </div>
          </div>

          <div className="cancelTicketContentButtonContainer">
            <CustomButton
              width={"50%"}
              title={"Confirm Cancellation"}
              onClick={handleConfirmCancellation}
            />
            <CustomButton
              width={"50%"}
              title={"Keep My Booking"}
              onClick={handleKeepTicket}
            />
          </div>
        </div>
      </div>
      <ToastContainer draggable autoClose={5000} transition={Bounce} />
    </div>
  );
}
