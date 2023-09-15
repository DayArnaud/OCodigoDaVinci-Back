require("dotenv").config();
const app = require("./server");

// app.get("/", async (req, res) => {
//   return res.json("API está ok!");
// });

const port = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${port}`);
});
