import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/LandingPage/Pages/HomePage/HomePage";
import ServicesPage from "./Pages/LandingPage/Pages/ServicesPage/ServicesPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import ROUTES from "./Config/routes";
import ContactUsPage from "./Pages/LandingPage/Pages/ContactUsPage/ContactUspage";
import AboutUsPage from "./Pages/LandingPage/Pages/AboutUsPage/AboutUsPage";
import FAQPage from "./Pages/LandingPage/Pages/FAQPage/FAQPage";
import FlightBooking from "./Pages/LandingPage/Pages/ServicesPage/Pages/FlightBooking/FlightBooking";
import MyTrips from "./Pages/LandingPage/Pages/ServicesPage/Pages/MyTrips/MyTrips";
import ViewPDF from "./Pages/LandingPage/Pages/ServicesPage/Pages/MyTrips/Pages/ViewPDF";
import BaggageTracking from "./Pages/LandingPage/Pages/ServicesPage/Pages/BaggageTracking/BaggageTracking";
import Support from "./Pages/LandingPage/Pages/ServicesPage/Pages/Support/Support";
import FlightBookingForm from "./Pages/LandingPage/Pages/ServicesPage/Pages/FlightBooking/Pages/FlightBookingForm/FlightBookingForm";
import CheckOut from "./Pages/LandingPage/Pages/ServicesPage/Pages/FlightBooking/Pages/CheckOut/CheckOut";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  const PAYPAL_CLIENT_ID =
    "AV5pWNw7Wf-uCYeWzAuza_NVQAYl3YXH_2gweg86Ks7HLykO3sHXagmNYEwf_1-xxW2yYV-nIAuSjD_m";

  return (
    <PayPalScriptProvider
      options={{
        clientId: PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.landingPage} element={<LandingPage />}>
            <Route path={ROUTES.homePage} element={<HomePage />} />
            <Route path={ROUTES.servicesPage} element={<ServicesPage />}>
              <Route
                path={ROUTES.servicesPageFlightBookingPage}
                element={<FlightBooking />}
              />
              <Route
                path={ROUTES.servicesPageFlightBookingFormPage}
                element={<FlightBookingForm />}
              />
              <Route
                path={ROUTES.servicesPageFlightBookingPageCheckOut}
                element={<CheckOut />}
              />
              <Route
                path={ROUTES.servicesPageMyTripsPage}
                element={<MyTrips />}
              />
              <Route
                path={ROUTES.servicesPageMyTripsPageViewPDF}
                element={<ViewPDF />}
              />
              <Route
                path={ROUTES.servicesPageBaggageTrackingPage}
                element={<BaggageTracking />}
              />
              <Route
                path={ROUTES.servicesPagesSupportPage}
                element={<Support />}
              />
            </Route>
            <Route path={ROUTES.contactUsPage} element={<ContactUsPage />} />
            <Route path={ROUTES.aboutUsPage} element={<AboutUsPage />} />
            <Route path={ROUTES.FAQPage} element={<FAQPage />} />
          </Route>
          <Route path={ROUTES.profilePage} element={<ProfilePage />} />
          <Route path={ROUTES.loginPage} element={<LoginPage />} />
          <Route path={ROUTES.registerPage} element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;
