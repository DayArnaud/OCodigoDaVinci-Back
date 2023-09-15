require("dotenv").config();
const express = require("express");
const knex = require("./connection");
// const routes = require("./routes/router");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
// app.use(routes);

app.get("/", async (req, res) => {
  try {
    const users = await knex("users");
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = app;
