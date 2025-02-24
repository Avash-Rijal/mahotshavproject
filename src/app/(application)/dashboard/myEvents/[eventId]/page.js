"use client";
import { useEffect, useRef, useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import dynamic from "next/dynamic";
import CreateEventForm from "../../Components/CreateEventForm";
import { useParams } from "next/navigation";
import { db } from "@/app/db";
import { events } from "@/app/drizzle/schema";
import { eq } from "drizzle-orm";
const CustomEditor = dynamic(
  () => import("../../Components/CKeditor/CKeditor"),
  { ssr: false }
);

export default function Page() {
  const params = useParams();
  const eventId = params.eventId;  
  const [eventDetails, setEventDetails] = useState(null);

  console.log(db.select({id: events.id}).from(events))
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const event = await db
          .select({
            id: events.id,
            name: events.name,
            venue: events.venueName,
            price: events.ticketPrice,
            startTime: events.startTime,
            endTime: events.endTime,
            startDate: events.startDate,
            endDate: events.endDate,
            eventCity: events.city,
            participants: events.expectedParticipants,
            guests: events.guestList,
            entryType: events.entryType,
            description: events.description,
          })
          .from(events)
          .where(eq(events.id, eventId))
          .then((results) => results[0]);

        const formattedData = {
          eventName: event.name,
          eventCity: event.eventCity,
          venueName: event.venue,
          startTime: new Date(event.startTime).toTimeString().slice(0, 5),
          endTime: new Date(event.endTime).toTimeString().slice(0, 5),
          startDate: event.startDate,
          endDate: event.endDate,
          ticketPrice: event.price,
          guestList: event.guests,
          participants: event.participants,
          entryType: event.entryType || "Free",
          description: event.description || "",
        };

        setEventDetails(formattedData);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);
  
  const formRef = useRef();
  const [description, setDescription] = useState(eventDetails?.description || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  const handleFormSubmit = async (eventData) => {
    setLoading(true);
    setMessage("");

    try {
      const formDataToSubmit = {
        ...eventData,
        description,
      };

      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataToSubmit),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Event created successfully!");
        if (formRef.current) {
          formRef.current.resetForm();
        }
        setDescription("");
      } else {
        setMessage(result.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("Error submitting form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-[#FCE5D8] to-[#FBE8EF] min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 bg-gray-50">
          <CreateEventForm
            ref={formRef}
            initialData={eventDetails}
            onSubmit={handleFormSubmit}
          />

          <p className="p-4 container mt-12 mb-3 text-[#565E6C] text-xl font-semibold">
            Description
          </p>
          <CustomEditor
            onChange={(data) => setDescription(data)}
            data={description}
          />

          <div className="container px-4 mt-8 mb-8 flex justify-start">
            <button
              onClick={handleAddEvent}
              disabled={loading}
              className="px-6 py-3 bg-[#A15842] text-white rounded-lg hover:bg-[#8B4936] transition-colors duration-200 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating Event..." : "Update Event"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
