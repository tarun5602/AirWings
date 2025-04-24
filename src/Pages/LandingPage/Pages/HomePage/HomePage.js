import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import { BiSolidOffer } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { TbCirclePercentageFilled } from "react-icons/tb";
import { MdAirplaneTicket } from "react-icons/md";
import ASSETS from "../../../../assets";
// import ASSETS from "../../../../assets/index";
// import ASSETS from "../../../../assets/images";
import CustomFooter from "../../../../components/CustomFooter/CustomFooter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Rating } from "react-simple-star-rating";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const backImageRef = useRef(null);

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

  const Offer = [
    {
      id: 1,
      title: "Welcome Offer",
      offer: 15,
      description: "Get 20% off on your first flight",
      Icon: BiSolidOffer,
    },
    {
      id: 2,
      title: "Family Package",
      offer: 25,
      description:
        "Experience the world with family and friends with a budget friendly offer",
      Icon: IoIosPeople,
    },
    {
      id: 3,
      title: "Season Offer",
      offer: 10,
      description: "Exclusive offer for limited time period",
      Icon: TbCirclePercentageFilled,
    },
    {
      id: 4,
      title: "Early Bird",
      offer: 20,
      description:
        "Get early bird discount on booking your flight 60 days before",
      Icon: MdAirplaneTicket,
    },
  ];

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
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "right",
          position: "fixed",
          top: "0%",
          left: "0%",
          width: "100%",
          height: "100%",
          zIndex: "-1",
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
          <div className="heroSectionContainerTwoBase"></div>
        </section>
        <section className="popularDestinationBaseContainer">
          <h1
            style={{
              width: "100%",
              textAlign: "center",
              fontWeight: "bold",
              paddingTop: "40px",
              fontSize: "30px",
              color: "var(--whiteColor)",
            }}
          >
            Find Special Prices To Favorite Destinations
          </h1>
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
          <h1
            ref={backImageRef}
            style={{
              width: "100%",
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: "40px",
              fontSize: "30px",
              color: "var(--whiteColor)",
            }}
          >
            Find Special Prices To Favorite Destinations
          </h1>
          <div className="offersSectionContainer">
            {Offer.map((offer) => (
              <div className="offersContainer">
                <div className="offersIconContainer">
                  <offer.Icon className="offersIcon" size={48} />
                  <h2>{offer.offer}%</h2>
                </div>
                <div className="offersInfoContainer">
                  <h2 style={{ color: "var(--baseColor)" }}>{offer.title}</h2>
                  <p>{offer.description}</p>
                </div>
              </div>
            ))}
          </div>
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
