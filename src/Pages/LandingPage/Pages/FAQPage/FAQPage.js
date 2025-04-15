import React, { useState } from "react";
import "./styles.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BsBoxArrowUpRight } from "react-icons/bs";

export default function FAQPage() {
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

  const [baggage, setBaggage] = useState([
    {
      question: "What is the baggage allowance?",
      answer:
        "Economy class passengers are allowed one carry-on bag (8kg) and one checked bag (23kg). Business class passengers get additional allowance.",
      visible: false,
    },
    {
      question: "When should I arrive at the airport?",
      answer:
        "For domestic flights, arrive 2 hours before departure. For international flights, arrive 3 hours before departure.",
      visible: false,
    },
    {
      question: "Can I check-in online?",
      answer:
        "Yes, online check-in opens 24 hours before departure and closes 2 hours before the flight.",
      visible: false,
    },
  ]);

  const [flightservices, setFlightservices] = useState([
    {
      question: "Do you offer in-flight meals?",
      answer: "Yes, complimentary meals are available on long-haul flights.",
      visible: false,
    },
    {
      question: "Can I change my flight date?",
      answer: "Yes, changes can be made depending on fare conditions.",
      visible: false,
    },
  ]);

  const [order, setOrder] = useState([
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy on all items, no questions asked.",
      visible: false,
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order ships, you'll receive an email with tracking information.",
      visible: false,
    },
    {
      question: "Can I purchase items again after returning them?",
      answer: "Yes, you're welcome to reorder any item after a return.",
      visible: false,
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach us via email at support@example.com or call (123) 456-7890.",
      visible: false,
    },
  ]);
  
  return (
    <div className="faqPageBaseContainer">
      <div className="faqPageBaseHeaderContainer">
        <h1>
          Need some help. Here are some of the recurrently asked questions that
          can help you. If you need some help out of them then go on to the
          other's section where you can find your solution or can contact us.
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
        <div className="faqPageBaseContentItemContainer">
          {baggage.map((item, indexTop) => {
            return (
              <div className="faqPageBaseContentItemBaseContainer">
                <div
                  className="questionContainer"
                  onClick={() => {
                    let demo = [...baggage];
                    demo[indexTop] = {
                      ...demo[indexTop],
                      visible: !demo[indexTop].visible,
                    };
                    setBaggage([...demo]);
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
        <div className="faqPageBaseContentItemContainer">
          {flightservices.map((item, indexTop) => {
            return (
              <div
                key={indexTop}
                className="faqPageBaseContentItemBaseContainer"
              >
                <div
                  className="questionContainer"
                  onClick={() => {
                    const updated = [...flightservices];
                    updated[indexTop] = {
                      ...updated[indexTop],
                      visible: !updated[indexTop].visible,
                    };
                    setFlightservices(updated);
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
        <div className="faqPageBaseContentItemContainer">
          {order.map((item, indexTop) => {
            return (
              <div className="faqPageBaseContentItemBaseContainer">
                <div
                  className="questionContainer"
                  onClick={() => {
                    let demo = [...order];
                    demo[indexTop] = {
                      ...demo[indexTop],
                      visible: !demo[indexTop].visible,
                    };
                    setOrder([...demo]);
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
        <div className="faqPageBaseContentItemContainer">
          <div className="faqPageBaseContentItemQueryContainer">
            <h2>You can ask for assistance with our Chatbot</h2>
            <BsBoxArrowUpRight />
          </div>
          <div className="faqPageBaseContentItemQueryContainer">
            <h2>Or you can contact us by clicking here</h2>
            <BsBoxArrowUpRight />
          </div>
        </div>
      </div>
    </div>
  );
}
