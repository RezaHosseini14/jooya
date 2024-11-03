const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express();
const constants = require("./utils/constants");

app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.post("/api/v1/search/content", async (req, res) => {
  try {
    const response = await axios.post(`${constants.services.searchApi}/api/v1/search/content`, req.body, {
      headers: { "Content-Type": "application/json" },
    });
    res.send(response.data);
  } catch (error) {
    console.error("Error in API call:", error.status ? error.status : 500);
    res.status(error.status ? error.status : 500).send(error.message);
  }
});

app.post("/api/v1/search/get-content", async (req, res) => {
  try {
    const response = await axios.post(`${constants.services.searchApi}/api/v1/search/get-content`, req.body, {
      headers: { "Content-Type": "application/json" },
    });
    res.send(response.data);
  } catch (error) {
    console.error("Error in API call:", error.status ? error.status : 500);
    res.status(error.status ? error.status : 500).send(error.message);
  }
});
app.post("/api/v1/search/hightlight-content", async (req, res) => {
  try {
    const response = await axios.post(`${constants.services.searchApi}/api/v1/search/hightlight-content`, req.body, {
      headers: { "Content-Type": "application/json" },
    });
    res.send(response.data);
  } catch (error) {
    console.error("Error in API call:", error.status ? error.status : 500);
    res.status(error.status ? error.status : 500).send(error.message);
  }
});
const PORT = process.env.NODE_ENV === "development" ? constants.serverPort || 3000 : 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
