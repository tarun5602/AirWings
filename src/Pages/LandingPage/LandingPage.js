import { useEffect, useState, useRef } from "react";
import "./styles.css";
import CustomNavBar from "../../components/CustomNavBar/CustomNavBar";
import { Outlet, useNavigate } from "react-router-dom";
import ROUTES from "../../Config/routes";
import ASSETS from "../../assets";
import axios from "axios";

function LandingPage() {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("isLogin")) {
      navigate(ROUTES.homePage);
    } else {
      navigate(ROUTES.loginPage);
    }
  }, []);

  const handleChat = () => {
    setShowChat((prev) => !prev);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { from: "user", text: message };
    setChatHistory((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}chatbot/`, {
        sender_id: "frontend_user",
        message: message,
      });

      const botReplies = res.data.responses.map((reply) => ({
        from: "bot",
        text: reply,
      }));

      setChatHistory((prev) => [...prev, ...botReplies]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { from: "bot", text: "Something went wrong. Try again." },
      ]);
    }

    setMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="landingPageBaseContainer">
      <div className="landingPageNavbarContainer">
        <CustomNavBar />
      </div>
      <div className="landingPageRouteContainer">
        <Outlet />
        <div className="landingPageBootBaseContainer">
          {showChat && (
            <div className="landingPageChatBaseContainer">
              <div className="chatHeader">ChatBot</div>

              <div className="chatMessages">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`chatMessage ${msg.from === "bot" ? "bot" : "user"}`}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="chatInputArea">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="chatInput"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button className="chatSendButton" onClick={sendMessage}>
                  Send
                </button>
              </div>
            </div>
          )}
          <button
            onClick={handleChat}
            className="landingPageBootButtonContainer"
          >
            <img src={ASSETS.chatBootIcon} className="landingPageBootIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
