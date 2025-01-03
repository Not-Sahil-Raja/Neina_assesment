import { BookingSummary } from "@/types";
import React from "react";

interface BookingTicketProps {
  bookingSummary: BookingSummary;
}

const BookingTicket: React.FC<BookingTicketProps> = ({ bookingSummary }) => {
  return (
    <div>
      <div className="p-4 border mt-9 justify-stretch mx-auto  border-dashed flex gap-2 w-fit rounded shadow-md">
        <div className="flex flex-col grow  leading-none">
          <p className=" text-2xl font-semibold mb leading-none mt-1">
            {bookingSummary.customer_name}
          </p>

          <p className=" text-black/75 font-medium mb-4">
            {bookingSummary.contact}
          </p>
          <p className=" font-medium text-xl">
            {new Date(bookingSummary.date).toLocaleDateString("en-GB")}
          </p>
          <div className=" flex gap-10 mt-3">
            <p className="flex flex-col text-lg font-bold ">
              <span className="text-sm font-medium leading-none">
                Time Slot
              </span>{" "}
              {bookingSummary.time_slot}
            </p>
            <p className="flex flex-col text-lg font-bold ">
              <span className="text-sm font-medium leading-none">Guests</span>{" "}
              {bookingSummary.guest_count}
            </p>
          </div>
        </div>
        <div className=" flex flex-col w-1/3">
          <h3 className=" text-3xl font-bold mb-3">
            Hot
            <br /> Plate
          </h3>
          <h5 className=" break-words leading-tight font-medium">
            Enjoy your meal and have a great day!
          </h5>
        </div>
      </div>
    </div>
  );
};

export default BookingTicket;
