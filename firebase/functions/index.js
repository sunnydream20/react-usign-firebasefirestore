const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors");

const corsHandler = cors({origin: true});

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const FMP_API_KEY = process.env.FMP_API_KEY || functions.config().fmp.api_key;

exports.dynamicApiCall = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method === "OPTIONS") {
      // Send response to OPTIONS requests
      res.set("Access-Control-Allow-Methods", "GET, POST");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      res.set("Access-Control-Max-Age", "3600");
      res.status(204).send("");
      return;
    }

    try {
      const {endpoint, params, version} = req.body;

      const url =
          `https://financialmodelingprep.com/api/${version}/${endpoint}?${params}&apikey=${FMP_API_KEY}`;

      const response = await axios.get(url);

      res.json(response.data);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal server error");
    }
  });
});
