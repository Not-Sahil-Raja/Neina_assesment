import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import connectDB from "./DB/connectDB.js";
import dotenv from "dotenv";
import reservation from "./routes/reservations.route.js";
import tables from "./routes/tables.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api", reservation);
app.use("/api", tables);

//Connecting to the MySql Server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is Running on PORT - ${PORT} !!`);
    });
    app.on("error", (error) => {
      console.log("Error : ", error);
      throw error;
    });
  })
  .catch((err) => {
    console.error("MySql Connect Failed !!", err);
  });

// Checking if the Server is Up
app.get("/", (req, res) => {
  res.status(200).json({ messae: "API Is Working !!" });
});
