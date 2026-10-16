"use client";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";

import React from "react";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }
  return (
    <div>
      <h1>{session?.user?.name}</h1>
      <h2>{session?.user?.email}</h2>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};

export default ProfilePage;
