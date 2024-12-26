"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

export default function Page() {
  const [timeDropdown, setTimeDropdown] = useState(false);
  const [locationDropdown, setLocationDropdown] = useState(false);

  return (
    <div className="pt-24 pb-24 bg-gradient-to-br from-[#FCE5D8] to-[#FBE8EF] min-h-screen">
      <div className="container justify-center flex flex-col lg:flex-row lg:gap-16 gap-8 py-24 items-center">
        <div className="relative max-w-full cursor-pointer overflow-hidden rounded-lg">
          <Image
            src="/event.png"
            alt="event image"
            width={500}
            height={320}
            className="rounded-lg hover:scale-105 transform transition-transform duration-300 object-cover"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-[#5B5B5B] font-normal text-xl">
            Date | Location
          </div>
          <h3 className="text-[#92403F] text-4xl font-semibold cursor-pointer">
            New Year Eve Musical Festival
          </h3>
          <p className="text-[#2C2C2C] font-normal text-2xl">
            Event Description
          </p>
        </div>
      </div>
      <div className="container pb-24 w-full">
        <h2 className="font-bold text-[#92403F] text-4xl uppercase text-center tracking-widest">
          Find Events
        </h2>
        <div className="grid lg:grid-cols-3 gap-5 md:grid-cols-2 grid-cols-1 w-2/3 mt-12">
          {/* <div className="flex gap-2 p-4 bg-orange-50/50"> */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 rounded-md  bg-[#FFFFFF]/20 hover:bg-gray-20 shadow-card focus:outline-none focus:ring-1 focus:ring-orange-200"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          <div className="relative flex-1">
            <button
              onClick={() => setTimeDropdown(!timeDropdown)}
              className="w-full flex items-center justify-between gap-2 px-4 py-2 bg-[#FFFFFF]/20 rounded-md hover:bg-gray-20 shadow-card"
            >
              <span className="text-gray-700">Time: Any Time</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {timeDropdown && (
              <div className="absolute z-50 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                <div className="py-1">
                  <button className="block w-full px-4 py-2 text-left hover:bg-gray-50">
                    Any Time
                  </button>
                  <button className="block w-full px-4 py-2 text-left hover:bg-gray-50">
                    Past Hour
                  </button>
                  <button className="block w-full px-4 py-2 text-left hover:bg-gray-50">
                    Past 24 Hours
                  </button>
                  <button className="block w-full px-4 py-2 text-left hover:bg-gray-50">
                    Past Week
                  </button>
                  <button className="block w-full px-4 py-2 text-left hover:bg-gray-50">
                    Past Month
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative flex-1">
            <button
              onClick={() => setLocationDropdown(!locationDropdown)}
              className="flex w-full justify-between items-center gap-2 px-4 py-2 bg-[#FFFFFF]/20 rounded-md hover:bg-gray-20 shadow-card hover:bg-gray-20"
            >
              <span className="text-gray-700">Location: Any Location</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {locationDropdown && (
              <div className="absolute top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="py-1">
                  <button className="block w-full px-4 py-2 text-left hover:bg-gray-50">
                    Any Location
                  </button>
                  <button className="block w-full px-4 py-2 text-left hover:bg-gray-50">
                    Current Location
                  </button>
                  <button className="block w-full px-4 py-2 text-left hover:bg-gray-50">
                    Within 5 miles
                  </button>
                  <button className="block w-full px-4 py-2 text-left hover:bg-gray-50">
                    Within 10 miles
                  </button>
                  <button className="block w-full px-4 py-2 text-left hover:bg-gray-50">
                    Within 25 miles
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="container grid gap-8 grid-cols-1 lg:grid-cols-2 mt-12">
          <div className="flex justify-between max-w-[600px] p-4">
            <div className="flex flex-col gap-3">
              <div className="text-[#5B5B5B] font-normal text-sm">
                Date | Location
              </div>
              <h3 className="text-[#92403F] text-base font-semibold cursor-pointer">
                New Year Eve Musical Festival
              </h3>
              <p className="text-[#2C2C2C] font-normal text-md">
                Event Description
              </p>
              <button className="bg-[#92403F] text-white py-2 max-w-32 font-normal text-sm rounded-sm">
                Join Now
              </button>
            </div>
            <div className="cursor-pointer overflow-hidden w-[134px] h-[250px] relative">
              <Image
                src="/event.png"
                alt="event photo"
                className="hover:scale-105 transform transition-transform duration-300 object-cover"
                layout="fill"
              />
            </div>
          </div>
          <div className="flex justify-between max-w-[600px] p-4">
            <div className="flex flex-col gap-3">
              <div className="text-[#5B5B5B] font-normal text-sm">
                Date | Location
              </div>
              <h3 className="text-[#92403F] text-base font-semibold cursor-pointer">
                New Year Eve Musical Festival
              </h3>
              <p className="text-[#2C2C2C] font-normal text-md">
                Event Description
              </p>
              <button className="bg-[#92403F] text-white py-2 max-w-32 font-normal text-sm rounded-sm">
                Join Now
              </button>
            </div>
            <div className="cursor-pointer overflow-hidden w-[134px] h-[250px] relative">
              <Image
                src="/event.png"
                alt="event photo"
                className="hover:scale-105 transform transition-transform duration-300 object-cover"
                layout="fill"
              />
            </div>
          </div>
          <div className="flex justify-between max-w-[600px] p-4">
            <div className="flex flex-col gap-3">
              <div className="text-[#5B5B5B] font-normal text-sm">
                Date | Location
              </div>
              <h3 className="text-[#92403F] text-base font-semibold cursor-pointer">
                New Year Eve Musical Festival
              </h3>
              <p className="text-[#2C2C2C] font-normal text-md">
                Event Description
              </p>
              <button className="bg-[#92403F] text-white py-2 max-w-32 font-normal text-sm rounded-sm">
                Join Now
              </button>
            </div>
            <div className="cursor-pointer overflow-hidden w-[134px] h-[250px] relative">
              <Image
                src="/event.png"
                alt="event photo"
                className="hover:scale-105 transform transition-transform duration-300 object-cover"
                layout="fill"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
