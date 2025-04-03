/*
import React from "react"
import "./Home.css"

const Home=()=>{
   
      return (
        <div className="bg-red-600 rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
          <div className="relative">
            <img
              src="https://storage.googleapis.com/a1aa/image/u6x9nTMTKA8IMsAASXFbVimiTRHd0ki7B811afrbTDU.jpg"
              alt="A person donating blood with a healthcare professional assisting"
              className="w-full opacity-50"
              width="1200"
              height="400"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
              <h1 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h1>
              <p className="mb-6">Whether you're looking to donate blood or in need of blood, we're here to help.</p>
              <div className="flex space-x-4">
                <button className="bg-white text-red-600 font-semibold py-2 px-4 rounded">Donate Now</button>
                <button className="bg-transparent border border-white text-white font-semibold py-2 px-4 rounded">Request Blood</button>
              </div>
            </div>
          </div>
        </div>
      );
    };)
}
export default Home;
*/

import React from "react";
import "./Home.css" ;
/*import Header from "../components/Header";*/

const Home = () => {
  return (
    <div className="bg-red-600 rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
      <div className="relative">
        <img
          src="https://storage.googleapis.com/a1aa/image/u6x9nTMTKA8IMsAASXFbVimiTRHd0ki7B811afrbTDU.jpg"
          alt="A person donating blood with a healthcare professional assisting"
          className="w-full opacity-50"
          width="1200"
          height="400"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
          <h1 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h1>
          <p className="mb-6">
            Whether you're looking to donate blood or in need of blood, we're here to help.
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-red-600 font-semibold py-2 px-4 rounded">
              Donate Now
            </button>
            <button className="bg-transparent border border-white text-white font-semibold py-2 px-4 rounded">
              Request Blood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
