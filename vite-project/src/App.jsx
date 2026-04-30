import { useState } from "react";
import "./App.css";
import NormalBooking from "./App"; // your current page
import SessionBooking from "./SessionBooking";

function MainApp() {
  const [page, setPage] = useState("normal");

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button onClick={() => setPage("normal")}>Event Booking</button>
        <button onClick={() => setPage("session")}>Session Booking</button>
      </div>

      {page === "normal" ? <NormalBooking /> : <SessionBooking />}
    </div>
  );
}

export default MainApp;