import { useState } from "react";
import axios from "axios";
import QRCode from "qrcode.react";

function App() {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");

  const handleShorten = async () => {
    const res = await axios.post("/api/shorten", {
      originalUrl: url,
    });
    setShort(res.data.shortUrl);
  };

  return (
    <div style={{textAlign:"center",marginTop:"100px"}}>
      <h1>LinkForge</h1>
      <input onChange={(e)=>setUrl(e.target.value)} placeholder="Enter URL"/>
      <button onClick={handleShorten}>Shorten</button>
      {short && <div>
        <p>{short}</p>
        <QRCode value={short}/>
      </div>}
    </div>
  );
}

export default App;
