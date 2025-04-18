
const express = require("express");
const router = express.Router();
const https = require("https");
require("dotenv").config();

// Route to get all provinces from all islands
router.get("/provinces", async (_, res) => {
  try {
    const islands = ['luzon', 'visayas', 'mindanao']; // Fixed typo in 'mindanao'
    const allProvinces = {};

    // Create a promise for each HTTP request
    const requests = islands.map(island => {
      return new Promise((resolve, reject) => {
        const url = `${process.env.LOCATION_API_URL}/island-groups/${island}/provinces.json`;

        https.get(url, (response) => {
          let data = "";

          // Collect chunks of data
          response.on("data", (chunk) => {
            data += chunk;
          });

          // When response completes, parse and resolve
          response.on("end", () => {
            try {
              const jsonData = JSON.parse(data);
              allProvinces[island] = jsonData;
              resolve();
            } catch (parseError) {
              reject(parseError);
            }
          });
        }).on("error", (error) => {
          reject(error);
        });
      });
    });

    // Wait for all requests to complete
    await Promise.all(requests);

    // Return all islands and provinces
    return res.status(200).json({
      success: true,
      message: "Successfully fetched provinces from all islands",
      body: [...allProvinces['luzon'], ...allProvinces["visayas"], ...allProvinces["mindanao"]],
    });

  } catch (error) {
    console.error("Unexpected error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch provinces",
      body: null,
    });
  }
});

router.post('/city-municipality', async (req, res) => {
  console.log("ROUTER CITY-MUNICPALITY")
  try {
    const url = `${process.env.LOCATION_API_URL}/provinces/${req.body.code}/cities-municipalities/`;

    https.get(url, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        try {
          const jsonData = JSON.parse(data);
          return res.status(200).json({
            success: true,
            message: "Successfully fetched cities/municipalities",
            body: jsonData
          });
        } catch (parseError) {
          return res.status(500).json({
            success: false,
            message: "Invalid JSON response from API.",
            error: parseError.message,
            rawData: data, // Include the raw data in the error response for debugging
          });
        }
      });

      response.on("error", (error) => {
        return res.status(500).json({
          success: false,
          message: "Error fetching data from API.",
          error: error.message
        });
      });
    }).on("error", (error) => {
      return res.status(500).json({
        success: false,
        message: "Error making request to API.",
        error: error.message
      });
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      error: error.message
    });
  }
});

router.post('/barangays', async (req, res) => {
  try {
    const url = `${process.env.LOCATION_API_URL}/cities-municipalities/${req.body.code}/barangays/`;

    https.get(url, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        try {
          const jsonData = JSON.parse(data);
          return res.status(200).json({
            success: true,
            message: "Successfully fetched barangays",
            body: jsonData
          });
        } catch (parseError) {
          return res.status(500).json({
            success: false,
            message: "Invalid JSON response from API.",
            error: parseError.message,
            rawData: data, // Include the raw data in the error response for debugging
          });
        }
      });

      response.on("error", (error) => {
        return res.status(500).json({
          success: false,
          message: "Error fetching data from API.",
          error: error.message
        });
      });
    }).on("error", (error) => {
      return res.status(500).json({
        success: false,
        message: "Error making request to API.",
        error: error.message
      });
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      error: error.message
    });
  }
});

module.exports = router;

