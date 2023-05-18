"use client";
import { Button } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";

const SignupButton = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session && session.user) {
    return <></>;
  }
  return (
    <Button
      onClick={() => router.push("/signup")}
      variant="gradient"
      size="sm"
      fullWidth
    >
      Sign Up
    </Button>
  );
};

export default SignupButton;
