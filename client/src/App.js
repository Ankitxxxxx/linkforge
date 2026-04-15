import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");

  const handleShorten = async () => {
    console.log("Button clicked"); // 👈 DEBUG

    try {
      const res = await axios.post(
        "https://linkforge-n1bw.onrender.com/api/shorten",
        { originalUrl: url }
      );

      console.log(res.data); // 👈 DEBUG
      setShort(res.data.shortUrl);

    } catch (err) {
      console.error(err); // 👈 VERY IMPORTANT
      alert("Error shortening URL");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>LinkForge</h1>

      <input
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <br /><br />

      <button onClick={handleShorten}>
        Shorten
      </button>

      {short && <p>{short}</p>}
    </div>
  );
}

export default App;
