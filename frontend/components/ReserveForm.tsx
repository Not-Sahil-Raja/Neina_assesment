"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";
import axios from "axios";
import { BookingSummary, ReserveDetail } from "@/types";

interface ReserveFormProps {
  setBookingSummary: (summary: BookingSummary) => void;

  setShowBookingSummary: (show: boolean) => void;
}

type TimeSlot = {
  value: string;
  available: boolean;
};

type Table = {
  table_id: number;
  table_name: string;
  capacity: number;
  location: string;
};

const ReserveForm = ({
  setBookingSummary,
  setShowBookingSummary,
}: ReserveFormProps) => {
  const [dineDate, setDineDate] = useState<Date | undefined>(new Date());
  const [dineTime, setDineTime] = useState<string>("");
  const [guests, setGuests] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<number>(1);
  const [timeSlot, setTimeSlot] = useState<TimeSlot[]>([
    { value: "11:00:00", available: true },
    { value: "11:30:00", available: true },
    { value: "12:00:00", available: true },
    { value: "12:30:00", available: true },
    { value: "13:00:00", available: true },
    { value: "13:30:00", available: true },
    { value: "18:00:00", available: true },
    { value: "18:30:00", available: true },
    { value: "19:00:00", available: true },
    { value: "19:30:00", available: true },
    { value: "20:00:00", available: true },
    { value: "20:30:00", available: true },
  ]);

  const [bookingState, setBookingState] = useState<string>("");

  // * getting all the tables data
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_ADDR}/tables-details`)
      .then((res) => setTables(res.data))
      .catch((err) => console.log(err));
  }, []);

  //* setting the tables dynamically according to the no. of guests
  useEffect(() => {
    if (guests <= 2) {
      setSelectedTableId(1);
    } else if (guests <= 4) {
      setSelectedTableId(2);
    } else if (guests <= 8) {
      setSelectedTableId(3);
    } else setSelectedTableId(4);
  }, [guests]);

  //* getting all the available tables and time slots on the specific date from server
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_ADDR}/available-tables`, {
        params: {
          date: dineDate?.toISOString().split("T")[0],
          table_id: selectedTableId,
        },
      })
      .then((res) => {
        const reservedslots: string[] = res.data;

        const updatedSlots = timeSlot.map((slot) => ({
          ...slot,
          available: !reservedslots.includes(slot.value),
        }));
        setTimeSlot(updatedSlots);
      })
      .catch((err) => console.log(err));
  }, [dineDate, selectedTableId]);

  // * This function reserves the table for the user at the exact date and time
  const reserveTable = (reserveDetail: ReserveDetail) => {
    if (
      !reserveDetail.table_id ||
      !reserveDetail.date ||
      !reserveDetail.time_slot ||
      !reserveDetail.guest_count ||
      !reserveDetail.customer_name ||
      !reserveDetail.contact
    ) {
      console.log("All fields are required");
      return;
    }
    setBookingState("booking");
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_ADDR}/create-reservation`,
        reserveDetail
      )
      .then((res) => {
        const bookData = res.data.reservationDetail[0];

        // * checking if bookdata is present then set all the  book data to BookingSummary
        if (bookData) {
          setBookingSummary({
            table_id: bookData.table_id,
            date: bookData.date,
            time_slot: formatTime(bookData.time_slot),
            guest_count: bookData.guest_count,
            customer_name: bookData.customer_name,
            contact: bookData.contact,
          });
          setShowBookingSummary(true);
        }
        setDineDate(new Date());
        setDineTime("");
        setGuests(0);
        setCustomerName("");
        setCustomerEmail("");
        setBookingState("bookedSuccessfully");
      })
      .catch(() => setBookingState("bookedFailed"))
      .finally(() => {
        setTimeout(() => setBookingState(""), 3000);
      });
  };

  // * Formatting the time according to the mysql time
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="lg:px-52 md:px-20 sm:px-5 px-3 py-5 flex flex-col min-h-screen space-y-2 font-halenoir">
      <div className=" mt-5 border-b pb-1 mb-2">
        <h1 className=" text-4xl">Book A Table</h1>
        <h5 className=" text-lg leading-tight md:leading-normal text-black/75">
          Secure your spot for an unforgettable dining experience
        </h5>
      </div>
      <form
        className="flex  flex-col justify-evenly grow space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          const reserveDetail: ReserveDetail = {
            table_id: selectedTableId,
            date: dineDate?.toISOString().split("T")[0] || "",
            time_slot: dineTime,
            guest_count: guests,
            customer_name: customerName,
            contact: customerEmail,
          };
          reserveTable(reserveDetail);
        }}
      >
        <div className=" flex md:flex-row md:items-stretch items-center flex-col gap-5 mb-3 md:mb-4 lg:mb-5">
          {/* Select the dine date  */}
          <div className=" flex flex-col ">
            <label htmlFor="dineDate" className=" text-lg font-medium mb-2">
              Dine Date
            </label>
            <Calendar
              mode="single"
              selected={dineDate}
              onSelect={setDineDate}
              className="rounded-md  border"
              id="dineDate"
            />
          </div>

          <div className=" w-full flex flex-col">
            {/* Select the time slot */}
            <label htmlFor="" className="text-lg font-medium pl-4 mb-2">
              Choose Time
            </label>

            {/* Rendering all the time slot then disabling the already reserved time slots  */}
            <div className=" grid grid-cols-4 md:gap-4 gap-2 md:px-4 px-2 grow select-none">
              {timeSlot.map((slot, index) => (
                <label
                  key={index}
                  htmlFor={`${index}-timeslot`}
                  className={`${
                    slot.available
                      ? dineTime == slot.value
                        ? "bg-green-400/30 border-green-400/70 cursor-pointer"
                        : "bg-white border cursor-pointer"
                      : "opacity-50"
                  }   flex items-center justify-center rounded-md `}
                >
                  <input
                    type="radio"
                    name="timeSlot"
                    className=" hidden"
                    value={slot.value}
                    id={`${index}-timeslot`}
                    disabled={!slot.available}
                    onClick={(e) =>
                      setDineTime((e.target as HTMLInputElement).value)
                    }
                  />
                  {formatTime(slot.value)}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className=" flex md:flex-row gap-3 md:gap-0 flex-col justify-stretch">
          {/* Select the number of guests  */}
          <div className="flex flex-col md:mr-5 md:mb-0 mb-3">
            <label htmlFor="guest" className=" text-lg font-medium mb-1">
              Number of Guest
            </label>
            <div className=" grow flex justify-center items-center ">
              <button
                type="button"
                onClick={() => {
                  setGuests(Math.max(guests - 1, 0));
                }}
                className=" bg-black/85 h-3/4 aspect-square flex items-center justify-center rounded text-white px-3 py-3"
              >
                -
              </button>
              <p className=" md:mx-auto mx-4">{guests}</p>
              <button
                type="button"
                onClick={() => {
                  setGuests(Math.min(guests + 1, 12));
                }}
                className=" bg-black/85 h-3/4 aspect-square flex items-center justify-center rounded text-white px-3 py-3"
              >
                +
              </button>
            </div>
          </div>

          {/* Renders and Select all the available tables  */}
          <div className=" grid grid-cols-4 gap-2 grow">
            {tables.map((table, index) => (
              <label
                key={index}
                htmlFor={`${index}-table`}
                className={` ${
                  selectedTableId == table.table_id
                    ? " bg-stone-300/60 hover:bg-stone-400/45"
                    : " bg-white hover:bg-stone-200/25"
                } border border-stone-300 p-2 rounded-md cursor-pointer duration-300 transition-colors`}
              >
                <input
                  type="radio"
                  name="table"
                  value={table.table_id}
                  id={`${index}-table`}
                  onChange={(e) =>
                    setSelectedTableId(
                      Number((e.target as HTMLInputElement).value)
                    )
                  }
                  className="hidden"
                />
                <div className=" flex flex-col w-full leading-none">
                  <p className=" text-lg">{table.table_name}</p>
                  <p>
                    Guest :{" "}
                    <span className=" font-medium">{table.capacity}</span>
                  </p>
                  <p className=" font-medium mt-1">{table.location}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Name of the customer and  customer email  */}
        <div className=" flex md:flex-row flex-col gap-2">
          <div className=" flex flex-col w-full">
            <label htmlFor="name" className=" mb-1 cursor-pointer font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className=" border border-stone-400/85  focus:outline-stone-500/75 px-3 py-1 rounded"
            />
          </div>
          <div className=" flex flex-col w-full">
            <label
              htmlFor="address"
              className=" mb-1 cursor-pointer font-medium"
            >
              Email Address
            </label>
            <input
              type="text"
              id="address"
              required
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className=" border border-stone-400/85  focus:outline-stone-500/75 px-3 py-1 rounded"
            />
          </div>
        </div>

        <button
          className=" w-full py-2 text-white bg-stone-700  rounded-md font-medium disabled:bg-stone-200 disabled:text-stone-600 duration-300 transition-colors"
          type="submit"
          disabled={
            dineTime == "" ||
            guests == 0 ||
            customerName == "" ||
            customerEmail == "" ||
            bookingState !== ""
          }
        >
          {bookingState === "" && "Proceed to Booking"}
          {bookingState === "booking" && "Booking..."}
          {bookingState === "bookedSuccessfully" && "Booked Successfully!"}
          {bookingState === "bookedFailed" && "Booking Failed"}
        </button>
      </form>
    </div>
  );
};

export default ReserveForm;
