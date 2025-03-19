import React from "react";
import "./styles.css";

export default function HomePage() {
  const destinations = [
    {
      id: 1,
      city: "Paris",
      country: "France",
      price: 599,
      image:
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      city: "Santorini",
      country: "Greece",
      price: 799,
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      city: "Tokyo",
      country: "Japan",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 4,
      city: "Bali",
      country: "Indonesia",
      price: 699,
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <div>
      <section className="heroSectionBaseContainer">
        <h1>Hero Section</h1>
      </section>
      <section className="popularDestinationBaseContainer">
        <h1
          style={{
            width: '100%',
            textAlign: "center",
            fontWeight: "bold",
            paddingTop: '40px',
            fontSize: "30px",
            color: "var(--whiteColor)",
          }}>
          Popular Destinations
        </h1>
        <div className="popularDestinationCardContainer">
          {destinations.map((destination) => (
            <div className="popularDestinationCardImage" key={destination.id}>
              <div className="popularDestinationImageContainer" style={{backgroundImage: `url(${destination.image})` }}></div>
              <div className="popularDestinationCardInfo">
                <h2>{destination.city}</h2>
                <p style={{
                  color: "var(--grayColor)",
                }}>{destination.country}</p>
                <p style={{
                  color: "var(--baseColor)",
                }}>Starting from ₹{destination.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="offersBaseContainer"></section>
      <section className="testimonialsBaseContainer"></section>
    </div>
  );
}
