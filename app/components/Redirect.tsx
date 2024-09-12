"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Redirect() {
  const session = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session?.data?.user) {
      router.push("/dashboard");
    }
  }, [session]);

  return <div></div>;
}

export default Redirect;
