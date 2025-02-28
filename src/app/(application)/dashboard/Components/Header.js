"use client"

import { Bell, Settings } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {

    const [userName, setUserName] = useState("");

  useEffect(() => {
    try {
      const storedUserData = localStorage.getItem('mahotsavUserData');
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        setUserName(parsedData.name || "");
      }
    } catch (err) {
      console.error("Error loading user data from localStorage:", err);
    }
  }, []);

  return (
    <header className="flex items-center justify-end bg-white p-4 shadow-md">
      <div className="flex items-center space-x-4 gap-4">
        {/* <button className="relative">
          <span className="w-2 h-2 rounded-full bg-red-500 absolute top-0 right-0"></span>
          <Bell />
        </button> */}

        <div className="flex items-center space-x-2">
          {/* <img
            src="/path/to/profile-pic.jpg"
            alt="Profile"
            className="h-8 w-8 rounded-full object-cover"
          /> */}
          <div>
            <p className="text-gray-700 font-medium">{userName}</p>
            <Link href="/dashboard/profile" className="text-sm text-blue-500">
              View profile
            </Link>
          </div>
        </div>
        {/* <div className="hover:cursor-pointer">
          <Settings />
        </div> */}
      </div>
    </header>
  );
};

export default Header;
