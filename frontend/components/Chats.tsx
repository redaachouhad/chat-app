"use client";

import { useAppSelector } from "@ext/lib/redux/hooks";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import OneFriendChat from "./OneFriendChat";

function Chats() {
  const listOfFriends: Friends[] = useAppSelector(
    (state) => state.listOfFriends.value
  );
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState("");
  useEffect(() => {
    if (session) {
      setUserId((session as any)?.idUser);
    }
  }, [session]);

  return (
    <div className="w-[40%] h-full bg-[#12181c] border border-gray-500 flex flex-col">
      <div className="text-white flex flex-col gap-2 p-3">
        <p className="text-2xl font-bold">Chats</p>
        <div className="flex flex-row items-center gap-2 p-2 bg-[rgba(255,255,255,0.1)] rounded-md w-full">
          <input
            type="text"
            className="w-full bg-transparent outline-none"
            placeholder="Search ..."
          />
          <FaSearch size={20} />
        </div>
      </div>
      <br />
      <div className="h-full w-full overflow-y-scroll overflow-x-auto">
        {listOfFriends.map((item, index) => {
          return <OneFriendChat key={index} userId={userId} item={item} />;
        })}
        <style jsx>{`
          ::-webkit-scrollbar {
            width: 7px;
          }
          ::-webkit-scrollbar-thumb {
            background-color: #d1d5db;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-track {
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
          }
        `}</style>
      </div>
    </div>
  );
}

export default Chats;
