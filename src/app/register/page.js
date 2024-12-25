import Image from "next/image";

export default function Page() {
  return (
    // <div
    //   className="py-12 px-16"
    //   style={{
    //     background:
    //       "linear-gradient(97.8deg, rgba(225, 153, 35, 0.23) 0.36%, rgba(145, 62, 61, 0.23) 100%)",
    //   }}
    // >
    //   <div className="w-1/2">
    //     <div className="w-full mb-8">
    //       <img
    //         alt="eventPhoto"
    //         src="/eventPhoto.jpeg"
    //         className="w-full object-cover object-center border-0 rounded-2xl"
    //       ></img>
    //     </div>
    //     <div className="font-medium text-[#92403F] text-xl mb-4">
    //       महोत्सव (Mahotsav) is a digital event platform that celebrates Nepal's
    //       rich cultural heritage. We connect communities by curating diverse
    //       events across festivals, music, arts, sports, and workshops.
    //     </div>
    //     <div className="font-normal text-[#92403F]">
    //       <span className="text-xl">Founded in 2024</span>
    //       <br />
    //       <span className="text-base">Kathmandu, Nepal</span>
    //     </div>
    //   </div>
    //   <div className="w-1/2">
    //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FCE5D8] to-[#FBE8EF]">
    //       <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
    //         <h1 className="text-2xl font-bold text-center mb-2">
    //           Register to Mahotshav
    //         </h1>
    //         <p className="text-center text-sm text-neutral-600 mb-6">
    //           Book any events easily with no hassle
    //         </p>

    //         <form className="space-y-4">
    //           {/* Name */}
    //           <div>
    //             <label
    //               htmlFor="name"
    //               className="block text-sm font-medium text-neutral-700"
    //             >
    //               Name
    //             </label>
    //             <input
    //               type="text"
    //               id="name"
    //               className="w-full mt-1 p-2 border-b border-neutral-400 focus:outline-none focus:border-primary-600"
    //               placeholder="Enter your name"
    //             />
    //           </div>

    //           {/* Email */}
    //           <div>
    //             <label
    //               htmlFor="email"
    //               className="block text-sm font-medium text-neutral-700"
    //             >
    //               Email
    //             </label>
    //             <input
    //               type="email"
    //               id="email"
    //               className="w-full mt-1 p-2 border-b border-neutral-400 focus:outline-none focus:border-primary-600"
    //               placeholder="Enter your email"
    //             />
    //           </div>

    //           {/* Phone Number */}
    //           <div>
    //             <label
    //               htmlFor="phone"
    //               className="block text-sm font-medium text-neutral-700"
    //             >
    //               Phone Number
    //             </label>
    //             <input
    //               type="tel"
    //               id="phone"
    //               className="w-full mt-1 p-2 border-b border-neutral-400 focus:outline-none focus:border-primary-600"
    //               placeholder="Enter your phone number"
    //             />
    //           </div>

    //           {/* Date of Birth */}
    //           <div>
    //             <label
    //               htmlFor="dob"
    //               className="block text-sm font-medium text-neutral-700"
    //             >
    //               Date of Birth
    //             </label>
    //             <input
    //               type="date"
    //               id="dob"
    //               className="w-full mt-1 p-2 border-b border-neutral-400 focus:outline-none focus:border-primary-600"
    //             />
    //           </div>

    //           {/* Address */}
    //           <div>
    //             <label
    //               htmlFor="address"
    //               className="block text-sm font-medium text-neutral-700"
    //             >
    //               Address
    //             </label>
    //             <input
    //               type="text"
    //               id="address"
    //               className="w-full mt-1 p-2 border-b border-neutral-400 focus:outline-none focus:border-primary-600"
    //               placeholder="Enter your address"
    //             />
    //           </div>

    //           {/* Submit Button */}
    //           <button
    //             type="submit"
    //             className="w-full mt-4 bg-[#A15842] text-white py-2 rounded-full text-lg font-semibold hover:bg-[#8E4839] transition-colors"
    //           >
    //             Create Account
    //           </button>
    //         </form>

    //         <p className="mt-4 text-center text-sm text-neutral-600">
    //           Already have an account?{" "}
    //           <a
    //             href="/login"
    //             className="text-[#A15842] font-medium hover:underline"
    //           >
    //             Log In
    //           </a>
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
          <div className="rounded-lg lg:p-8">
            <h2 className="text-3xl font-semibold">
              Register to Mahotshav
            </h2>
            <p className="text-sm text-[#A15842] mb-6">
              Book any events easily with no hassle
            </p>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-transparent w-full mt-1 p-2 border-b border-neutral-400 focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-transparent w-full mt-1 p-2 border-b border-neutral-400 focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="bg-transparent w-full mt-1 p-2 border-b border-neutral-400 focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  className="bg-transparent w-full mt-1 p-2 border-b border-neutral-400 focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="bg-transparent w-full mt-1 p-2 border-b border-neutral-400 focus:outline-none focus:border-primary-600"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-[#A15842] text-white py-4 rounded-2xl text-lg font-semibold hover:bg-[#8E4839] transition-colors"
              >
                Create Account
              </button>
            </form>

            <p className="mt-4 text-sm">
              Already have an account?
              <a
                href="#"
                className="text-[#A15842] font-medium hover:underline ms-2"
              >
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
