"use client";
import React from "react";
import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

interface Booking {
  reservation_id: number;
  table_id: number;
  date: string;
  time_slot: string;
  guest_count: number;
  customer_name: string;
  contact: string;
  created_at: string;
}

const Page = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking[]>([]);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const getBookings = (event: React.FormEvent) => {
    event.preventDefault();

    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_ADDR}/get-bookings`, {
        params: {
          customer_name: customerName,
          contact: customerEmail,
        },
      })
      .then((response) => {
        setSelectedBooking(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the bookings!", error);
      });
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  const formatTime = (timeString: string) => {
    return format(new Date(`2000-01-01T${timeString}`), "h:mm a");
  };

  return (
    <div className=" flex flex-col px-10 py-9 pt-24 font-halenoir">
      <div className=" mb-6">
        <form className=" flex gap-2 " onSubmit={getBookings}>
          <div className="flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </div>
          <button
            className="bg-stone-600 hover:bg-stone-700 disabled:opacity-35 h-fit mt-auto text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={customerName == "" || customerEmail == ""}
          >
            Find Bookings
          </button>
        </form>
      </div>

      <div className=" min-h-[80vh]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reservation ID</TableHead>
              <TableHead>Table</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time Slot</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedBooking.map((booking) => (
              <TableRow key={booking.reservation_id}>
                <TableCell>{booking.reservation_id}</TableCell>
                <TableCell>{booking.table_id}</TableCell>
                <TableCell>{formatDate(booking.date)}</TableCell>
                <TableCell>{formatTime(booking.time_slot)}</TableCell>
                <TableCell>{booking.guest_count}</TableCell>
                <TableCell>{booking.customer_name}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {selectedBooking.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
