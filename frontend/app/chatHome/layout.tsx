"use client";

import MenuLeft from "@ext/components/MenuLeft";
import { setListOfFriends } from "@ext/lib/redux/features/listOfFriendsSlice";
import { useAppDispatch } from "@ext/lib/redux/hooks";
import { getFriends } from "@ext/lib/usefulFunctions";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
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
    <div className="w-full h-[100vh] flex flex-row justify-between">
      <MenuLeft />

      {children}
    </div>
  );
}
