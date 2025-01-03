import express from "express";
import connectDB from "../DB/connectDB.js";

const router = express.Router();

router.get("/tables-details", async (req, res) => {
  try {
    const query = `SELECT * FROM Tables`;
    const db = await connectDB();
    const [results] = await db.query(query);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to send table details !!" });
  }
});

export default router;
