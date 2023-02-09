const express = require("express");
const cors = require("cors");
const Transaction = require("./models/Transaction");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/api/test", (req, res) => {
  res.json("test ok");
});

app.post("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { name, description, datetime, price } = req.body;
  const transaction = await Transaction.create({
    name,
    description,
    datetime,
    price,
  });

  res.json(transaction);
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});

// sNmarwvAs4vULepf  -- mongo db password
