# ✈️ AirWings – Flight Booking Web Application

AirWings is a full-stack flight booking platform designed to streamline and enhance the air travel experience. It allows users to search for flights, book tickets, manage trips, track baggage, interact with an AI chatbot, and make secure payments – all in one place.

---

## 🔧 Tech Stack

### 🔹 Frontend
- React.js
- Axios
- React Router DOM
- Custom CSS (for UI components like navbar, loader, inputs, icons)
  
### 🔹 Backend
- Django
- Django REST Framework
- SQLite (Relational Database)

### 🔹 Integrations
- Razorpay – Secure Payment Gateway
- Rasa – AI-powered Chatbot

---

## 📌 Features

- 🔍 Flight Search & Booking  
- 🧳 Baggage Tracking  
- 🧾 Trip Management  
- 💬 AI Chatbot for Real-time Support  
- 💳 Secure Payments using Razorpay  
- 📝 Feedback & Contact Forms  
- 📱 Fully Responsive Design  
- 🎨 Custom UI Components built from scratch

---

## 🧑‍💻 How to Run the Project Locally

### 🔹 Prerequisites
- Node.js & npm
- Python 3.x
- Django & Django REST Framework
- Rasa (optional for chatbot)
  
### 🔹 Backend Setup
```bash
cd airwings_backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver at 8000 port

### 🔹 Frontend Setup
cd airwings_frontend
npm install
npm start

The frontend will run on http://localhost:3000 and the backend on http://localhost:8000.

---

✅ Testing
Manual testing for all user interactions and booking scenarios
API tested via Postman
Validations implemented on frontend to prevent empty or incorrect inputs
Responsive UI tested across browsers

---

📜 License
This project is part of an academic submission and is free to use for educational purposes.