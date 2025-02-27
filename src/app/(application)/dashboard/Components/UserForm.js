"use client";
import { File, Info, AlertTriangle, PencilIcon, Upload } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const UserForm = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "Male",
    language: "English",
    country: "Nepal",
    timeZone: "GMT +5:45 (Nepal)",
    address: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const storedUserData = localStorage.getItem('mahotsavUserData');
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        setUserData({
          name: parsedData.name || "",
          email: parsedData.email || "",
          phone: parsedData.phone || "",
          gender: "Male",
          language: "English",
          country: "Nepal",
          timeZone: "GMT +5:45 (Nepal)",
          address: parsedData.address || ""
        });

        if (parsedData.profileImage) {
          setProfileImage(parsedData.profileImage);
        }
      }
    } catch (err) {
      console.error("Error loading user data from localStorage:", err);
      setError("Failed to load user data");
    } finally {
      setLoading(false);
    }
  }, []);

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file && file.type.startsWith('image/')) {
  //     const reader = new FileReader();  
  //     reader.onload = (e) => {
  //       setProfileImage(e.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  //   if (isEditMode) {
  //     setIsDragging(true);
  //   }
  // };

  // const handleDragLeave = (e) => {
  //   e.preventDefault();
  //   setIsDragging(false);
  // };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   setIsDragging(false);
  //   if (!isEditMode) return;
    
  //   const file = e.dataTransfer.files[0];
  //   if (file && file.type.startsWith('image/')) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setProfileImage(e.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSave = () => {
    const inputs = document.querySelectorAll("input:not(:disabled), select:not(:disabled)");
    let allFieldsFilled = true;

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        allFieldsFilled = false;
      }
    });

    if (allFieldsFilled) {
      const updatedUserData = {
        name: document.getElementById("fullName").value,
        email: document.getElementById("primaryEmail").value,
        phone: document.getElementById("phoneNumber").value,
        gender: document.getElementById("gender").value,
        language: document.getElementById("language").value,
        country: document.getElementById("country").value,
        timeZone: document.getElementById("timeZone").value,
        address: userData.address,
        // profileImage: profileImage // Save profile image too
      };
      
      localStorage.setItem('mahotsavUserData', JSON.stringify(updatedUserData));
      
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

  if (loading) {
    return <div className="container p-4">Loading user data...</div>;
  }

  if (error) {
    return <div className="container p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container p-4">
      <div
        className="flex items-center gap-4 p-4 mb-12"
        style={{
          background:
            "linear-gradient(97.8deg, rgba(225, 153, 35, 0.1) 0.36%, rgba(145, 62, 61, 0.1) 100%)",
        }}
      >
        {/* <div 
          className="relative"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <img
            src={profileImage || "/default-profile.png"} // Fallback to default image
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
        </div> */}
        <div className="flex-grow">
          <h2 className="text-lg font-medium">{userData.name}</h2>
          <p className="text-gray-600">{userData.email}</p>
        </div>
        <button
          className="flex gap-3 border border-[#A15842] rounded-[4px] text-[#A15842] px-4 py-2 items-center"
          onClick={() => setIsEditMode(true)}
        >
          <PencilIcon size={20} />
          <span>Edit</span>
        </button>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-gray-600 mb-2">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Your Full Name"
            defaultValue={userData.name}
            disabled={!isEditMode}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
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
            defaultValue={userData.phone}
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
            defaultValue={userData.gender}
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
            defaultValue={userData.language}
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
            defaultValue={userData.country}
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
            defaultValue={userData.timeZone}
            disabled={!isEditMode}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
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
            defaultValue={userData.email}
            disabled={!isEditMode}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-gray-600 mb-2">
            Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="Enter your address"
            defaultValue={userData.address}
            disabled={!isEditMode}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
          />
        </div>

        <div className="md:col-span-2 w-full flex justify-end">
          <button
            type="button"
            className="bg-[#A15842] text-white py-2 px-6 rounded-lg focus:outline-none flex gap-3"
            onClick={() => {
              handleSave();
            }}
          >
            <File />
            <span>Save details</span>
          </button>
        </div>

        <div
          className={`overflow-x-hidden fixed top-10 right-0 bg-green-500 text-white px-6 py-4 rounded shadow-lg transform transition-transform duration-500 flex gap-3 ${
            showNotification ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Info />
          <span>User Information Saved</span>
        </div>

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