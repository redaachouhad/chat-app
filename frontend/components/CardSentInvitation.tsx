"use client";

import { formatTimestamp } from "@ext/lib/dateFormatter";
import { setListOfSentInvitation } from "@ext/lib/redux/features/listOfSentInvitationSlice";
import { useAppDispatch } from "@ext/lib/redux/hooks";
import {
  deleteSentInvitation,
  getSentInvitation,
} from "@ext/lib/usefulFunctions";
import { MouseEvent } from "react";
import Avatar from "react-avatar";
import { IoClose } from "react-icons/io5";

function CardSentInvitation({ invitation }: { invitation: Invitation }) {
  const dispatch = useAppDispatch();
  const onClickCancelInvitation = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await deleteSentInvitation(invitation._id as string);
    const sentInvitations: Invitation[] = await getSentInvitation(
      invitation.idSender as string
    );
    dispatch(setListOfSentInvitation(sentInvitations));
  };
  return (
    <div className="text-white flex flex-col justify-start items-center gap-3 p-3 w-full lg:w-[60%] border-2 border-blue-500 rounded-lg">
      <Avatar
        src={invitation.imageReceiver}
        name={invitation.usernameReceiver}
        size="50"
        textSizeRatio={1.75}
        round={true}
      />
      <p className="text-xl text-center">{invitation.usernameReceiver}</p>
      <span className="text-xs">
        {formatTimestamp(String(invitation.createdAt))}
      </span>
      <div className="w-full flex justify-center text-sm">
        <button
          onClick={onClickCancelInvitation}
          className="flex flex-row items-center gap-2 bg-red-500 hover:bg-red-600 p-1.5 rounded-md"
        >
          <p className="text-md">Cancel invitation</p>
          <IoClose size={20} />
        </button>
      </div>
    </div>
  );
}

export default CardSentInvitation;
