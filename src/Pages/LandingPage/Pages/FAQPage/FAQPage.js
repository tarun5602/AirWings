import React, { useEffect, useState } from "react";
import "./styles.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function FAQPage({ question, answer, isopen, onclick }) {
  const [bookings, setBooking] = useState([
    {
      question: "How can I book a flight?",
      answer:
        "You can book a flight through our website, mobile app, or by calling our reservation center. Online booking is available 24/7 and offers the best deals.",
      visible: false,
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Cancellations made within 24 hours of booking are fully refundable. After that, cancellation fees may apply depending on your fare type and timing.",
      visible: false,
    },
    {
      question: "Can I change my flight date?",
      answer:
        "Yes, you can change your flight date. Changes made at least 72 hours before departure may incur a fee depending on your ticket type.",
      visible: false,
    },
  ]);

  const baggage = [
    {
      question: "What is the baggage allowance?",
      answer:
        "Economy class passengers are allowed one carry-on bag (8kg) and one checked bag (23kg). Business class passengers get additional allowance.",
    },
    {
      question: "When should I arrive at the airport?",
      answer:
        "For domestic flights, arrive 2 hours before departure. For international flights, arrive 3 hours before departure.",
    },
    {
      question: "Can I check-in online?",
      answer:
        "Yes, online check-in opens 24 hours before departure and closes 2 hours before the flight.",
    },
  ];

  const flightservices = [
    [
      {
        question: "Is Wi-Fi available on board?",
        answer:
          "Yes, Wi-Fi is available on most of our flights. Prices and packages vary by route and duration.",
      },
      {
        question: "Are meals included?",
        answer:
          "Complimentary meals are provided on international flights and select domestic routes. Special meal requests must be made 48 hours in advance.",
      },
    ],
  ];

  const order = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy on all items, no questions asked.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order ships, you'll receive an email with tracking information.",
    },
    {
      question: "Can I purchase items again after returning them?",
      answer: "Yes, you're welcome to reorder any item after a return.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach us via email at support@example.com or call (123) 456-7890.",
    },
  ];

  const others = [
    {
      text: "You can ask for assistance with our chatbot",
    },
    {
      text: "Or you can contact us by clicking here",
    },
  ];

  return (
    <div className="faqPageBaseContainer">
      <div className="faqPageBaseHeaderContainer">
        <h1>
          Nisi excepteur sunt aute officia amet nulla do ea eu enim aliqua.
          Labore proident est amet aliquip officia proident{" "}
        </h1>
      </div>
      <div className="faqPageBaseContentContainer">
        <div className="faqPageBaseContentItemContainer">
          {bookings.map((item, indexTop) => {
            return (
              <div className="faqPageBaseContentItemBaseContainer">
                <div
                  className="questionContainer"
                  onClick={() => {
                    let demo = [...bookings];
                    demo[indexTop] = {
                      ...demo[indexTop],
                      visible: !demo[indexTop].visible,
                    };
                    setBooking([...demo]);
                  }}
                >
                  <h2>{item.question}</h2>
                  {item.visible ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {item.visible && (
                  <div className="answerContainer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
