import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loopDaily, setLoopDaily] = useState(false);
  const audioRef = useRef(new Audio(process.env.PUBLIC_URL + "/sound.mp3"));

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const response = await axios.get("http://localhost:5000/api/events");
    setEvents(response.data);
  };

  const addEvent = async () => {
    await axios.post("http://localhost:5000/api/events", { title, date, time, loopDaily });
    fetchEvents();
    alert("Event Added");
  };

  const deleteEvent = async (id) => {
    await axios.delete(`http://localhost:5000/api/events/${id}`);
    fetchEvents();
  };

  const startVoiceRecognition = (setter, type) => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-IN";
    recognition.start();

    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript;
      
      if (type === "date") {
        const dateMatch = transcript.match(/(\d{1,2})\D+(\d{1,2})\D+(\d{4})/);
        if (dateMatch) {
          const formattedDate = `${dateMatch[3]}-${dateMatch[2].padStart(2, "0")}-${dateMatch[1].padStart(2, "0")}`;
          setter(formattedDate);
          return;
        }
      } else if (type === "time") {
        const timeMatch = transcript.match(/(\d{1,2})[:.]?(\d{2})? ?(AM|PM|am|pm)?/i);
        if (timeMatch) {
          let [_, hours, minutes = "00", period] = timeMatch;
          hours = parseInt(hours);
          if (period) {
            period = period.toUpperCase();
            if (period === "PM" && hours !== 12) hours += 12;
            if (period === "AM" && hours === 12) hours = 0;
          }
          const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.padStart(2, "0")} ${period || ""}`.trim();
          setter(formattedTime);
          return;
        }
      }
      setter(transcript);
    };
  };

  return (
    <div style={{ textAlign: "center", maxWidth: "500px", margin: "auto", padding: "20px", border: "1px solid black", borderRadius: "10px", background: "#f9f9f9", color: "black" }}>
      <h2 style={{ fontWeight: "bold" }}>Calendar</h2>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ flex: 1, color: "black", padding: "10px" }} />
        <button onClick={() => startVoiceRecognition(setTitle)} style={{ background: "none", border: "none", cursor: "pointer", marginLeft: "5px" }}>🎤</button>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ flex: 1, color: "black", padding: "10px" }} />
        <button onClick={() => startVoiceRecognition(setDate, "date")} style={{ background: "none", border: "none", cursor: "pointer", marginLeft: "5px" }}>🎤</button>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ flex: 1, color: "black", padding: "10px" }} />
        <button onClick={() => startVoiceRecognition(setTime, "time")} style={{ background: "none", border: "none", cursor: "pointer", marginLeft: "5px" }}>🎤</button>
      </div>
      <button onClick={() => setLoopDaily(!loopDaily)} style={{ padding: "10px", width: "100%", margin: "5px", background: loopDaily ? "green" : "gray", color: "white" }}>
        {loopDaily ? "Looping Daily" : "Loop Daily"}
      </button>
      <button onClick={addEvent} style={{ padding: "10px", width: "100%", margin: "5px", background: "blue", color: "white" }}>Add Event</button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {events.map((event) => (
          <li key={event._id} style={{ padding: "5px 0" }}>
            <button onClick={() => { setSelectedEvent(event); setShowDetails(true); }} style={{ color: "black", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
              {event.title} (Show Details)
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;