require("dotenv").config();
const express = require("express");
const knex = require("./connection");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
// app.use(routes);

// const routes = require("./routes/router");

app.get("/", async (req, res) => {
  try {
    const users = await knex("users");
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
