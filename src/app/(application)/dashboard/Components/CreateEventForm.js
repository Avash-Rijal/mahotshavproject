"use client";
import { Minus, Plus, Upload, X } from "lucide-react";
import React, { useState, forwardRef, useEffect } from "react";
import CKeditor from "./CKeditor/CKeditor";

const CreateEventForm = forwardRef(({ onSubmit, initialData }, ref) => {
  const [guestList, setGuestList] = useState(initialData?.guestList || [""]);
  const [participants, setParticipants] = useState(
    initialData?.participants || 10
  );
  const [entryType, setEntryType] = useState(
    initialData?.ticketPrice ? "Paid" : "Free"
  );
  const [bannerImage, setBannerImage] = useState(
    initialData?.bannerImage || null
  );
  const [formData, setFormData] = useState({
    eventName: initialData?.eventName || "",
    eventCity: initialData?.eventCity || "",
    venueName: initialData?.venueName || "",
    startTime: initialData?.startTime || "",
    endTime: initialData?.endTime || "",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    ticketPrice: initialData?.ticketPrice || "",
  });

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        eventName: initialData.eventName || "",
        eventCity: initialData.eventCity || "",
        venueName: initialData.venueName || "",
        startTime: initialData.startTime || "",
        endTime: initialData.endTime || "",
        startDate: initialData.startDate || "",
        endDate: initialData.endDate || "",
        ticketPrice: initialData.ticketPrice || "",
      });
      setGuestList(initialData.guestList || [""]);
      setParticipants(initialData.participants || 10);
      setEntryType(initialData.ticketPrice ? "Paid" : "Free");
      setBannerImage(initialData.bannerImage || null);
    }
  }, [initialData]);

  const formatTimeForSubmission = (timeString) => {
    if (!timeString) return null;

    const today = new Date();
    const [hours, minutes] = timeString.split(":");

    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

    return date;
  };

  const handleAddGuest = () => {
    setGuestList([...guestList, ""]);
  };

  const handleGuestChange = (index, value) => {
    const updatedGuests = [...guestList];
    updatedGuests[index] = value;
    setGuestList(updatedGuests);
  };

  const handleRemoveGuest = (index) => {
    const updatedGuests = guestList.filter((_, i) => i !== index);
    setGuestList(updatedGuests);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBannerImage(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setBannerImage(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      eventName: "",
      eventCity: "",
      venueName: "",
      startTime: "",
      endTime: "",
      startDate: "",
      endDate: "",
      ticketPrice: "",
    });
    setGuestList([""]);
    setParticipants(10);
    setEntryType("Free");
    setBannerImage(null);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    try {
      if (
        !formData.startTime ||
        !formData.endTime ||
        !formData.startDate ||
        !formData.endDate
      ) {
        alert("Please select both date and time");
        return;
      }

      const createDateTimeString = (date, time) => {
        return `${date}T${time}:00.000Z`;
      };

      const startTimeISO = createDateTimeString(
        formData.startDate,
        formData.startTime
      );
      const endTimeISO = createDateTimeString(
        formData.endDate,
        formData.endTime
      );

      const formattedGuestList = guestList.filter(
        (guest) => guest.trim() !== ""
      );

      const numParticipants = parseInt(participants, 10);

      const eventData = {
        ...formData,
        startTime: startTimeISO,
        endTime: endTimeISO,
        startDate: formData.startDate,
        endDate: formData.endDate,
        guestList: formattedGuestList,
        participants: numParticipants,
        entryType,
        bannerImage: bannerImage ? bannerImage.name : null,
      };

      console.log("Submitting eventData:", eventData);

      onSubmit(eventData);
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Error submitting form. Please check your inputs.");
    }
  };

  React.useImperativeHandle(ref, () => ({
    submitForm: handleSubmit,
    resetForm,
  }));

  return (
    <div className="container">
      <div className="p-4">
        <h1 className="mb-6 text-xl font-semibold text-[#565E6C]">
          {initialData ? "Update Event" : "Create Event"}
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-12">
          {/* Rest of your existing JSX remains exactly the same */}
          <div className="flex flex-col gap-12">
            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="eventName"
                className="block mb-2 text-sm font-normal"
              >
                Event Name
              </label>
              <input
                id="eventName"
                type="text"
                name="eventName"
                required
                value={formData.eventName}
                onChange={handleInputChange}
                placeholder="Enter event name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A15842] outline-none"
              />
            </div>
            <div className="flex gap-3">
              <div>
                <label
                  htmlFor="eventCity"
                  className="block mb-2 text-sm font-normal"
                >
                  Event City
                </label>
                <input
                  id="eventCity"
                  type="text"
                  name="eventCity"
                  required
                  value={formData.eventCity}
                  onChange={handleInputChange}
                  placeholder="Enter city name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A15842] outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="venueName"
                  className="block mb-2 text-sm font-normal"
                >
                  Venue Name
                </label>
                <input
                  id="venueName"
                  type="text"
                  name="venueName"
                  required
                  value={formData.venueName}
                  onChange={handleInputChange}
                  placeholder="Enter venue name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A15842] outline-none"
                />
              </div>
            </div>
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-normal">
                Guest List
              </label>
              {guestList.map((guest, index) => (
                <div key={index} className="flex items-center space-x-3 mb-3">
                  <input
                    type="text"
                    placeholder="Enter guest name"
                    value={guest}
                    onChange={(e) => handleGuestChange(index, e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A15842] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveGuest(index)}
                    className="p-2 bg-[#A15842] text-white rounded-lg"
                  >
                    <X />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddGuest}
                className="px-4 py-2 bg-[#A15842] text-white rounded-lg"
              >
                + Add More
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            <div className="col-span-2 md:col-span-1 flex space-x-2 items-center">
              <div className="flex-1">
                <label
                  htmlFor="startTime"
                  className="block mb-2 text-sm font-normal"
                >
                  Start time
                </label>
                <input
                  id="startTime"
                  type="time"
                  name="startTime"
                  required
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A15842] outline-none"
                />
              </div>
              <p className="mt-5 text-[#171A1F] font-normal text-sm">to</p>
              <div className="flex-1">
                <label
                  htmlFor="endTime"
                  className="block mb-2 text-sm font-normal"
                >
                  End time
                </label>
                <input
                  id="endTime"
                  type="time"
                  name="endTime"
                  required
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A15842] outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            <div className="col-span-2 md:col-span-1 flex space-x-2 items-center">
              <div className="flex-1">
                <label
                  htmlFor="startDate"
                  className="block mb-2 text-sm font-normal"
                >
                  Start Date
                </label>
                <input
                  id="startDate"
                  type="date"
                  name="startDate"
                  required
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A15842] outline-none"
                />
              </div>
              <p className="mt-5 text-[#171A1F] font-normal text-sm">to</p>
              <div className="flex-1">
                <label
                  htmlFor="endDate"
                  className="block mb-2 text-sm font-normal"
                >
                  End Date
                </label>
                <input
                  id="endDate"
                  type="date"
                  name="endDate"
                  required
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A15842] outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="block mb-2 text-sm font-normal">
                Expected Participants
              </label>
              <div className="w-1/3 full flex items-center justify-between">
                <button
                  type="button"
                  className="px-2 py-2 bg-[#F3F4F6] text-[#565E6C] rounded-lg"
                  onClick={() => setParticipants(Math.max(0, participants - 1))}
                >
                  <Minus />
                </button>
                <span className="text-base font-normal">{participants}</span>
                <button
                  type="button"
                  className="px-2 py-2 bg-[#A15842] text-white rounded-lg"
                  onClick={() => setParticipants(participants + 1)}
                >
                  <Plus />
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-normal">
                Entry Type
              </label>
              <div className="flex flex-col mb-4">
                <label className="flex space-x-2 items-center">
                  <input
                    type="radio"
                    name="entryType"
                    value="Free"
                    checked={entryType === "Free"}
                    onChange={(e) => setEntryType(e.target.value)}
                  />
                  <span>Free</span>
                </label>
                <label className="flex space-x-2">
                  <input
                    type="radio"
                    name="entryType"
                    value="Paid"
                    checked={entryType === "Paid"}
                    onChange={(e) => setEntryType(e.target.value)}
                  />
                  <span>Paid</span>
                </label>
              </div>
              {entryType === "Paid" && (
                <div>
                  <input
                    type="number"
                    name="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={handleInputChange}
                    placeholder="Ticket Price"
                    className="w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A15842] outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="">
            <label className="block mb-2 text-sm font-normal">
              Banner Image
            </label>
            <div
              className="w-full p-4 bg-[#A15842] text-white rounded-lg flex justify-center items-center cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {bannerImage ? (
                <img
                  src={URL.createObjectURL(bannerImage)}
                  alt="Banner Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex gap-4">
                  <Upload />
                  <span>Upload Image</span>
                </div>
              )}
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});

CreateEventForm.displayName = "CreateEventForm";

export default CreateEventForm;
