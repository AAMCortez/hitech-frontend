"use client";
import Link from "next/link";
import React from "react";
import { login } from "../api";

export default function LoginPage() {

   const [user, setUser] = React.useState({
      email: "",
      password: "",
   });
   const [loading, setLoading] = React.useState(false);
   
   const onLogin = async () => {
      try {
         setLoading(true);
         const response = await login(user);
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
         <h1>{loading ? "Processing" : "Login"}</h1>
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
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
         >
            Login here
         </button>
         <Link href="/signup">Visit Signup page</Link>
      </div>
   );
}
