"use client"
// import { db } from "@/app/db";
// import { events } from "@/app/drizzle/schema";
// import { eventNames } from "process";
import { useEffect, useState } from "react";
import DashboardTableClient from "./DashboardTableClient"

const DashboardTable = () => {

  const [eventsTable, setEventsTable] = useState([]);

  // const eventsTable = await db
  //   .select({
  //     name: events.name,
  //     venue: events.venueName,
  //     price: events.ticketPrice,
  //     startTime: events.startTime,
  //     endTime: events.endTime,
  //     startDate: events.startDate,
  //     endDate: events.endDate,
  //     eventCity: events.city,
  //     participants: events.expectedParticipants,
  //     guests: events.guestList,
  //     entryType: events.entryType,
  //     description: events.description,
  //   })
  //   .from(events);

    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await fetch("/api/events");
  
          if (!response.ok) {
            throw new Error("Failed to fetch events");
          }
  
          const data = await response.json();
  
          if (Array.isArray(data)) {
            setEventsTable(data);
            // if (data.length > 0) {
            //   setFirstEvent(data[0]);
            // }
          } else {
            throw new Error("Data is not in the expected format");
          }
        } catch (error) {
          console.error("Error fetching events:", error);
          setError(error.message);
        }
      };
  
      fetchEvents();
    }, []);

  return (
    // <div className="bg-white shadow-md rounded-lg p-6">
    //   <h2 className="text-2xl font-normal mb-4">My Events</h2>
    //   <table className="w-full border-collapse">
    //     <thead>
    //       <tr>
    //         <th className="border-b py-2 text-left text-[#565E6C] font-semibold text-sm w-2/6">
    //           Event Name
    //         </th>
    //         <th className="border-b py-2 text-left text-[#565E6C] font-semibold text-sm">
    //           Start Date
    //         </th>
    //         <th className="border-b py-2 text-left text-[#565E6C] font-semibold text-sm">
    //           Start Time
    //         </th>
    //         <th className="border-b py-2 text-left text-[#565E6C] font-semibold text-sm">
    //           End Date
    //         </th>
    //         <th className="border-b py-2 text-left text-[#565E6C] font-semibold text-sm">
    //           End Time
    //         </th>
    //         <th className="border-b py-2 text-left text-[#565E6C] font-semibold text-sm">
    //           Guests
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {eventsTable.map((event, index) => (
    //         <tr key={index}>
    //           <td className="py-4 text-[#171A1F] font-normal text-sm">
    //             {event.name}
    //           </td>
    //           <td className="py-4 text-[#171A1F] font-normal text-sm">
    //             {event.startDate}
    //           </td>
    //           <td className="py-4 text-[#171A1F] font-normal text-sm">
    //             {new Date(event.startTime).toLocaleTimeString("en-GB", {
    //               hour: "2-digit",
    //               minute: "2-digit",
    //               hour12: true,
    //             })}
    //           </td>
    //           <td className="py-4 text-[#171A1F] font-normal text-sm">
    //             {event.endDate}
    //           </td>
    //           <td className="py-4 text-[#171A1F] font-normal text-sm">
    //             {new Date(event.endTime).toLocaleTimeString("en-GB", {
    //               hour: "2-digit",
    //               minute: "2-digit",
    //               hour12: true,
    //             })}
    //           </td>
    //           <td className="py-4 text-[#171A1F] font-normal text-sm">
    //             {event.guests.map((guest) => `${guest}, `)}
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <DashboardTableClient initialEvents={eventsTable}/>
  );
};

export default DashboardTable;
