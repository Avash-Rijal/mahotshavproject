"use client"

import { useToast } from "@/hooks/use-toast";
import { authClient } from "lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {

  const { toast } = useToast();
  const router = useRouter()

  async function onClick(e) {
    e.preventDefault();
    console.log("button clicked");
    
    const { data, error } = await authClient.signOut({
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
        
        toast({
          title: "User logged out Successfully",
          status: "success"
        });

        router.push("/login")
      },
      onError: (ctx) => {
        console.log(ctx);
        toast({
          title: "User could not be logged out.",
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
              Logout from Mahotshav
            </h2>
            <p className="text-sm text-[#A15842] mb-6">
              Click the button below to Logout.
            </p>

              <button
                type="submit"
                onClick={onClick}
                className="w-full mt-4 bg-[#A15842] text-white py-4 rounded-2xl text-lg font-semibold hover:bg-[#8E4839] transition-colors"
              >
                Logout
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
