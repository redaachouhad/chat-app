"use client";

import { setListOfFriends } from "@ext/lib/redux/features/listOfFriendsSlice";
import { setListOfMessages } from "@ext/lib/redux/features/listOfMessagesSlice";
import { useAppDispatch, useAppSelector } from "@ext/lib/redux/hooks";
import {
  getAllMessages,
  getFriends,
  sendingMessageWithPusher,
  sendMessageApi,
} from "@ext/lib/usefulFunctions";

import { formatTimestamp } from "@ext/lib/dateFormatter";
import pusher from "@ext/pusher";
import { useSession } from "next-auth/react";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";
import { ImSpinner9 } from "react-icons/im";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";
import imageBackground from "./../public/backgroundChat.webp";

function OneChat({ selectedFriend }: { selectedFriend: Friends }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<string>("");
  const [userSender, setUserSender] = useState<string>("");

  const [messageOnly, setMessageOnly] = useState<string>("");
  const listOfMessages = useAppSelector((state) => state.listOfMessages.value);
  const [booleanHeight, setBooleanHeight] = useState<boolean>(false);
  const [booleanScroll, setBooleanScroll] = useState<boolean>(false);
  const [spinSending, setSpinSending] = useState<boolean>(false);

  useEffect(() => {
    if ((session as any)?.idUser && (session as any)?.name) {
      setUserId((session as any)?.idUser);
      setUserSender((session as any)?.name);
    }
  }, [session]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 288)}px`;
    };
    adjustHeight();
    textarea.addEventListener("input", adjustHeight);
    return () => {
      textarea.removeEventListener("input", adjustHeight);
    };
  }, [booleanHeight]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchFriends = async () => {
      if ((session as any)?.idUser) {
        const friends: Friends[] = await getFriends(
          (session as any)?.idUser as string
        );
        dispatch(setListOfFriends(friends));
      }
    };
    fetchFriends();
  }, [session]);

  const onClickSendMessage = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setSpinSending(true);
    const messageToSend = {
      idSender: userId,
      usernameSender: userSender,
      idReceiver:
        selectedFriend.id1 == userId ? selectedFriend.id2 : selectedFriend.id1,
      usernameReceiver:
        selectedFriend.id1 == userId
          ? selectedFriend.username2
          : selectedFriend.username1,
      message: messageOnly,
    };

    if (messageToSend.idReceiver.trim() === "") {
      toast.error("Error in sending message");
      setSpinSending(false);
      return;
    }
    if (messageToSend.idSender.trim() === "") {
      toast.error("Error in sending message");
      setSpinSending(false);
      return;
    }
    if (messageToSend.message.trim() === "") {
      toast.error("Message should not be empty");
      setSpinSending(false);
      return;
    }
    if (messageToSend.usernameReceiver.trim() === "") {
      toast.error("Error in sending message");
      setSpinSending(false);
      return;
    }
    if (messageToSend.usernameSender.trim() === "") {
      toast.error("Error in sending message");
      setSpinSending(false);
      return;
    }
    const savedMessage: Message = (await sendMessageApi(
      messageToSend
    )) as Message;

    await sendingMessageWithPusher(savedMessage);

    const listOfMessages = await getAllMessages({
      id1: userId,
      id2:
        selectedFriend.id1 == userId ? selectedFriend.id2 : selectedFriend.id1,
    });
    dispatch(setListOfMessages(listOfMessages));
    setMessageOnly("");
    setBooleanHeight(!booleanHeight);
    setBooleanScroll(!booleanScroll);
    scrollToBottom();
    setSpinSending(false);
    return;
  };

  const onChangeMessageOnly = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setMessageOnly(e.target.value);
  };

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [booleanScroll, listOfMessages]);

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
      channel.unbind(userId);
      pusher.unsubscribe("my-channel");
    };
  }, [userId, selectedFriend]);

  return (
    <div
      className="w-full h-full border border-gray-500 flex flex-col justify-start items-center relative"
      style={{
        backgroundImage: "url(" + imageBackground.src + ")",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute w-full h-full bg-[rgba(0,0,0,0.75)] left-0 top-0"></div>
      <div className="p-3 w-full flex flex-row justify-start items-center gap-3 bg-[#222e35] z-10">
        <Avatar
          src={
            selectedFriend.id1 == userId
              ? selectedFriend.image2
              : selectedFriend.image1
          }
          name={
            selectedFriend.id1 == userId
              ? selectedFriend.username2
              : selectedFriend.username1
          }
          size="50"
          round={true}
        />
        <div className="text-white">
          <p className="text-lg font-semibold">
            {selectedFriend.id1 == userId
              ? selectedFriend.username2
              : selectedFriend.username1}
          </p>
        </div>
      </div>
      <div className="w-full h-full overflow-y-scroll flex flex-col">
        <div className="w-full flex flex-col justify-center gap-4 p-4">
          {session &&
            listOfMessages.map((oneMessageItem, index) => {
              if (oneMessageItem.idSender === userId) {
                return (
                  <div key={index} className="w-full z-10 flex flex-col gap-1">
                    <div className="w-full flex flex-row justify-end items-start">
                      <p className="bg-[rgb(80,122,206)] p-2 max-w-[65%] text-white text-sm rounded-3xl rounded-tr-none">
                        {oneMessageItem.message}
                      </p>
                      <div className="border-[6px] border-[rgb(80,122,206)] border-r-transparent border-b-transparent"></div>
                    </div>
                    <div className="text-white text-xs flex justify-end">
                      <p>
                        {formatTimestamp(String(oneMessageItem?.createdAt))}
                      </p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="w-full z-10 flex flex-col gap-1">
                    <div className="w-full flex flex-row justify-start items-start z-10">
                      <div className="border-[6px] border-[rgb(80,122,206)] border-l-transparent border-b-transparent"></div>
                      <p className="bg-[rgb(80,122,206)] p-2 max-w-[65%] text-white text-sm rounded-3xl rounded-tl-none">
                        {oneMessageItem.message}
                      </p>
                    </div>
                    <div className="text-white text-xs flex justify-start">
                      <p>
                        {formatTimestamp(String(oneMessageItem?.createdAt))}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          <div ref={endOfMessagesRef}></div>
        </div>
        <style jsx>{`
          ::-webkit-scrollbar {
            width: 7px;
          }
          ::-webkit-scrollbar-thumb {
            background-color: #d1d5db;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-track {
            background-color: rgba(0, 0, 0, 0.8);
            border-radius: 4px;
          }
        `}</style>
      </div>
      <div className="w-full bg-[#222e35] flex flex-row items-center z-10">
        <div className="flex flex-row items-center gap-2 p-4 w-full">
          <textarea
            name=""
            id=""
            ref={textareaRef}
            onChange={(e) => onChangeMessageOnly(e)}
            disabled={spinSending}
            value={messageOnly}
            className="w-full p-2 bg-[#2d3f4a] outline-none rounded-md text-white text-sm max-h-72 overflow-y-auto resize-none"
          />
          {spinSending ? (
            <div className="text-white text-3xl animate-spin">
              <ImSpinner9 />
            </div>
          ) : (
            <div
              onClick={onClickSendMessage}
              className="text-[rgb(132,198,178)] cursor-pointer"
            >
              <IoSend size={25} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OneChat;
