"use client";

import MenuLeft from "@ext/components/MenuLeft";
import { formatTimestamp } from "@ext/lib/dateFormatter";
import { setListOfFriends } from "@ext/lib/redux/features/listOfFriendsSlice";
import { setListOfMessages } from "@ext/lib/redux/features/listOfMessagesSlice";
import { setListOfPeople } from "@ext/lib/redux/features/listOfPeopleSlice";
import { setListOfReceivedInvitation } from "@ext/lib/redux/features/listOfReceivedInvitationSlice";
import { setListOfSentInvitation } from "@ext/lib/redux/features/listOfSentInvitationSlice";
import { useAppDispatch, useAppSelector } from "@ext/lib/redux/hooks";
import {
  findPeople,
  getAllMessages,
  getFriends,
  getReceiveInvitation,
  getSentInvitation,
} from "@ext/lib/usefulFunctions";
import pusher from "@ext/pusher";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Flip, toast } from "react-toastify";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<string>("");
  const selectedFriend: Friends = useAppSelector(
    (state) => state.selectedFriend.value
  );
  useEffect(() => {
    const fetchFriends = async () => {
      if (session) {
        const friends: Friends[] = await getFriends(
          (session as any)?.idUser as string
        );
        dispatch(setListOfFriends(friends));
      }
      if ((session as any)?.idUser) {
        setUserId((session as any)?.idUser);
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
              src={data.imageSender}
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

  useEffect(() => {
    var channel = pusher.subscribe("my-channel");
    const handleEvent = async (data: Invitation) => {
      toast(
        <div className="flex flex-col justify-center text-black gap-2">
          <div className="flex flex-row justify-start items-center gap-2">
            <div className="flex flex-col">
              <p className="font-bold text-md">{data.usernameSender}</p>
            </div>
          </div>
          <p>has sent you an invitation</p>
        </div>,
        {
          position: "top-center",
          transition: Flip,
        }
      );
      const listOfPeople = await findPeople(userId);
      const receivedInvitations: Invitation[] = await getReceiveInvitation(
        data.idReceiver as string
      );
      dispatch(setListOfReceivedInvitation(receivedInvitations));
      dispatch(setListOfPeople(listOfPeople));
    };
    channel.bind("invitation-" + userId, handleEvent);
    return () => {
      channel.unbind("invitation-" + userId);
      pusher.unsubscribe("my-channel");
    };
  }, [userId]);

  useEffect(() => {
    var channel = pusher.subscribe("my-channel");
    const handleEvent = async (data: Invitation) => {
      toast(
        <div className="flex flex-col justify-center text-black gap-2">
          <div className="flex flex-row justify-start items-center gap-2">
            <div className="flex flex-col">
              <p className="font-bold text-md">{data.usernameReceiver}</p>
            </div>
          </div>
          <p>has accepted your invitation and become your friend ✅</p>
        </div>,
        {
          position: "top-center",
          transition: Flip,
        }
      );

      const listOfPeople = await findPeople(userId);
      dispatch(setListOfPeople(listOfPeople));
    };
    channel.bind("accept-invitation-" + userId, handleEvent);
    return () => {
      channel.unbind("accept-invitation-" + userId);
      pusher.unsubscribe("my-channel");
    };
  }, [userId]);

  useEffect(() => {
    var channel = pusher.subscribe("my-channel");
    const handleEvent = async (data: Invitation) => {
      toast(
        <div className="flex flex-col justify-center text-black gap-2">
          <div className="flex flex-row justify-start items-center gap-2">
            <div className="flex flex-col">
              <p className="font-bold text-md">{data.usernameReceiver}</p>
            </div>
          </div>
          <p>has refused your invitation ❌</p>
        </div>,
        {
          position: "top-center",
          transition: Flip,
        }
      );

      const listOfPeople = await findPeople(userId);
      const sentInvitations: Invitation[] = await getSentInvitation(
        data.idSender as string
      );
      dispatch(setListOfPeople(listOfPeople));
      dispatch(setListOfSentInvitation(sentInvitations));
    };
    channel.bind("refuse-invitation-" + userId, handleEvent);
    return () => {
      channel.unbind("refuse-invitation-" + userId);
      pusher.unsubscribe("my-channel");
    };
  }, [userId]);

  return (
    <div className="w-full h-[100vh] flex flex-row justify-between">
      <MenuLeft />

      {children}
    </div>
  );
}
