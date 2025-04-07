import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/LandingPage/Pages/HomePage/HomePage";
import ServicesPage from "./Pages/LandingPage/Pages/ServicesPage/ServicesPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import ROUTES from "./Config/routes";
import ContactUsPage from "./Pages/LandingPage/Pages/ContactUsPage/ContactUspage";
import AboutUsPage from "./Pages/LandingPage/Pages/AboutUsPage/AboutUsPage";
import FAQPage from "./Pages/LandingPage/Pages/FAQPage/FAQPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.landingPage} element={<LandingPage />}>
          <Route path={ROUTES.homePage} element={<HomePage />} />
          <Route path={ROUTES.servicesPage} element={<ServicesPage />} />
          <Route path={ROUTES.contactUsPage} element={<ContactUsPage/>} />
          <Route path={ROUTES.aboutUsPage} element={<AboutUsPage/>}/> 
          <Route path={ROUTES.FAQPage} element={<FAQPage/>} />
        </Route>
        <Route path={ROUTES.loginPage} element={<LoginPage />} />
        <Route path={ROUTES.registerPage} element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;