const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const authRoutes = require("./src/routes/auth");
const invoiceRoutes = require("./src/routes/invoice");
const userRoutes = require("./src/routes/user");

mongoose
  .connect(
    "mongodb://localhost:27017"
    // "mongodb+srv://shridhar:OCPCHqrLx8a4UDhz@cluster0.xt2hg3o.mongodb.net/"
  )
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((e) => {
    console.log(e);
  });

const PORT = 4000;

app.use(cors());
app.use(express.json()); // tells express we are going to receive data in json format from req.body f
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", userRoutes);

// app.get("/", (req, res) => {
//   res.send("Here we go again!");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
