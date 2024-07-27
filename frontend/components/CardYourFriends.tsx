"use client";

import { formatTimestamp } from "@ext/lib/dateFormatter";
import { setListOfFriends } from "@ext/lib/redux/features/listOfFriendsSlice";
import { useAppDispatch } from "@ext/lib/redux/hooks";
import { deleteFriend, getFriends } from "@ext/lib/usefulFunctions";
import { MouseEvent } from "react";
import Avatar from "react-avatar";
import { FaUser, FaUserSlash } from "react-icons/fa";

function CardYourFriends({ item, meId }: { item: Friends; meId: string }) {
  const dispatch = useAppDispatch();
  const onClickUnfriend = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await deleteFriend(item._id as string);
    const friends: Friends[] = await getFriends(meId as string);
    dispatch(setListOfFriends(friends));
  };

  return (
    <div className="text-white flex flex-col justify-start items-center gap-2 p-3 w-full lg:w-[60%] border-2 border-red-500 rounded-lg">
      <div className="w-full flex justify-end">
        <div className="text-sm bg-[rgb(222,71,104)] text-white rounded-md p-1 flex flex-row items-center justify-center gap-2">
          <FaUser />
          <span>Friend</span>
        </div>
      </div>
      <Avatar
        src={item.id1 === meId ? item.image2 : item.image1}
        name={item.id1 === meId ? item.username2 : item.username1}
        size="50"
        textSizeRatio={1.75}
        round={true}
      />
      <p className="text-xl text-center">
        {item.id1 === meId ? item.username2 : item.username1}
      </p>
      <span className="text-xs">
        {formatTimestamp(String(item?.createdAt))}
      </span>
      <button
        onClick={onClickUnfriend}
        className="text-white text-sm bg-blue-500 hover:bg-blue-600 p-1 rounded-md flex flex-row items-center justify-center gap-2 font-semibold"
      >
        <FaUserSlash size={18} />
        <p>Unfriend</p>
      </button>
    </div>
  );
}

export default CardYourFriends;
