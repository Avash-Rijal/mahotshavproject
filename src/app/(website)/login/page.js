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
    
    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      callbackURL: (formData.email === "admin@gmail.com" || formData.email === "dhirazdhungel@gmail.com") ? "/dashboard" : "/events"
    }, {
      onRequest: (ctx) => {
        toast({
          title: "Please wait..."
        })
      },
      onSuccess: (ctx) => {
        const userData = {
          email: formData.email,
          password: formData.password,
        };
        
        console.log('Form submission successful:', userData);
        
        resetForm();
        
        toast({
          title: "User validated Successfully",
          status: "success"
        });
      },
      onError: (ctx) => {
        console.log(ctx);
        toast({
          title: "User account not created.",
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

        <div className="lg:w-1/2 mt-12 lg:mt-0 lg:pl-12 w-full">
          <div className="rounded-lg lg:p-8 bg-[#FDFDFD4D] bg-opacity-30 p-8">
            <h2 className="text-3xl font-semibold">
              Login to Mahotshav
            </h2>
            <p className="text-sm text-[#A15842] mb-6">
              Book any events easily with no hassle
            </p>
            <form className="space-y-4"
            onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent w-full mt-1 p-2 border-b border-neutral-400 focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-transparent w-full mt-1 p-2 border-b border-neutral-400 focus:outline-none focus:border-primary-600"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-[#A15842] text-white py-4 rounded-2xl text-lg font-semibold hover:bg-[#8E4839] transition-colors"
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-sm">
              Don't have an account?
              <a
                href="/register"
                className="text-[#A15842] font-medium hover:underline ms-2"
              >
                Create an Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
