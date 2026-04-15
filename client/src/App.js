import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");

  const handleShorten = async () => {
    try {
      const res = await axios.post(
        "https://linkforge-n1bw.onrender.com/api/shorten",
        { originalUrl: url }
      );
      setShort(res.data.shortUrl);
    } catch (err) {
      alert("Error shortening URL");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🔗 LinkForge</h1>

      <input
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <br /><br />

      <button onClick={handleShorten}>Shorten</button>

      <br /><br />

      {short && <a href={short}>{short}</a>}
    </div>
  );
}

export default App;
