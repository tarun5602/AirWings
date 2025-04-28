import React, { useEffect, useRef, useState } from "react";
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

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const backImageRef = useRef(null);

  const [offers, setOffers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [color] = useState("var(--baseColor)");

  const destinations = [
    {
      id: 1,
      city: "Paris",
      country: "France",
      price: 599,
      image: ASSETS.destinationParisImage,
    },
    {
      id: 2,
      city: "Santorini",
      country: "Greece",
      price: 799,
      image: ASSETS.destinationSantoriniImage,
    },
    {
      id: 3,
      city: "Tokyo",
      country: "Japan",
      price: 899,
      image: ASSETS.destinationTokyoImage,
    },
    {
      id: 4,
      city: "Bali",
      country: "Indonesia",
      price: 699,
      image: ASSETS.destinationBaliImage,
    },
  ];

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
              title={"Get Started"}
              width={"20%"}
              height={"9%"}
              color={"var(--baseColor)"}
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
                  <h2>{destination.city}</h2>
                  <p
                    style={{
                      color: "var(--grayColor)",
                    }}
                  >
                    {destination.country}
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
                      <div className="testimonialsCardImageContainer">
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
    </div>
  );
}
