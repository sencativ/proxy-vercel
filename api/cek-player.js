const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

app.get("/cek-player", async (req, res) => {
  const { nickname } = req.query;

  if (!nickname) {
    return res.status(400).json({ error: "Nickname is required" });
  }

  try {
    const response = await fetch(`http://45.59.168.36:4568/v1/players/${nickname}`, {
      headers: {
        Authorization: "Bearer andarakerenbangetturqouisejaya"
      }
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Gagal konek ke ServerTap:", error);
    res.status(500).json({ error: "Failed to connect to ServerTap" });
  }
});

module.exports = app;
