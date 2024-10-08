import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "ausername";
const yourPassword = "apassword";
const yourAPIKey = "1ba5f0f7-6e2b-4289-9803-4404f3af2a89";
const yourBearerToken = "2491d907-57dc-4570-b996-7f815606d0d9";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });  
});

app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/random");
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  } catch (error) {
    res.status(404).send("Error:", error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
  } catch (error) {
    res.status(404).send("Error:", error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/filter", {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      }
    });
  } catch (error) {
    res.status(404).send("Error:", error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/secrets/2", {
      headers: {Authorization: `Bearer ${yourBearerToken}`},
    });
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  } catch (error) {
    res.status(404).send("Error:", error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
