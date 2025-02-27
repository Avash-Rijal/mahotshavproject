// File: app/components/RevenueTable.js
"use client";
import { useEffect, useState } from "react";

export default function RevenueTable() {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/event-revenue");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch revenue data: ${response.status}`);
        }
        
        const data = await response.json();
        setRevenueData(data);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
        setError(error.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    
    fetchRevenueData();
  }, []);
  
  const calculateTotalRevenue = () => {
    return revenueData.reduce((total, item) => {
      return total + parseFloat(item.totalRevenue || "0");
    }, 0).toFixed(2);
  };

  if (loading) {
    return <div className="text-center p-4">Loading revenue data...</div>;
  }
  
  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-[#92403F] mb-4">Event Revenue Summary</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {revenueData.map((item) => (
                <tr key={item.eventId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.eventName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.category || "Uncategorized"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 font-medium">
                    ${parseFloat(item.totalRevenue || "0").toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900" colSpan={2}>
                  Total Revenue
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-[#92403F] font-bold">
                  Rs.{calculateTotalRevenue()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
