import React, { useEffect, useRef, useState, useMemo } from "react";
import "./styles.css";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import ASSETS from "../../../../assets";
import CustomFooter from "../../../../components/CustomFooter/CustomFooter";
import CustomIcon from "../../../../components/CustomIcon/CustomIcon";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../../Config/routes";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const backImageRef = useRef(null);
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [color] = useState("var(--baseColor)");

  const randomColors = [
    "#4B6587", // Slate Blue
    "#2A9D8F", // Teal Green
    "#6D6875", // Dusty Mauve
    "#3F3D56", // Deep Charcoal
    "#2C3A47", // Gunmetal
    "#7D5A50", // Warm Mocha
    "#4ECDC4", // Muted Aqua
    "#5D6D7E", // Steel Blue
    "#6C5B7B", // Elegant Purple
    "#8E8D8A", // Stone Gray
  ];

  const destinations = [
    {
      id: 1,
      state: "Delhi",
      city: "New Delhi",
      price: "2,399",
      image: ASSETS.destinationDelhiImage,
    },
    {
      id: 2,
      state: "Maharashtra",
      city: "Mumbai",
      price: "3,899",
      image: ASSETS.destinationMumbaiImage,
    },
    {
      id: 3,
      state: "Karnataka",
      city: "Bengaluru",
      price: "5,699",
      image: ASSETS.destinationBengaluruImage,
    },
    {
      id: 4,
      state: "Tamil Nadu",
      city: "Chennai",
      price: "5,878",
      image: ASSETS.destinationTamilnaduImage,
    },
  ];

  useEffect(() => {
    const checkProfileCompletion = async () => {
      try {
        const username = localStorage.getItem("username");
        const profileResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}profile?username=${username}`
        );

        if (profileResponse.data.status) {
          const profile = profileResponse.data.data;
          const isComplete =
            profile.first_name && profile.last_name;

          if (!isComplete) {
            toast.warning("Please complete your profile before proceeding.");
          }
        }
      } catch (error) {
        // toast.error(error.response.data.message);
      }
    };

    checkProfileCompletion();
  }, []);

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}offer/`
        );
        setOffers(response.data || []);
      } catch (error) {
        console.error("Error fetching offers:", error);
        setOffers([]);
      }
      setLoading(false);
    };

    fetchOffers();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}feedback/`
      );
      setTestimonials(response.data || []);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
      setTestimonials([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const initialsColorMap = useMemo(() => {
    const map = {};
    testimonials.forEach((t) => {
      map[t.id] = randomColors[Math.floor(Math.random() * randomColors.length)];
    });
    return map;
  }, [testimonials]);

  useEffect(() => {
    gsap.to(backImageRef.current, {
      scale: 10,
      scrollTrigger: {
        trigger: backImageRef.current,
        scrub: true,
        start: "top center",
        end: "bottom top",
      },
    });
  }, []);

  const booknow = () => {
    navigate(ROUTES.servicesPageFlightBookingPage);
  };

  return (
    <div className="HomePageBaseContainer">
      <div
        className="HomePageImageBaseContainer"
        style={{
          backgroundImage: `url(${ASSETS.offerSectionBackgroundImage})`,
        }}
      ></div>
      <div style={{ position: "absolute" }}>
        <section className="heroSectionBaseContainer">
          <div className="heroSectionContainerOneBase">
            <h1
              style={{
                fontSize: "50px",
              }}
            >
              Explore the World with AirWings
            </h1>
            <p
              style={{
                color: "var(--grayColor)",
                fontSize: "20px",
              }}
            >
              Your journey begins with us. Discover new horizons and create
              unforgettable memories.
            </p>
            <CustomButton
              title={"Book Now"}
              onClick={booknow}
              width={"20%"}
              height={"9%"}
            />
          </div>
          <div
            className="heroSectionContainerTwoBase"
            style={{ backgroundImage: `url(${ASSETS.heroSectionPlaneImage})` }}
          ></div>
        </section>
        <section className="popularDestinationBaseContainer">
          <h1>Find Special Prices To Favorite Destinations</h1>
          <div className="popularDestinationCardContainer">
            {destinations.map((destination) => (
              <div className="popularDestinationCardImage" key={destination.id}>
                <div
                  className="popularDestinationImageContainer"
                  style={{ backgroundImage: `url(${destination.image})` }}
                ></div>
                <div className="popularDestinationCardInfo">
                  <h2>{destination.state}</h2>
                  <p
                    style={{
                      color: "var(--grayColor)",
                    }}
                  >
                    {destination.city}
                  </p>
                  <p
                    style={{
                      color: "var(--baseColor)",
                    }}
                  >
                    Starting from ₹{destination.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="offersBaseContainer">
          <h1 ref={backImageRef}>
            Find Special Prices To Favorite Destinations
          </h1>

          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <ClipLoader color={color} size={50} />
            </div>
          ) : offers.length === 0 ? (
            <p style={{ textAlign: "center", padding: "20px" }}>
              No offers found.
            </p>
          ) : (
            <div className="offersSectionContainer">
              {offers.map((offer) => (
                <div className="offersContainer" key={offer.id}>
                  <div className="offersIconContainer">
                    <CustomIcon iconName={offer.iconName} />
                    <h2>{offer.offer}</h2>
                  </div>
                  <div className="offersInfoContainer">
                    <h2 style={{ color: "var(--baseColor)" }}>{offer.title}</h2>
                    <p>{offer.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="testimonialsBaseContainer">
          <div className="testimonialsAbsoluteBaseContainer">
            <div className="testimonialsAbsoluteBaseOneContainer"></div>
            <div style={{ flex: 2 }}></div>
            <div className="testimonialsAbsoluteBaseTwoContainer"></div>
          </div>
          <div className="testimonialsMainContentBaseContainer">
            <h1
              style={{
                fontWeight: "bold",
                textAlign: "center",
                paddingTop: "30px",
                fontSize: "30px",
              }}
            >
              Testimonials
            </h1>

            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <ClipLoader color={color} size={50} />
              </div>
            ) : testimonials.length === 0 ? (
              <p style={{ textAlign: "center", marginTop: "20px" }}>
                No testimonials available.
              </p>
            ) : (
              <div className="testimonialsCardContainer">
                {testimonials.map((testimonial) => (
                  <div className="testimonialsCard" key={testimonial.id}>
                    <div className="testimonialsCardImageBaseContainer">
                      <div
                        className="testimonialsCardImageContainer"
                        style={{
                          backgroundColor: initialsColorMap[testimonial.id],
                        }}
                      >
                        {testimonial.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="testimonialsCardImageTextContainer">
                        <h3
                          style={{ textAlign: "left" }}
                        >{`${testimonial.name[0].toUpperCase()}${testimonial.name.slice(
                          1
                        )}`}</h3>
                        <Rating size={16} initialValue={testimonial.rating} />
                      </div>
                    </div>
                    <div className="testimonialsCardInfo">
                      <p>{testimonial.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        <CustomFooter />
      </div>
      <ToastContainer draggable autoClose={5000} transition={Bounce} />
    </div>
  );
}
