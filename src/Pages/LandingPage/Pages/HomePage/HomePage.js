import React, { useEffect, useRef } from "react";
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

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const backImageRef = useRef(null);

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

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fleet Manager at AirGlobal",
      image: ASSETS.testimonialOneImage,
      content:
        "SkyFlow has transformed how we manage our fleet. The real-time insights are invaluable.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Operations Director at SkyLink",
      image: ASSETS.testimonialTwoImage,
      content:
        "The efficiency gains we've achieved with SkyFlow are beyond what we expected. Incredible system!",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "CEO at AeroTech",
      image: ASSETS.testimonialThreeImage,
      content:
        "Best decision we made was switching to SkyFlow. Our operations have never been smoother.",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Aviation Manager at Pacific Air",
      image: ASSETS.testimonialFourImage,
      content:
        "The AI-powered insights have helped us reduce costs by 30%. Simply outstanding!",
    },
  ];

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
    <div
      className="HomePageBaseContainer"
      style={
        {
          // flex: 1,
          // backgroundColor: "var(--whiteColor)",
          // display: "flex",
          // position: "relative",
        }
      }
    >
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
            <div className="testimonialsCardContainer">
              {testimonials.map((testimonial) => (
                <div className="testimonialsCard" key={testimonial.id}>
                  <div className="testimonialsCardImageBaseContainer">
                    <div
                      className="testimonialsCardImageContainer"
                      style={{ backgroundImage: `url(${testimonial.image})` }}
                    ></div>
                    <div className="testimonialsCardImageTextContainer">
                      <h3>{testimonial.name}</h3>
                      <p style={{color: "var(--grayColor)"}}>{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="testimonialsCardInfo">
                    <p>{testimonial.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <CustomFooter />
      </div>
    </div>
  );
}
