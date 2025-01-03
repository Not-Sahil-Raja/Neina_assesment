"use client";
import BookingTicket from "@/components/BookingTicket";
import ReserveForm from "@/components/ReserveForm";
import { BookingSummary } from "@/types";
import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const [showBookingSummary, setShowBookingSummary] = useState<boolean>(false);
  const [bookingSummary, setBookingSummary] = useState<BookingSummary>({
    table_id: 0,
    date: "",
    time_slot: "",
    guest_count: 0,
    customer_name: "",
    contact: "",
  });
  const bookingTicketRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (showBookingSummary && bookingSummary && bookingTicketRef.current) {
      bookingTicketRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showBookingSummary, bookingSummary]);

  return (
    <div className=" w-full ">
      <div className="  p-3 w-full h-screen ">
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className=" w-full h-full object-top object-cover "
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 z-[2] flex flex-col justify-center items-center">
            <h1 className="text-white text-7xl medium">Hot Plate</h1>
            <p className="text-xl md:text-2xl text-white drop-shadow-md max-w-2xl mx-auto mb-8 text-center">
              Sizzling Flavors, Unforgettable Moments
            </p>

            <button
              className="bg-yellow-800 border text-lg border-yellow-900 text-white px-4 py-2 rounded"
              onClick={() => {
                const formSection = document.querySelector(
                  ".w-full.min-h-screen"
                );
                if (formSection) {
                  formSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Scroll down for booking your table
            </button>
          </div>
          <div className=" absolute bottom-0 w-full h-full from-black to-black/30 bg-gradient-to-t z-[1]" />
        </div>
      </div>

      <div className=" w-full min-h-screen">
        <ReserveForm
          setBookingSummary={setBookingSummary}
          setShowBookingSummary={setShowBookingSummary}
        />
      </div>
      <div className=" w-full h-fit mb-6">
        {showBookingSummary && bookingSummary && (
          <div
            ref={bookingTicketRef}
            className=" font-halenoir mt-10 w-full flex flex-col px-52  py-4"
          >
            <h1 className=" text-4xl text-center border-t border-stone-400/65 py-4">
              Here is Your Booking Summary !
            </h1>

            <BookingTicket bookingSummary={bookingSummary} />
            <button
              className=" text-center mt-3 border border-red-500 text-red-500 font-medium mx-auto px-2 py-1 rounded flex gap-2"
              onClick={() => {
                setBookingSummary({
                  table_id: 0,
                  date: "",
                  time_slot: "",
                  guest_count: 0,
                  customer_name: "",
                  contact: "",
                });
                setShowBookingSummary(false);
              }}
            >
              <X /> Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
