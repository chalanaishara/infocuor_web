import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function SessionBooking() {
  const [formData, setFormData] = useState({
    sessionType: "indoor",
    date: "",
    timeSlot: "",
  });

  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ CREATE BOOKING
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        formData,
        {
          headers: {
            Authorization: "Bearer YOUR_TOKEN_HERE", // ⚠️ replace later
          },
        }
      );

      setMessage(res.data.message);

      setFormData({
        sessionType: "indoor",
        date: "",
        timeSlot: "",
      });

      fetchBookings();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  // ✅ GET BOOKINGS
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookings",
        {
          headers: {
            Authorization: "Bearer YOUR_TOKEN_HERE",
          },
        }
      );
      setBookings(res.data);
    } catch {
      console.log("Failed to load bookings");
    }
  };

  // ✅ CANCEL BOOKING
  const cancelBooking = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/bookings/${id}`,
        {
          headers: {
            Authorization: "Bearer YOUR_TOKEN_HERE",
          },
        }
      );
      fetchBookings();
    } catch {
      alert("Cancel failed");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container">
      <h1>Session Booking</h1>

      <form onSubmit={handleSubmit} className="form">
        <label>Session Type</label>
        <select
          name="sessionType"
          value={formData.sessionType}
          onChange={handleChange}
        >
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="timeSlot"
          placeholder="Time Slot (10AM - 11AM)"
          value={formData.timeSlot}
          onChange={handleChange}
          required
        />

        <button type="submit">Book Session</button>
      </form>

      {message && <p className="message">{message}</p>}

      <h2>Your Sessions</h2>

      {bookings.length === 0 ? (
        <p>No bookings</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="card">
            <p><b>Type:</b> {b.sessionType}</p>
            <p><b>Date:</b> {new Date(b.date).toLocaleDateString()}</p>
            <p><b>Time:</b> {b.timeSlot}</p>
            <p><b>Status:</b> {b.paymentStatus}</p>

            <button onClick={() => cancelBooking(b._id)}>
              Cancel
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default SessionBooking;