import React, { useEffect, useState } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import ASSETS from "../../../../../../../../assets";
import axios from "axios";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    backgroundColor: "#fff",
  },
  mainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  wings: {
    color: "#debb89",
  },
  confirmedSection: {
    flexDirection: "row",
    alignItems: "center",
    color: "#21ab23",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  greeting: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  routeBaseRow: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  routeRow: {
    flexDirection: "column",
  },
  arrowIcon: {
    width: 25,
    height: 25,
  },
  BaseInfoContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  gridItem: {
    width: "25%",
    marginBottom: 10,
  },
  pricingBreakdown: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    borderTopStyle: "solid",
    gap: 6,
  },

  pricingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  label: {
    fontSize: 12,
    color: "#444",
  },

  value: {
    fontSize: 12,
    color: "#000",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#000",
    borderTopStyle: "solid",
  },

  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },

  totalValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#debb89",
  },
});

const TripPDF = ({ trip, profile, baggage, members }) => {
  const gstRate = 0.18;
  const platformFeeRate = 0.02;

  const basePrice = trip.totalPrice;
  const gst = basePrice * gstRate;
  const platformFee = basePrice * platformFeeRate;
  const finalPrice = basePrice + gst + platformFee;

  return (
    <Document>
      <Page style={styles.page} size="A4">
        <View style={styles.mainHeader}>
          <Text style={styles.title}>
            Air<Text style={styles.wings}>Wings</Text>
          </Text>
          <View style={styles.confirmedSection}>
            <Image src={ASSETS.viewPdfTickIcon} style={styles.icon} />
            <Text>Booking Confirmed</Text>
          </View>
        </View>

        <View style={styles.greeting}>
          <Text>Hi,</Text>
          <Text>
            Your flight from <Text>{trip.fromLocation}</Text> to{" "}
            <Text>{trip.toLocation}</Text> is confirmed.
          </Text>
        </View>

        <View style={styles.routeBaseRow}>
          <View style={styles.routeRow}>
            <Text>
              {trip.fromLocation} {trip.fromTime}
            </Text>
            <Text>{trip.fromDate}</Text>
          </View>
          <Image src={ASSETS.viewPdfArrowRightIcon} style={styles.arrowIcon} />
          <View style={styles.routeRow}>
            <Text>
              {trip.toLocation} {trip.toTime}
            </Text>
            <Text>{trip.toDate}</Text>
          </View>
        </View>

        <View style={styles.BaseInfoContainer}>
          <Text style={styles.heading}>Passenger Information</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text>Name</Text>
              <Text>
                1. {profile.first_name} {profile.last_name}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text>Age</Text>
              <Text>{profile.age}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text>Gender</Text>
              <Text>
                {profile.gender === "M"
                  ? "Male"
                  : profile.gender === "F"
                  ? "Female"
                  : profile.gender_other || "Other"}
              </Text>
            </View>
          </View>
          {members && members.length > 0 && (
            <>
              {members.map((member, index) => (
                <View style={styles.grid} key={member.id}>
                  <View style={styles.gridItem}>
                    <Text>
                      {index + 2}. {member.full_name}
                    </Text>
                  </View>
                  <View style={styles.gridItem}>
                    <Text>{member.age}</Text>
                  </View>
                  <View style={styles.gridItem}>
                    <Text>
                      {member.gender === "M"
                        ? "Male"
                        : member.gender === "F"
                        ? "Female"
                        : "Other"}
                    </Text>
                  </View>
                </View>
              ))}
            </>
          )}
        </View>

        <View style={styles.BaseInfoContainer}>
          <Text style={styles.heading}>Flight Details</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text>Terminal</Text>
              <Text>{trip.terminal}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text>Gate</Text>
              <Text>{trip.gate}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text>Seat</Text>
              <Text>{trip.seat}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text>Class</Text>
              <Text>{trip.class}</Text>
            </View>
          </View>
        </View>

        <View style={styles.BaseInfoContainer}>
          <Text style={styles.heading}>Baggage Details</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text>Baggage ID</Text>
              <Text>{baggage.baggage_id}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text>Dimensions</Text>
              <Text>{baggage.dimensions}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text>Quantity</Text>
              <Text>{baggage.quantity}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text>Status</Text>
              <Text>{baggage.status}</Text>
            </View>
          </View>
        </View>

        <View style={styles.BaseInfoContainer}>
          <Text style={styles.heading}>Total Pricing</Text>
          <View style={styles.pricingBreakdown}>
            <View style={styles.pricingRow}>
              <Text style={styles.label}>Base Fare</Text>
              <Text style={styles.value}>{basePrice.toFixed(2)}</Text>
            </View>
            <View style={styles.pricingRow}>
              <Text style={styles.label}>GST (18%)</Text>
              <Text style={styles.value}>{gst.toFixed(2)}</Text>
            </View>
            <View style={styles.pricingRow}>
              <Text style={styles.label}>Platform Fee (2%)</Text>
              <Text style={styles.value}>{platformFee.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>
                Final Price (Incl. Tax & Fees)
              </Text>
              <Text style={styles.totalValue}>{finalPrice.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default function ViewPDF() {
  const location = useLocation();
  console.log(location.state);
  const { tripDetails, profileDetails, baggageDetails } = location.state || {};

  useEffect(() => {
    const fetchBaggage = async () => {
      const username = localStorage.getItem("username");
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}baggage/`);
        const baggageList = res.data.data || [];

        const filtered = baggageList.filter(
          (item) => item.user?.username === username
        );
      } catch (err) {
        console.error("Failed to fetch baggage details:", err);
      }
    };
    fetchBaggage();
  }, []);

  return (
    <div className="view-pdf-container">
      <h2>Your Trip Summary</h2>
      <div style={{ flex: "1" }}>
        <PDFViewer
          style={{
            width: "100%",
            height: "68vh",
            border: "none",
            borderRadius: "15px",
          }}
        >
          <TripPDF
            trip={tripDetails}
            profile={profileDetails}
            baggage={baggageDetails}
            members={location.state?.members || []}
          />
        </PDFViewer>
      </div>
    </div>
  );
}
