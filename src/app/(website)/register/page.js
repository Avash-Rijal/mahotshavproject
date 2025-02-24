"use client"

import { useToast } from "@/hooks/use-toast";
import { authClient } from "lib/auth-client";
import { useState } from "react";

export default function Page() {
  const { toast } = useToast();

  const initialFormState = {
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    address: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData(initialFormState);
  };

  async function onSubmit(values) {
    values.preventDefault();
    console.log("submit clicked");
    
    const { data, error } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      callbackURL: "/login"
    }, {
      onRequest: (ctx) => {
        toast({
          title: "Please wait..."
        })
      },
      onSuccess: (ctx) => {
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          dob: formData.dob,
          address: formData.address,
        };
        
        console.log('Form submission successful:', userData);
        
        resetForm();
        
        toast({
          title: "Account created successfully!",
          status: "success"
        });
      },
      onError: (ctx) => {
        console.log(ctx);
        toast({
          title: "Error Registering",
        });
      },
    });
  }

  return (
    <div className="pt-24 pb-24 bg-gradient-to-br from-[#FCE5D8] to-[#FBE8EF] min-h-screen flex flex-col">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between mt-12 px-6">
        <div className="lg:w-1/2">
          <div className="rounded-lg overflow-hidden">
            <img
              alt="eventPhoto"
              src="/eventPhoto.jpeg"
              className="w-full object-cover object-center"
            ></img>
          </div>
          <p className="mt-6 font-medium text-xl text-[#92403F]">
            महोत्सव (Mahotsav) is a digital event platform that celebrates
            Nepal's rich cultural heritage. We connect communities by curating
            diverse events across festivals, music, arts, sports, and workshops.
          </p>
          <p className="mt-4 text-sm text-[#92403F]">
            <span className="text-lg">Founded in 2024</span>
            <br />
            <span className="text-base">Kathmandu, Nepal</span>
          </p>
        </div>

        <div className="flex flex-1 justify-center items-center min-h-screen mt-12 sm:mt-0">
          <form onSubmit={onSubmit} className="w-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Register to Mahotshav
            </h2>
            <p className="text-[#A15842] mb-4">
              Book any events easily with no hassle
            </p>

            <label className="block mb-2 text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border-b border-gray-400 mb-4 bg-transparent focus:outline-none"
              required
            />

            <label className="block mb-2 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border-b border-gray-400 mb-4 bg-transparent focus:outline-none"
              required
            />

            <label className="block mb-2 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border-b border-gray-400 mb-4 bg-transparent focus:outline-none"
              required
            />

            <label className="block mb-2 text-gray-700">Phone Number</label> 
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border-b border-gray-400 mb-4 bg-transparent focus:outline-none"
              required
            />

            <label className="block mb-2 text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border-b border-gray-400 mb-4 bg-transparent focus:outline-none"
              required
            />

            <label className="block mb-2 text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border-b border-gray-400 mb-6 bg-transparent focus:outline-none"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#A15842] text-white p-3 rounded-lg hover:bg-[#A14837]"
            >
              Create Account
            </button>

            <p className="text-gray-600 mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-[#A15842] hover:underline">
                Log In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}