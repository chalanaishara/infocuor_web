import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    event: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/normal-booking/",formData);

      setMessage(res.data.message);

      setFormData({
        name: "",
        email: "",
        contactNumber: "",
        event: "",
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage(
        error.response?.data?.message || "Error submitting booking"
      );
    }
  };

  return (
    <div className="container">
      <h1>Event Booking</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="event"
          placeholder="Event Name"
          value={formData.event}
          onChange={handleChange}
          required
        />

        <button type="submit">Book Now</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;