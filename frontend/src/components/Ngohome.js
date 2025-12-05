import React, { useEffect } from "react";
import { Users, Heart, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
      console.log("Voice Command:", command);

      if (command.includes("community support")) navigate("/community");
      else if (command.includes("health") || command.includes("wellness")) navigate("/health");
      else if (command.includes("emergency") || command.includes("helpline")) navigate("/helpline");
      else if (command.includes("volunteer")) navigate("/ngoc");
    };

    recognition.onerror = (error) => {
      console.error("Speech recognition error:", error);
    };

    recognition.start();

    return () => recognition.stop();
  }, [navigate]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f3e8ff", color: "#4c1d95" }}>
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: "white",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.png" alt="NGO Logo" style={{ height: "40px", width: "40px", marginRight: "12px" }} />
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#4c1d95" }}>NGO Connect</h1>
        </div>
        <div>
          <button
            style={{
              color: "#4c1d95",
              fontWeight: "600",
              padding: "8px 16px",
              marginRight: "12px",
              border: "2px solid #4c1d95",
              borderRadius: "8px",
              backgroundColor: "white",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onClick={() => navigate("/ngoc")}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#4c1d95")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
          >
            Volunteer
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "32px 16px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "16px" }}>Welcome to NGO Connect</h1>
          <p style={{ fontSize: "20px", color: "#6b7280" }}>Making a difference, one step at a time</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              padding: "24px",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <Users style={{ margin: "auto", color: "#4c1d95", marginBottom: "16px" }} size={48} />
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>Community Support</h2>
            <p style={{ color: "#6b7280" }}>Join our network to help those in need</p>
          </div>

          <div
            style={{
              padding: "24px",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <Heart style={{ margin: "auto", color: "#4c1d95", marginBottom: "16px" }} size={48} />
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>Health & Wellness</h2>
            <p style={{ color: "#6b7280" }}>Providing care and assistance to communities</p>
          </div>

          <div
            style={{
              padding: "24px",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <Phone style={{ margin: "auto", color: "#4c1d95", marginBottom: "16px" }} size={48} />
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>Emergency Helpline</h2>
            <p style={{ color: "#6b7280" }}>Immediate support for urgent needs</p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#4c1d95",
            borderRadius: "12px",
            padding: "48px",
            textAlign: "center",
            color: "white",
          }}
        >
          <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px", color: "white" }}>
            Get Involved Today
          </h2>
          <p style={{ fontSize: "20px", marginBottom: "24px", color: "white" }}>
            Join us in making a difference for those in need
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
