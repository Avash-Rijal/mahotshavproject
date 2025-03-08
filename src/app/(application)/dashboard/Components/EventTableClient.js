"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import React, { useState } from "react";
import { Trash2 } from "lucide-react";

const DeleteButton = ({ eventId, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this event? This will also delete all participant records associated with this event.")) {
      try {
        setIsDeleting(true);
        setError(null);
        
        console.log(`Sending delete request for event ID: ${eventId}`);
        const response = await fetch(`/api/events/${eventId}`, {
          method: "DELETE",
        });
        
        const data = await response.json();
        
        if (response.ok) {
          console.log(`Success:`, data);
          onDelete(eventId);
        } else {
          console.error("Server returned error:", data);
          
          // Check for foreign key constraint errors
          if (data.constraint && data.constraint.includes('fk')) {
            setError(`Cannot delete: This event has related records. All participants must be deleted first.`);
          } else {
            setError(`Error: ${data.error || response.statusText}`);
          }
        }
      } catch (error) {
        console.error("Client-side error:", error);
        setError(`Failed to delete: ${error.message}`);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="relative inline-block">
      <button 
        onClick={handleDelete}
        className={`text-red-500 hover:text-red-700 p-2 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Delete event"
        disabled={isDeleting}
      >
        <Trash2 size={20} />
        {isDeleting && <span className="ml-1">...</span>}
      </button>
      {error && (
        <div className="absolute bottom-full right-0 bg-red-100 text-red-800 text-xs p-2 rounded whitespace-nowrap z-10 shadow-md">
          {error}
        </div>
      )}
    </div>
  );
};

const EventTableClient = ({ initialEvents }) => {
  const router = useRouter();
  const [eventsData, setEventsData] = useState(initialEvents);
  useEffect(() => {
    setEventsData(initialEvents);
  }, [initialEvents]);
  const [deleteStatus, setDeleteStatus] = useState(null);

  const handleDelete = (deletedId) => {
    setEventsData(eventsData.filter(event => event.id !== deletedId));
    setDeleteStatus({ type: 'success', message: 'Event successfully deleted' });
    
    // Clear status message after 3 seconds
    setTimeout(() => {
      setDeleteStatus(null);
    }, 3000);
    
    router.refresh();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-normal mb-4">My Events</h2>
      
      {deleteStatus && (
        <div className={`mb-4 p-2 rounded ${deleteStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {deleteStatus.message}
        </div>
      )}
      
      {eventsData.length === 0 ? (
        <p className="text-gray-500 py-4">No events available.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2 text-left text-[#565E6C] font-semibold text-sm w-2/6">
                Event Name
              </th>
              <th className="border-b py-2 text-left text-[#565E6C] font-semibold text-sm">
                Start Date
              </th>
              <th className="border-b py-2 text-left text-[#565E6C] font-semibold text-sm">
                Start Time
              </th>
              <th className="border-b py-2 text-left text-[#565E6C] font-semibold text-sm">
                End Date
              </th>
              <th className="border-b py-2 text-left text-[#565E6C] font-semibold text-sm">
                End Time
              </th>
              <th className="border-b py-2 text-left text-[#565E6C] font-semibold text-sm">
                Guests
              </th>
              <th className="border-b py-2 text-[#565E6C] font-semibold text-sm text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {eventsData.map((event, index) => (
              <tr key={index} className="border-b border-gray-100 last:border-b-0">
                <td className="py-4 text-[#171A1F] font-normal text-sm">
                  {event.name}
                </td>
                <td className="py-4 text-[#171A1F] font-normal text-sm">
                  {event.startDate}
                </td>
                <td className="py-4 text-[#171A1F] font-normal text-sm">
                  {new Date(event.startTime).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td className="py-4 text-[#171A1F] font-normal text-sm">
                  {event.endDate}
                </td>
                <td className="py-4 text-[#171A1F] font-normal text-sm">
                  {new Date(event.endTime).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td className="py-4 text-[#171A1F] font-normal text-sm">
                  {Array.isArray(event.guests) && event.guests.length > 0 
                    ? event.guests.map((guest, i) => (
                        <span key={i}>
                          {guest}{i < event.guests.length - 1 ? ", " : ""}
                        </span>
                      ))
                    : "No guests"}
                </td>
                <td className="py-4 text-[#171A1F] font-normal text-sm flex justify-center gap-2">
                  <Link href={`/dashboard/myEvents/${event.id}`}>
                    <button className="bg-[#A15842] text-white px-4 py-2 rounded-[4px]">
                      View Details
                    </button>
                  </Link>
                  <DeleteButton eventId={event.id} onDelete={handleDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventTableClient;