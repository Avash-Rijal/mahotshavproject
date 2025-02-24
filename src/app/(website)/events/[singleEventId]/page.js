"use client";
import Image from "next/image";
import { useEffect, useState, use } from "react";

export default function EventDetailPage({ params }) {
  const resolvedParams = use(params);
  const singleEventId = resolvedParams.singleEventId;

  console.log(singleEventId);
  
  const [ticketCount, setTicketCount] = useState(1);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const increaseTicketCount = () => {
    setTicketCount((prevCount) => prevCount + 1);
  };

  const decreaseTicketCount = () => {
    setTicketCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  const handleTicketInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) setTicketCount(value);
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        console.log(`Fetching event with ID: ${singleEventId}`);
        const response = await fetch(`/api/events/${singleEventId}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Server responded with status ${response.status}: ${errorText}`);
          throw new Error(`Failed to fetch event: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Event data received:", data);
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvent();
  }, [singleEventId]);

  return (
    <div className="pt-24 pb-24 bg-gradient-to-br from-[#FCE5D8] to-[#FBE8EF] min-h-screen">
      <div className="container shadow-lg overflow-hidden py-24">
        <div className="flex flex-col md:flex-row p-8 gap-8">
          <div>
            <div className="text-gray-700">
              <p className="text-sm">
                {event?.startDate} | {event?.venue}, {event?.eventCity}
              </p>
              <h1 className="text-3xl font-semibold text-[#92403F]">
                {event?.name}
              </h1>
              <p className="mt-4 text-lg">
                {event?.description || "Join us for this amazing event!"}
              </p>
            </div>
            <div className="mt-6">
              <button className="bg-[#92403F] text-white py-2 px-6 rounded shadow">
                Join Now
              </button>
            </div>
          </div>
          <div className="relative max-w-full cursor-pointer overflow-hidden rounded-lg">
            <Image
              src="/event.png"
              alt="event image"
              width={500}
              height={320}
              className="rounded-lg hover:scale-105 transform transition-transform duration-300 object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 p-8 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-gray-800">
              {event?.name}: {event?.description ? event?.description.slice(0, 50) + "..." : "Event Details"}
            </h2>
            <p className="mt-4 text-gray-600">
              {event?.description || "No detailed description available for this event."}
            </p>
            <h3 className="mt-8 text-lg font-bold text-gray-800">
              Event Details
            </h3>
            <p className="mt-2 text-gray-600">
              Date: {event?.startDate}{event?.endDate ? ` to ${event?.endDate}` : ""}<br />
              Time: {new Date(event?.startTime).toLocaleTimeString()} - {new Date(event?.endTime).toLocaleTimeString()}<br />
              Venue: {event?.venue}, {event?.eventCity}<br />
              Entry Type: {event?.entryType}<br />
              {event?.price && event?.price !== "0" && `Ticket Price: ${event?.price}`}
            </p>
            {event?.guests && event?.guests.length > 0 && (
              <>
                <h3 className="mt-8 text-lg font-bold text-gray-800">
                  Special Guests
                </h3>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  {event?.guests.map((guest, index) => (
                    <li key={index}>{guest}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="bg-[#FDFDFD4D]/30 p-6 rounded-lg shadow">
            <h3 className="text-2xl font-medium">Join This Event</h3>
            <p className="text-sm text-gray-600 mt-2">
              Get your ticket in a click.
            </p>
            <form className="mt-4">
              <div className="my-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-transparent w-full p-2 border-b border-neutral-400 focus:outline-none focus:border-primary-600"
                  required
                />
              </div>
              <div className="my-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-transparent w-full p-2 border-b border-neutral-400 focus:outline-none focus:border-primary-600"
                  required
                />
              </div>
              <div className="my-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="bg-transparent w-full p-2 border-b border-neutral-400 focus:outline-none focus:border-primary-600"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="tickets" className="">
                  No of Tickets
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="bg-gray-200 px-2 py-1 rounded"
                    onClick={decreaseTicketCount}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="tickets"
                    value={ticketCount}
                    onChange={handleTicketInputChange}
                    className="w-16 p-2 border text-center rounded focus:outline-none focus:ring focus:ring-red-200"
                  />
                  <button
                    type="button"
                    className="bg-gray-200 px-2 py-1 rounded"
                    onClick={increaseTicketCount}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-[#92403F] text-white py-4 px-4 rounded-xl shadow"
              >
                Book Tickets
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}