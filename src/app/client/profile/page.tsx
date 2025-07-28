"use client";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { redirectByRole } from "@/utils/redirectByRole";
import { useUserStore } from "@/store";

export default function Profile() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/profile", {
        firstname,
        lastname,
        state,
        zipcode,
        phone,
        city,
        currentStatus,
      });

      const { role } = useUserStore.getState(); // <-- get user role from zustand
      redirectByRole(role, router); // <-- call helper directly
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-color-black p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Profile Info
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">First Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter first name"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Last Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter last name"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="tel"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">City</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Current Status</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter current status"
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">State</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Zip Code</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter zip code"
            value={zipcode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Profile
        </button>
        <button
          onClick={() => router.back()}
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Back
        </button>
      </form>
    </div>
  );
}
