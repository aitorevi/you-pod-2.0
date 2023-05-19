"use client";
import { Button } from "@material-tailwind/react";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const SigninButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
        <Button
          onClick={() => signOut()}
          variant="outlined"
          size="sm"
          color="pink"
          fullWidth
        >
          Sign Out
        </Button>
    );
  }
  return (
    <Button
      onClick={() => signIn()}
      variant="outlined"
      size="sm"
      color="blue-gray"
      fullWidth
      style={{ boxShadow: "0 1px 2px rgba(0, 0, 0, 0.5)" }}
    >
      Sign In
    </Button>
  );
};

export default SigninButton;
