const express = require("express");
const mongoose = require("mongoose");
const app = express();

const authRoutes = require("./src/routes/auth");
const invoiceRoutes = require("./src/routes/invoice");

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

const PORT = 3000;

app.use(express.json()); // tells express we are going to receive data in json format from req.body f
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use("/api", invoiceRoutes);

// app.get("/", (req, res) => {
//   res.send("Here we go again!");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
