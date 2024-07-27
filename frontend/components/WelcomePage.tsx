"use client";

import { useAppDispatch, useAppSelector } from "@ext/lib/redux/hooks";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import imageWelcome from "./../public/image1.png";
import OneChat from "./OneChat";

function WelcomePage() {
  const selectedFriend: Friends = useAppSelector(
    (state) => state.selectedFriend.value
  );

  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<string>("");
  const [userSender, setUserSender] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if ((session as any)?.idUser && (session as any)?.name) {
      setUserId((session as any)?.idUser);
      setUserSender((session as any)?.name);
    }
  }, [session]);

  if (selectedFriend._id === "") {
    return (
      <div className="w-full h-full p-3 bg-[#222e35] border border-gray-500 flex flex-col justify-center items-center gap-3">
        <div>
          <Image
            src={imageWelcome}
            alt="photo welcome"
            width={100}
            height={100}
            className="w-96"
            unoptimized={true}
            priority
          />
        </div>
        <h1 className="text-white text-3xl font-bold">Welcome to Chat-App</h1>
      </div>
    );
  }
  return <OneChat selectedFriend={selectedFriend} />;
}

export default WelcomePage;
