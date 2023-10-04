require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/router");
require("./cronJobs");

app.use(express.json());
app.use(cors());
app.use(routes);

const port = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
