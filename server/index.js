require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors({
  origin: "https://linkforge-three-gilt.vercel.app",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const Url = mongoose.model("Url", {
  originalUrl: String,
  shortId: String,
  clicks: { type: Number, default: 0 }
});

app.post("/api/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  const shortId = shortid.generate();
  const newUrl = await Url.create({ originalUrl, shortId });

  res.json({
    shortUrl: `${process.env.BASE_URL}/${shortId}`
  });
});

app.get("/:id", async (req, res) => {
  const url = await Url.findOne({ shortId: req.params.id });
  if (!url) return res.sendStatus(404);

  url.clicks++;
  await url.save();

  res.redirect(url.originalUrl);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));
// force redeploy
