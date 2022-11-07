const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://posts-srv-clusterip:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios
    .post("http://comments-srv-clusterip:4001/events", event)
    .catch((err) => {
      console.log(err.message);
    });
  axios.post("http://query-srv-clusterip:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  axios
    .post("http://moderation-srv-clusterip:4003/events", event)
    .catch((err) => {
      console.log(err.message);
    });
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
