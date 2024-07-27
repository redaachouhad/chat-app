"use client";

import { setListOfMessages } from "@ext/lib/redux/features/listOfMessagesSlice";
import { setSelectedFriend } from "@ext/lib/redux/features/selectedFriendSlice";
import { useAppDispatch, useAppSelector } from "@ext/lib/redux/hooks";
import { getAllMessages } from "@ext/lib/usefulFunctions";
import { MouseEvent } from "react";
import Avatar from "react-avatar";

function OneFriendChat({ item, userId }: { item: Friends; userId: string }) {
  const dispatch = useAppDispatch();
  const onClickChoosingFriend = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(setSelectedFriend(item));
    const listOfMessages = await getAllMessages({
      id1: userId,
      id2: item.id1 === userId ? item.id2 : item.id1,
    });
    dispatch(setListOfMessages(listOfMessages));
  };
  const selectedFriend: Friends = useAppSelector(
    (state) => state.selectedFriend.value
  );

  return (
    <div
      onClick={onClickChoosingFriend}
      className={
        "w-full text-white p-2.5 flex flex-row justify-between items-center gap-2 border border-[rgba(255,255,255,0.1)] cursor-pointer " +
        ((item.id1 == selectedFriend.id1 && item.id2 == selectedFriend.id2) ||
        (item.id1 == selectedFriend.id2 && item.id2 == selectedFriend.id1)
          ? "bg-[rgba(255,255,255,0.2)]"
          : "hover:bg-[rgba(255,255,255,0.1)]")
      }
    >
      <div>
        <Avatar
          src={item.id1 === userId ? item.image2 : item.image1}
          name={item.id1 === userId ? item.username2 : item.username1}
          size="40"
          round={true}
        />
      </div>
      <div className="w-full flex flex-col justify-center items-start">
        <p className="">
          {item.id1 === userId ? item.username2 : item.username1}
        </p>
        <span className="overflow-hidden truncate text-xs font-light ">
          {"hjguydzbuin niudznkn jnn"?.slice(0, 20) + " ..."}
        </span>
      </div>
    </div>
  );
}

export default OneFriendChat;
