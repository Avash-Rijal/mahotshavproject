"use client";
import { useRouter } from "next/navigation";
import { Banknote, Calendar, FileText, Gauge, User } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const router = useRouter();

  const handleCreateEventClick = () => {
    router.push("/dashboard/createEvent");
  };

  return (
    <div className="w-64 bg-gray-100 shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#A15842]">MAHOTSHAV</h1>
        <button
          onClick={handleCreateEventClick}
          className="flex gap-3 justify-center mt-6 w-full bg-[#A15842] text-white py-4 font-semibold text-lg rounded-lg"
        >
          <Calendar />
          <p>Create Event</p>
        </button>
      </div>
      <nav className="mt-10 p-4">
        <Link
          href="/dashboard"
          className="flex gap-3 py-2.5 px-4 text-gray-700 hover:bg-red-100"
        >
          <Gauge />
          Dashboard
        </Link>
        <Link
          href="/dashboard/myEvents"
          className="flex gap-3 py-2.5 px-4 text-gray-700 hover:bg-red-100"
        >
          <FileText />
          My Events
        </Link>
        <Link
          href="/dashboard/profile"
          className="flex gap-3 py-2.5 px-4 text-gray-700 hover:bg-red-100"
        >
          <User />
          My Profile
        </Link>
        <Link
          href="/dashboard/revenue"
          className="flex gap-3 py-2.5 px-4 text-gray-700 hover:bg-red-100"
        >
          <Banknote />
          Revenue
        </Link>
      </nav>
      <div className="absolute bottom-10 left-6 flex items-center gap-3">
        <img
          src="/path/to/profile-pic.jpg"
          alt="Profile"
          className="h-8 w-8 rounded-full object-cover"
        />
        <div>
          <p className="text-gray-700 font-medium">Rameshwor B.</p>
          <Link href="/dashboard/profile" className="text-sm text-blue-500">
            View profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
