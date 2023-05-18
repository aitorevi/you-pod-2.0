"use client";
import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const userData = {
      username,
      name,
      email,
      password,
    };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        router.push("/");
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "An error occurred.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An error occurred. Please try again."); // Set a generic error message
    }
  };

  return (
    <div className="flex justify-center content-center w-full mt-6">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              minLength={6}
              size="lg"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={true}
            />
            <Input
              type="text"
              minLength={3}
              size="lg"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={true}
            />
            <Input
              type="email"
              size="lg"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a
              href="#"
              onClick={() => signIn()}
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </a>
          </Typography>
        </form>
        {errorMessage && (
          <Typography color="red" className="mt-4 text-center font-normal">
            {errorMessage}
          </Typography>
        )}
      </Card>
    </div>
  );
}
