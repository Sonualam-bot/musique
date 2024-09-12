"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

function Appbar() {
  const session = useSession();
  return (
    <div className="flex justify-between ">
      <div>La Musique</div>
      <div>
        {session?.data?.user && (
          <button className="m-2 p-2 bg-blue-400 " onClick={() => signOut()}>
            Logout
          </button>
        )}
        {!session?.data?.user && (
          <button className="m-2 p-2 bg-blue-400" onClick={() => signIn()}>
            Signin
          </button>
        )}
      </div>
    </div>
  );
}

export default Appbar;
