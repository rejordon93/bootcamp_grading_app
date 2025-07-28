"use client";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/sighUp", { username, email, password });
      router.push("/client/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          placeholder="enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>
          if you have accont <Link href="/client/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
