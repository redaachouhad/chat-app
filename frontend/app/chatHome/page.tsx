"use client";

import Chats from "@ext/components/Chats";
import WelcomePage from "@ext/components/WelcomePage";
import { formatTimestamp } from "@ext/lib/dateFormatter";
import { setListOfFriends } from "@ext/lib/redux/features/listOfFriendsSlice";
import { setListOfMessages } from "@ext/lib/redux/features/listOfMessagesSlice";
import { useAppDispatch, useAppSelector } from "@ext/lib/redux/hooks";
import { getAllMessages, getFriends } from "@ext/lib/usefulFunctions";
import pusher from "@ext/pusher";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";
import { toast } from "react-toastify";

function Page() {
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string>("");

  const selectedFriend: Friends = useAppSelector(
    (state) => state.selectedFriend.value
  );

  useEffect(() => {
    if ((session as any)?.idUser && (session as any)?.name) {
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

  useEffect(() => {
    var channel = pusher.subscribe("my-channel");
    const handleEvent = async (data: Message) => {
      if (
        (data.idReceiver === selectedFriend.id1 &&
          data.idSender === selectedFriend.id2) ||
        (data.idReceiver === selectedFriend.id2 &&
          data.idSender === selectedFriend.id1)
      ) {
        const selectedMessages = await getAllMessages({
          id1: userId,
          id2:
            selectedFriend.id1 == userId
              ? selectedFriend.id2
              : selectedFriend.id1,
        });
        dispatch(setListOfMessages(selectedMessages));
      }
      const listOfFriends: Friends[] = await getFriends(userId);
      dispatch(setListOfFriends(listOfFriends));
      toast(
        <div className="flex flex-col justify-center text-black gap-2">
          <div className="flex flex-row justify-start items-center gap-2">
            <Avatar
              src={
                selectedFriend.id1 == userId
                  ? selectedFriend.image2
                  : selectedFriend.image1
              }
              name={data.usernameReceiver}
              size="40"
              round={true}
            />
            <div className="flex flex-col">
              <p className="font-bold text-md">{data.usernameSender}</p>
              <span className="text-xs font-medium">
                {formatTimestamp(String(data?.createdAt))}
              </span>
            </div>
          </div>
          <p>{data.message}</p>
        </div>
      );
    };
    channel.bind("private-message-" + userId, handleEvent);
    return () => {
      channel.unbind("private-message-" + userId);
      pusher.unsubscribe("my-channel");
    };
  }, [userId, selectedFriend]);

  return (
    <>
      <Chats />
      <WelcomePage />
    </>
  );
}

export default Page;
