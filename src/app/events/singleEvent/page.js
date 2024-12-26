"use client";
import Image from "next/image";
import { useState } from "react";

export default function page() {
  const [ticketCount, setTicketCount] = useState(1);

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

  return (
    <div className="pt-24 pb-24 bg-gradient-to-br from-[#FCE5D8] to-[#FBE8EF] min-h-screen">
      <div className="container shadow-lgoverflow-hidden py-24">
        <div className="flex p-8 gap-8">
          <div>
            <div className="text-gray-700">
              <p className="text-sm">
                December 30, 2025 | Dasarath Stadium, Kathmandu
              </p>
              <h1 className="text-3xl font-semibold text-[#92403F]">
                New Year Eve Musical Festival
              </h1>
              <p className="mt-4 text-lg">
                Join us for a celebration of culture, art, and community on the
                occasion of New Year 2025.
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

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 p-8 gap-8">
          {/* Left Content */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-gray-800">
              New Year Eve Musical Festival: A Night of Music, Culture, and
              Celebration
            </h2>
            <p className="mt-4 text-gray-600">
              Start your countdown to 2025 in style at the New Year Eve Musical
              Festival, the biggest event of the year! Happening on December 30,
              2025, at Dasarath Stadium, Kathmandu, this electrifying evening
              blends music, culture, and community into one unforgettable
              experience.
            </p>
            <h3 className="mt-8 text-lg font-bold text-gray-800">
              What’s in Store?
            </h3>
            <p className="mt-2 text-gray-600">
              This isn’t just another event—it’s the celebration you’ve been
              waiting for!
            </p>
            <h3 className="mt-8 text-lg font-bold text-gray-800">
              Headlining Performances
            </h3>
            <ul className="list-disc list-inside mt-2 text-gray-600">
              <li>Sabin Rai and The Pharaoh</li>
              <li>Tribal Rain</li>
              <li>Indira Joshi</li>
              <li>Albatross</li>
            </ul>
          </div>

          {/* Right Form */}
          <div className="bg-[#FDFDFD4D]/30 p-6 rounded-lg shadow">
            <h3 className="text-2xl font-medium">Join This Event</h3>
            <p className="text-sm text-gray-600 mt-2">
              Get your ticket in a click.
            </p>
            <form className="mt-4">
              <div className="my-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Name*
                </label>
                <input
                  type="name"
                  id="name"
                  className="bg-transparent w-full p-2 border-b border-neutral-400 focus:outline-none focus:border-primary-600"
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
                  type="mail"
                  id="mail"
                  className="bg-transparent w-full p-2 border-b border-neutral-400 focus:outline-none focus:border-primary-600"
                />
              </div>
              <div className="my-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Phone Number*
                </label>
                <input
                  type="number"
                  id="number"
                  className="bg-transparent w-full p-2 border-b border-neutral-400 focus:outline-none focus:border-primary-600"
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
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
