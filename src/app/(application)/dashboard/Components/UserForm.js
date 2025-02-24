"use client";
import { File, Info, AlertTriangle, PencilIcon, Upload } from "lucide-react";
import React, { useState, useRef } from "react";

const UserForm = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [profileImage, setProfileImage] = useState("/api/placeholder/48/48");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (isEditMode) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isEditMode) return;
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const inputs = document.querySelectorAll("input:not(:disabled), select:not(:disabled)");
    let allFieldsFilled = true;

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        allFieldsFilled = false;
      }
    });

    if (allFieldsFilled) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    } else {
      setShowErrorNotification(true);
      setTimeout(() => {
        setShowErrorNotification(false);
      }, 2000);
    }
    setIsEditMode(false);
  };

  return (
    <div className="container p-4">
      <div
        className="flex items-center gap-4 p-4 mb-12"
        style={{
          background:
            "linear-gradient(97.8deg, rgba(225, 153, 35, 0.1) 0.36%, rgba(145, 62, 61, 0.1) 100%)",
        }}
      >
        <div 
          className="relative"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <img
            src={profileImage}
            alt="Profile"
            className={`rounded-full w-12 h-12 ${isEditMode ? 'cursor-pointer hover:opacity-80' : ''}`}
            onClick={() => isEditMode && fileInputRef.current?.click()}
          />
          {isEditMode && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <div className={`absolute inset-0 flex items-center justify-center rounded-full transition-all duration-200 ${isDragging ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-0 hover:bg-opacity-20'}`}>
                {isDragging ? (
                  <span className="text-white text-xs text-center px-1">Drop image here</span>
                ) : (
                  <Upload className="text-white" size={16} />
                )}
              </div>
            </>
          )}
        </div>
        <div className="flex-grow">
          <h2 className="text-lg font-medium">Rameshwor Bhattacharya</h2>
          <p className="text-gray-600">rbhatta@gmail.com</p>
        </div>
        <button
          className="flex gap-3 border border-[#A15842] rounded-[4px] text-[#A15842] px-4 py-2 items-center"
          onClick={() => setIsEditMode(true)}
        >
          <PencilIcon size={20} />
          <span>Edit</span>
        </button>
      </div>

      {/* Rest of the form remains unchanged */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ... existing form fields ... */}
      </form>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-gray-600 mb-2">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Your First Name"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-gray-600 mb-2">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            placeholder="Enter your phone number"
            defaultValue="9848032333"
            disabled={!isEditMode}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-gray-600 mb-2">
            Gender
          </label>
          <select
            id="gender"
            disabled={!isEditMode}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="language" className="block text-gray-600 mb-2">
            Language
          </label>
          <select
            id="language"
            disabled={!isEditMode}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
          >
            <option>English</option>
            <option>Nepali</option>
            <option>Hindi</option>
          </select>
        </div>

        <div>
          <label htmlFor="country" className="block text-gray-600 mb-2">
            Country
          </label>
          <input
            id="country"
            type="text"
            placeholder="Enter your country"
            defaultValue="Nepal"
            disabled={!isEditMode}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label htmlFor="timeZone" className="block text-gray-600 mb-2">
            Time Zone
          </label>
          <select
            id="timeZone"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option>GMT +5:45 (Nepal)</option>
            <option>GMT +5:30 (India)</option>
            <option>GMT +0:00 (UTC)</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="primaryEmail" className="block text-gray-600 mb-2">
            Primary Email
          </label>
          <input
            id="primaryEmail"
            type="email"
            placeholder="Enter your email"
            defaultValue="rbhatta@gmail.com"
            disabled={!isEditMode}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
          />
        </div>

        <div className="md:col-span-2 w-full flex justify-end">
          <button
            type="button"
            className="bg-[#A15842] text-white py-2 px-6 rounded-lg focus:outline-none flex gap-3"
            onClick={() => {
              setIsEditMode(false);
              handleSave();
            }}
          >
            <File />
            <span>Save details</span>
          </button>
        </div>

        {/* Success Notification */}
        <div
          className={`overflow-x-hidden fixed top-10 right-0 bg-green-500 text-white px-6 py-4 rounded shadow-lg transform transition-transform duration-500 flex gap-3 ${
            showNotification ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Info />
          <span>User Information Saved</span>
        </div>

        {/* Error Notification */}
        <div
          className={`overflow-x-hidden fixed top-20 right-0 bg-red-500 text-white px-6 py-4 rounded shadow-lg transform transition-transform duration-500 flex gap-3 ${
            showErrorNotification ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <AlertTriangle />
          <span>Please fill all the boxes</span>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
