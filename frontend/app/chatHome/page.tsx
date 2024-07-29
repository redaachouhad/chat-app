"use client";

import Chats from "@ext/components/Chats";
import WelcomePage from "@ext/components/WelcomePage";
import { setListOfFriends } from "@ext/lib/redux/features/listOfFriendsSlice";
import { useAppDispatch, useAppSelector } from "@ext/lib/redux/hooks";
import { getFriends } from "@ext/lib/usefulFunctions";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

function Page() {
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string>("");

  const selectedFriend: Friends = useAppSelector(
    (state) => state.selectedFriend.value
  );

  useEffect(() => {
    if ((session as any)?.idUser) {
      setUserId((session as any)?.idUser);
    }
  }, [session]);
  useEffect(() => {
    const fetchFriends = async () => {
      if (session) {
        const friends: Friends[] = await getFriends(
          (session as any)?.idUser as string
        );

        dispatch(setListOfFriends(friends));
      }
    };
    fetchFriends();
  }, [session]);

  return (
    <>
      <Chats />
      <WelcomePage />
    </>
  );
}

export default Page;
