"use client"
import { useEffect, useState } from "react";

const DashboardTableClient = ({ initialEvents }) => {
  const [eventsData, setEventsData] = useState(initialEvents);
  useEffect(() => {
    setEventsData(initialEvents);
  }, [initialEvents]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-normal mb-4">My Events</h2>
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
          </tr>
        </thead>
        <tbody>
          {eventsData.map((event, index) => (
            <tr key={index}>
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
                {event.guests.map((guest) => `${guest}, `)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTableClient;
