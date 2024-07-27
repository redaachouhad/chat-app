"use client";

import { setListOfSentInvitation } from "@ext/lib/redux/features/listOfSentInvitationSlice";
import { useAppDispatch } from "@ext/lib/redux/hooks";
import { sendInvitation } from "@ext/lib/usefulFunctions";
import { MouseEvent } from "react";
import Avatar from "react-avatar";
import { RiUserAddFill } from "react-icons/ri";

function CardPeople({ other, me }: { other: People; me: any }) {
  const dispatch = useAppDispatch();
  const onClickSendInvitation = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const invitation = {
      idSender: me.id,
      usernameSender: me.name,
      emailSender: me.email,
      imageSender: me.image,
      idReceiver: other._id,
      usernameReceiver: other.username,
      emailReceiver: other.email,
      imageReceiver: other.image,
    };
    const sentInvitations: Invitation[] = await sendInvitation(invitation);
    dispatch(setListOfSentInvitation(sentInvitations));
  };

  return (
    <div className="text-white flex flex-row justify-between items-center gap-2 p-3 w-full lg:w-[60%] border-2 border-blue-500 rounded-lg">
      <div className="flex flex-row items-center gap-2">
        <Avatar src={other.image} size="50" textSizeRatio={1.75} round={true} />
        <div>
          <p className="text-xl text-center">{other.username}</p>
        </div>
      </div>

      <button
        onClick={onClickSendInvitation}
        className="flex flex-row items-center gap-2 bg-blue-500 hover:bg-blue-600 p-1.5 rounded-md text-sm"
      >
        <p>Send invitation</p>
        <RiUserAddFill size={20} />
      </button>
    </div>
  );
}

export default CardPeople;
