"use client";
import Image from "next/image";
import { useEffect, useState, use, useRef } from "react";
import jsPDF from "jspdf";

export default function EventDetailPage({ params }) {
  const resolvedParams = use(params);
  const singleEventId = resolvedParams.singleEventId;
  
  const nameInputRef = useRef(null);

  const [ticketCount, setTicketCount] = useState(1);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTicket, setShowTicket] = useState(false);
  const [ticketCode, setTicketCode] = useState("");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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

  const handleJoinClick = (e) => {
    e.preventDefault();
    
    document.querySelector('#name')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
    
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }
  
  const generateTicketCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = Math.floor(Math.random() * 2) + 5;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  
  const isFreeEvent = () => {
    return !event?.price || event.price === "0" || event.price === "";
  };
  
  const calculateTotalPrice = () => {
    if (isFreeEvent()) {
      return "0.00";
    }
    const unitPrice = parseFloat(event.price);
    return (unitPrice * ticketCount).toFixed(2);
  };
  
  const handleBookTickets = async (e) => {
    e.preventDefault();

    const code = generateTicketCode();
    setTicketCode(code);
    
    setShowTicket(true);

    try {
      const response = await fetch("/api/book-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: singleEventId,
          ticketId: code,
          ticketPrice: calculateTotalPrice(),
        }),
      });
  
      const result = await response.json();
      console.log("API Response:", result);
      if (response.ok) {
        console.log(result.message);
        alert("Booking successful!");
      } else {
        console.error(result.error); 
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  
  const closeTicket = () => {
    setShowTicket(false);
  };
  
  const downloadTicket = () => {
    const doc = new jsPDF();
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(146, 64, 63);
    
    doc.text("EVENT TICKET", 105, 20, { align: "center" });
    
    doc.setFontSize(24);
    doc.text(ticketCode, 105, 35, { align: "center" });
    
    doc.setDrawColor(146, 64, 63);
    doc.line(20, 40, 190, 40);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    doc.text(`Event: ${event?.name}`, 20, 55);
    doc.text(`Date: ${event?.startDate}${event?.endDate ? ` to ${event?.endDate}` : ""}`, 20, 65);
    doc.text(`Time: ${new Date(event?.startTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} - ${new Date(event?.endTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`, 20, 75);
    doc.text(`Venue: ${event?.venue}, ${event?.eventCity}`, 20, 85);
    doc.text(`Ticket Holder: ${name}`, 20, 95);
    
    doc.text(`Number of Tickets: ${ticketCount}`, 20, 105);
    
    if (isFreeEvent()) {
      doc.setFont("helvetica", "bold");
      doc.text("Event Entry: FREE", 20, 115);
    } else {
      doc.text(`Unit Price: Rs.${event.price}`, 20, 115);
      
      doc.setFont("helvetica", "bold");
      doc.text(`Total Price: Rs.${calculateTotalPrice()}`, 20, 125);
    }
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text("Please bring this ticket with you to the event.", 20, 145);
    
    doc.save(`Ticket-${ticketCode}.pdf`);
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        console.log(`Fetching event with ID: ${singleEventId}`);
        const response = await fetch(`/api/events/${singleEventId}`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `Server responded with status ${response.status}: ${errorText}`
          );
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
      {showTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button 
              onClick={closeTicket}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center">
              <div className="bg-[#FCE5D8] p-4 rounded-lg mb-4">
                <h3 className="text-2xl font-bold text-[#92403F]">Your Ticket</h3>
                <div className="text-4xl font-bold my-4 tracking-widest text-[#92403F]">{ticketCode}</div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-lg mb-2">Event Details</h4>
                <p className="text-gray-700 mb-4">
                  {event?.name}<br />
                  {event?.startDate} | {event?.venue}, {event?.eventCity}
                </p>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tickets:</span>
                    <span className="font-medium">{ticketCount}</span>
                  </div>
                  
                  {isFreeEvent() ? (
                    <div className="flex justify-between text-[#92403F] font-bold text-lg">
                      <span>Entry:</span>
                      <span>FREE</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Unit Price:</span>
                        <span className="font-medium">Rs.{event.price}</span>
                      </div>
                      <div className="flex justify-between text-[#92403F] font-bold text-lg">
                        <span>Total:</span>
                        <span>Rs.{calculateTotalPrice()}</span>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-left">
                  <p className="text-yellow-800">
                    <strong>Important:</strong> Note down this code and take it with you to participate in the event.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={downloadTicket}
                  className="bg-[#92403F] text-white py-2 px-4 rounded-lg flex-1 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
                <button 
                  onClick={closeTicket}
                  className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg flex-1"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container overflow-hidden py-24">
        <div className="flex flex-col justify-between md:flex-row p-16">
          <div>
            <div className="text-gray-700">
              <p className="text-sm">
                {event?.startDate} | {event?.venue}, {event?.eventCity}
              </p>
              <h1 className="text-3xl font-semibold text-[#92403F]">
                {event?.name}
              </h1>
              <p className="mt-4 text-lg">Join us for this exciting event.</p>
            </div>
            <div className="mt-6">
              <button className="bg-[#92403F] text-white py-2 px-6 mt-8 rounded shadow" onClick={handleJoinClick}>
                Join Now
              </button>
            </div>
          </div>
          <div className="relative max-w-full cursor-pointer overflow-hidden rounded-lg">
            <Image
              src={event?.bannerImage}
              alt="event image"
              width={500}
              height={320}
              className="rounded-lg hover:scale-105 transform transition-transform duration-300 object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 p-16 gap-8">
          <div className="md:col-span-2">
            <div className="description-content" dangerouslySetInnerHTML={{ __html: event?.description }} />
            <h2 className="text-xl font-bold text-gray-800">
              {event?.name}: "Event Details"
            </h2>
            <h3 className="mt-8 text-lg font-bold text-gray-800">
              Event Details
            </h3>
            <p className="mt-2 text-gray-600">
              Date: {event?.startDate}
              {event?.endDate ? ` to ${event?.endDate}` : ""}
              <br />
              Time: {new Date(event?.startTime).toLocaleTimeString()} -{" "}
              {new Date(event?.endTime).toLocaleTimeString()}
              <br />
              Venue: {event?.venue}, {event?.eventCity}
              <br />
              Entry Type: {event?.entryType}
              <br />
              {isFreeEvent() ? 
                "Entry: Free" : 
                `Ticket Price: Rs.${event?.price}`}
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
            <form className="mt-4" onSubmit={handleBookTickets}>
              <div className="my-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Name*
                </label>
                <input
                  ref={nameInputRef}
                  type="text"
                  id="name"
                  className="bg-transparent w-full p-2 border-b border-neutral-400 focus:outline-none focus:border-primary-600"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                Book Event
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}