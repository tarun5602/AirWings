import React from "react";
import { useLocation } from "react-router-dom";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";
import "./styles.css";

// PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  section: {
    marginBottom: 10,
    padding: 10,
    border: "1px solid #eee",
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontWeight: "bold",
    color: "#444",
  },
});

// Component for PDF content
const TripPDF = ({ trip }) => (
  <Document>
    <Page style={styles.page} size={"A4"}>
      <Text style={styles.title}>Flight Ticket</Text>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Flight Number:</Text>
          <Text>{trip.flightNo}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>From:</Text>
          <Text>{trip.fromLocation}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>To:</Text>
          <Text>{trip.toLocation}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Departure:</Text>
          <Text>
            {trip.fromDate} at {trip.fromTime}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Arrival:</Text>
          <Text>
            {trip.toDate} at {trip.toTime}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Terminal:</Text>
          <Text>{trip.terminal}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Gate:</Text>
          <Text>{trip.gate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Seat:</Text>
          <Text>{trip.seat}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Class:</Text>
          <Text>{trip.class}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Passengers:</Text>
          <Text>{trip.passengers}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total Price:</Text>
          <Text>{trip.totalPrice}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Baggage:</Text>
          <Text>{trip.baggage}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text>{trip.status}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

// Main component
export default function ViewPDF() {
  const location = useLocation();
  const { tripDetails } = location.state || {};

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
          <TripPDF trip={tripDetails} />
        </PDFViewer>
      </div>
    </div>
  );
}
