import React from "react";
import "./styles.css";
import CustomButton from "../../../../../../components/CustomButton/CustomButton";
import { FaArrowRight } from "react-icons/fa6";
import { IoAirplaneOutline } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { MdOutlineAccessTime } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { ImPriceTags } from "react-icons/im";
import { LuBaggageClaim } from "react-icons/lu";

export default function MyTrips() {
  const flights = [
    {
      id: 1,
      flightNo: "AB123",
      fromLocation: "Pune",
      fromDate: "12 December 2022",
      fromTime: "10:00 AM",
      toLocation: "Delhi",
      toDate: "12 December 2022",
      toTime: "12:00 PM",
      terminal: "T4",
      gate: "G7",
      seat: "12A",
      class: "Economy",
      passengers: "2 Persons",
      totalPrice: "1500",
      Baggage: "2x23Kg",
      status: "On Time",
    },
  ];

  return (
    <div className="myTripsBaseContainer">
      <div className="myTripHeadingContainer">
        <h2>My Trips</h2>
        <p>Manage your upcoming flights and travel plans</p>
      </div>
      <div className="myTripInformationBaseContainer">
        {flights.map((item) => (
          <div key={item.id} className="myTripInformationItemBaseContainer">
            <div className="myTripInformationHeadingBaseContainer">
              <IoAirplaneOutline size={29} />
              <div className="myTripInformationHeadingContainer">
                <div className="myTripInformationHeading">
                  <p>Flight Number</p>
                  <h4>{item.flightNo}</h4>
                </div>
                <div className="myTripInformationHeadingButton">
                  <CustomButton title={item.status} />
                </div>
              </div>
            </div>
            <div className="myTripInfromationMainItemBaseContainer">
              <div className="myTripInformationMainItemLoctionBaseContainer">
                <div className="myTripInformationMainItemFromLocationBaseContainer">
                  <p>From</p>
                  <h4>{item.fromLocation}</h4>
                  <div className="myTripInfromationMainItemFromLoactionDateTimeContainer">
                    <MdDateRange />
                    <p>{item.fromDate}</p>
                    <MdOutlineAccessTime />
                    <p>{item.fromTime}</p>
                  </div>
                </div>
                <div className="myTripInformationMainItemLocationArrowContainer">
                  <FaArrowRight size={30} />
                </div>
                <div className="mytripInformationMainItemToLocationBaseLoaction">
                  <p>To</p>
                  <h4>{item.toLocation}</h4>
                  <div className="myTripInfromationMainItemFromLoactionDateTimeContainer">
                    <MdDateRange />
                    <p>{item.toDate}</p>
                    <MdOutlineAccessTime />
                    <p>{item.toTime}</p>
                  </div>
                </div>
              </div>
              <div className="myTripInformationMainItemTypeBaseContainer">
                <div className="myTripInformationMainItemTypeTerminalContianer">
                  <p>Terminal</p>
                  <h4>{item.terminal}</h4>
                </div>
                <div className="myTripInformationMainItemTypeGateContianer">
                  <p>Gate</p>
                  <h4>{item.gate}</h4>
                </div>
                <div className="myTripInformationMainItemTypeSeatContianer">
                  <p>Seat</p>
                  <h4>{item.seat}</h4>
                </div>
                <div className="myTripInformationMainItemTypeClassContianer">
                  <p>Class</p>
                  <h4>{item.class}</h4>
                </div>
              </div>
              <div className="mytripInformationMainItemPriceBaseContainer">
                <div className="myTripInformationMainItemPricePassengersBaseContainer">
                  <MdOutlinePeopleAlt />
                  <div className="myTripInformationMainItemPricePassengerContainer">
                    <p>Passengers</p>
                    <h4>{item.passengers}</h4>
                  </div>
                </div>
                <div className="myTripInforamtionMainItemPricePriceBaseContainer">
                  <ImPriceTags />
                  <div className="myTripInformationMainItemPricePriceContainer">
                    <p>Total Price</p>
                    <h4>{item.totalPrice}</h4>
                  </div>
                </div>
                <div className="myTripInformationMainItemPriceBaggageBaseContainer">
                  <LuBaggageClaim />
                  <div className="myTripInformationMainItemPriceBaggageContainer">
                    <p>Baggage</p>
                    <h4>{item.baggage}</h4>
                  </div>
                </div>
              </div>
              <div className="myTripsInformationMainItemModifactionButtonBaseContainer">
                <CustomButton title={"Modification"}/>
                <CustomButton title={"Cancel"}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
