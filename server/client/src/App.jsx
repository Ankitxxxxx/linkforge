import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!url) return alert("Enter URL");

    setLoading(true);
    try {
      const res = await axios.post(
        "https://linkforge-nlbw.onrender.com/api/shorten",
        { originalUrl: url }
      );
      setShort(res.data.shortUrl);
    } catch (err) {
      alert("Error shortening URL");
    }
    setLoading(false);
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #6a11cb, #2575fc)",
      color: "white",
      fontFamily: "sans-serif"
    }}>
      <div style={{
        background: "rgba(255,255,255,0.1)",
        padding: "30px",
        borderRadius: "15px",
        textAlign: "center",
        width: "350px"
      }}>
        <h1>🔗 LinkForge</h1>

        <input
          placeholder="Paste URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "none"
          }}
        />

        <button
          onClick={handleShorten}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: "#ff7a18",
            color: "white",
            cursor: "pointer"
          }}
        >
          {loading ? "Generating..." : "Shorten"}
        </button>

        {short && (
          <div style={{ marginTop: "15px" }}>
            <p>{short}</p>
            <button onClick={() => navigator.clipboard.writeText(short)}>
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
