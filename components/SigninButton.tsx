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
    >
      Sign In
    </Button>
  );
};

export default SigninButton;
