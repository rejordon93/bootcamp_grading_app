"use client";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/store";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalLoading(true);
    setLocalError(null);
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { role, token, username, isOnline } = res.data; // api role data form server
      useUserStore.getState().setUser({ username, role, token, isOnline }); // context!
      if (role === "teacher") {
        router.push("/client/teacherDashboard");
      } else {
        router.push("/client/studentDashboard");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLocalError(error.message || "An unexpected error occurred.");
      }
    } finally {
      setLocalLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={localLoading}
          required
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={localLoading}
          required
        />
        {localError && (
          <p style={{ color: "red", marginTop: "0.5rem" }}>{localError}</p>
        )}
        <button type="submit" disabled={localLoading}>
          {localLoading ? "Logging in..." : "Login"}
        </button>
        <p>
          If you dont have accont <Link href="/client/signUp">SighUp</Link>
        </p>
      </form>
    </div>
  );
}
