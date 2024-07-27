"use client";

import { signIn } from "next-auth/react";
import { GoogleLoginButton } from "react-social-login-buttons";

const handleSignIn = async () => {
  await signIn("google", {
    callbackUrl: "/chatHome",
    redirect: true,
  });
};

export default function Home() {
  return (
    <div className="w-full h-[100vh] bg-[rgb(10,17,37)] flex justify-center items-center text-white">
      <div className="flex flex-col justify-center items-center gap-10">
        <h1 className="text-xl sm:text-3xl font-bold">Chat-App</h1>
        <GoogleLoginButton onClick={handleSignIn}></GoogleLoginButton>
      </div>
    </div>
  );
}
