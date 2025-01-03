import express from "express";
import connectDB from "../DB/connectDB.js"; // Adjust the path as necessary to import your db instance

const router = express.Router();

router.post("/create-reservation", async (req, res) => {
  const { table_id, date, time_slot, guest_count, customer_name, contact } =
    req.body;

  try {
    const db = await connectDB();
    const query = `
        INSERT INTO Reservations (table_id, date, time_slot, guest_count, customer_name, contact)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
    await db.query(query, [
      table_id,
      date,
      time_slot,
      guest_count,
      customer_name,
      contact,
    ]);

    const [reservationDetail] = await db.query(
      `SELECT * FROM Reservations WHERE table_id = ? AND date = ? AND time_slot=?`,
      [table_id, date, time_slot]
    );
    res.status(201).json({
      message: "Reservation created successfully.",
      reservationDetail,
    });
  } catch (err) {
    console.log(err);
    if (err.code === "ER_DUP_ENTRY") {
      res.status(409).json({
        message:
          "This table is already reserved for the selected date and time.",
      });
    } else {
      res
        .status(500)
        .json({ message: "Internal server error.", error: err.message });
    }
  }
});

router.get("/available-tables", async (req, res) => {
  const { table_id, date } = req.query;
  // console.log(date, table_id);
  try {
    const db = await connectDB();
    const query = `
    SELECT time_slot  
    FROM Reservations r
    WHERE r.date = ?
    AND r.table_id = ?`;

    const [results] = await db.query(query, [date, table_id]);
    const reservedSlots = results.map((row) => row.time_slot);
    return res.status(200).json(reservedSlots);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to send details" });
  }
});

router.get("/get-bookings", async (req, res) => {
  try {
    const { customer_name, contact } = req.query;
    const query = `SELECT * FROM Reservations WHERE customer_name=? AND contact=?`;
    const db = await connectDB();
    const [bookings] = await db.query(query, [customer_name, contact]);
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to send booking list !!" });
  }
});

router.delete("/delete-booking", async (req, res) => {
  const { reservation_id } = req.body;

  try {
    const db = await connectDB();
    const query = `DELETE FROM Reservations WHERE reservation_id = ?`;
    const [result] = await db.query(query, [reservation_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    res.status(200).json({ message: "Reservation deleted successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to delete reservation.", error: error.message });
  }
});
export default router;
