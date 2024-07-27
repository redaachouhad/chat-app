"use client";

import { formatTimestamp } from "@ext/lib/dateFormatter";
import { setListOfReceivedInvitation } from "@ext/lib/redux/features/listOfReceivedInvitationSlice";
import { useAppDispatch } from "@ext/lib/redux/hooks";
import {
  addFriends,
  deleteReceivedInvitation,
  getReceiveInvitation,
} from "@ext/lib/usefulFunctions";
import { MouseEvent } from "react";
import Avatar from "react-avatar";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function CardReceivedInvitation({ item }: { item: Invitation }) {
  const dispatch = useAppDispatch();
  const onClickDeleteReceivedInvitation = async (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    await deleteReceivedInvitation(item._id as string);
    const sentInvitations: Invitation[] = await getReceiveInvitation(
      item.idReceiver as string
    );
    dispatch(setListOfReceivedInvitation(sentInvitations));
  };

  const onClickAcceptInvitation = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await addFriends(item);
    await deleteReceivedInvitation(item._id as string);
    const sentInvitations: Invitation[] = await getReceiveInvitation(
      item.idReceiver as string
    );
    dispatch(setListOfReceivedInvitation(sentInvitations));
  };

  return (
    <div className="text-white flex flex-col justify-start items-center gap-2 p-3 w-full lg:w-[60%] border-2 border-blue-500 rounded-lg">
      <Avatar
        src={item.imageSender}
        name={item.usernameSender}
        size="50"
        textSizeRatio={1.75}
        round={true}
      />
      <p className="text-xl text-center">{item.usernameSender}</p>
      <span className="text-xs">
        {formatTimestamp(String(item?.createdAt))}
      </span>
      <div className="w-full flex justify-between text-sm">
        <button
          onClick={onClickDeleteReceivedInvitation}
          className="flex flex-row items-center gap-2 bg-red-500 hover:bg-red-600 p-1.5 rounded-md"
        >
          <p>Decline</p>
          <IoClose size={20} />
        </button>
        <button
          onClick={onClickAcceptInvitation}
          className="flex flex-row items-center gap-2 bg-blue-500 hover:bg-blue-600 p-1.5 rounded-md"
        >
          <p>Accept</p>
          <FaCheck size={20} />
        </button>
      </div>
    </div>
  );
}

export default CardReceivedInvitation;
