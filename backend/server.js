const express = require("express");
const app = express();
const env = require("dotenv");
const port = process.env.PORT || 8006;
const router = require("./routes");

app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
