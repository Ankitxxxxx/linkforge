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
        "https://linkforge-n1bw.onrender.com/api/shorten",
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
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      fontFamily: "sans-serif"
    }}>
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "15px",
        width: "350px",
        textAlign: "center",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
      }}>
        <h1 style={{ marginBottom: "20px" }}>🔗 LinkForge</h1>

        <input
          placeholder="Paste your URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "10px"
          }}
        />

        <button
          onClick={handleShorten}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: "#667eea",
            color: "white",
            cursor: "pointer"
          }}
        >
          {loading ? "Generating..." : "Shorten"}
        </button>

        {short && (
          <div style={{ marginTop: "15px" }}>
            <p style={{ wordBreak: "break-all" }}>{short}</p>
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
