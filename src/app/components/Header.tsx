"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getUser } from "../api";

type Props = {};

const Header = (props: Props) => {
   const [email, setEmail] = useState<string | null>(null);

   useEffect(() => {
      async function fetchData() {
         try {
            const user = {};
            const response = await getUser(user);
            console.log(response)
            const authToken = response.headers.authorization;

            const tokenParts = authToken.split(" ");
            const token = tokenParts.length === 2 ? tokenParts[1] : null;

            const userEmail = response.data.email;
            setEmail(userEmail);
         } catch (error) {
            // Handle errors here
            console.error("Error fetching user data:", error);
         }
      }

      fetchData();
   }, []);

   return (
      <header className="sticky top-0 p-5 flex items-start justify-between max-w-7xl mx-auto z-20 xl:items-center">
         <Link href="/">
            <button>Home {email ? `(${email})` : ""}</button>
         </Link>

         <Link href="/login">
            <button>Login</button>
         </Link>
         <Link href="/signup">
            <button>Signup</button>
         </Link>
      </header>
   );
};

export default Header;
