"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { signup } from "../api";
import axios from "axios";

export default function SignupPage() {
   const [user, setUser] = React.useState({
      email: "",
      password: "",
   });
   const [buttonDisabled, setButtonDisabled] = React.useState(false);
   const [loading, setLoading] = React.useState(false);

   const onSignup = async () => {
      try {
         setLoading(true);
         const response = signup(user);
         console.log(user);
         console.log(response);
      } catch (error: any) {
         console.log("Login failed", error.message);
         alert(error.message);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
         <h1>{loading ? "Processing" : "Signup"}</h1>
         <hr />
         <label htmlFor="email">email</label>
         <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
         />
         <label htmlFor="password">password</label>
         <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
         />
         <button
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
         >
            {buttonDisabled ? "No signup" : "Signup"}
         </button>
         <Link href="/login">Visit login page</Link>
      </div>
   );
}
