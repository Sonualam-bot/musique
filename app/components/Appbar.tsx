"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {  Music } from "lucide-react";
import Link from "next/link";

function Appbar() {
  const session = useSession();
  return (
    <header className="py-4 px-2 sm:p-4 bg-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Music className="h-8 w-8 text-pink-500" />
          <span className=" text-sm sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            La Musique
          </span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="#" className="hover:text-pink-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-pink-400 transition-colors">
                Features
              </Link>
            </li>
            {session?.data?.user && (
              <button
                className=" hover:text-pink-400 transition-colors "
                onClick={() => signOut()}
              >
                Logout
              </button>
            )}
            {!session?.data?.user && (
              <button
                className="hover:text-pink-400 transition-colors"
                onClick={() => signIn()}
              >
                Signin
              </button>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Appbar;
