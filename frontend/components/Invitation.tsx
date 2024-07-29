"use client";

import { setListOfFriends } from "@ext/lib/redux/features/listOfFriendsSlice";
import { setListOfPeople } from "@ext/lib/redux/features/listOfPeopleSlice";
import { setListOfReceivedInvitation } from "@ext/lib/redux/features/listOfReceivedInvitationSlice";
import { setListOfSentInvitation } from "@ext/lib/redux/features/listOfSentInvitationSlice";
import { useAppDispatch, useAppSelector } from "@ext/lib/redux/hooks";
import {
  findPeople,
  getFriends,
  getReceiveInvitation,
  getSentInvitation,
} from "@ext/lib/usefulFunctions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaSearch, FaUserPlus } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { MdInsertInvitation } from "react-icons/md";
import CardPeople from "./CardPeople";
import CardReceivedInvitation from "./CardReceivedInvitation";
import CardSentInvitation from "./CardSentInvitation";
import CardYourFriends from "./CardYourFriends";

function Invitation() {
  const [activateButton, setActivateButton] = useState(0);
  const [style0, setStyle0] = useState("");
  const [style1, setStyle1] = useState("rounded-bl-xl");
  const [style2, setStyle2] = useState("");
  const [style3, setStyle3] = useState("");

  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const [userId, setUserId] = useState("");
  const [userMe, setUserMe] = useState({
    id: "",
    name: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    if (session?.user) {
      setUserId((session as any)?.idUser);
      setUserMe({
        id: (session as any)?.idUser,
        name: (session as any)?.name,
        email: (session as any)?.email,
        image: (session as any)?.image,
      });
    }
  }, [session]);

  const listOfPeople: People[] = useAppSelector(
    (state) => state.listOfPeople.value
  );

  const listOfSentInvitations: Invitation[] = useAppSelector(
    (state) => state.listOfSentInvitation.value
  );

  const listOfReceivedInvitations: Invitation[] = useAppSelector(
    (state) => state.listOfReceivedInvitation.value
  );

  const listOfFriends: Friends[] = useAppSelector(
    (state) => state.listOfFriends.value
  );

  useEffect(() => {
    const fetchPeople = async () => {
      if (session) {
        const peoples: People[] = await findPeople(
          (session as any)?.idUser as string
        );
        dispatch(setListOfPeople(peoples));
      }
    };
    const fetchSentInvitation = async () => {
      if (session) {
        const sentInvitations: Invitation[] = await getSentInvitation(
          (session as any)?.idUser as string
        );
        dispatch(setListOfSentInvitation(sentInvitations));
      }
    };

    const fetchReceivedInvitation = async () => {
      if (session) {
        const sentInvitations: Invitation[] = await getReceiveInvitation(
          (session as any)?.idUser as string
        );
        dispatch(setListOfReceivedInvitation(sentInvitations));
      }
    };

    const fetchFriends = async () => {
      if (session) {
        const friends: Friends[] = await getFriends(
          (session as any)?.idUser as string
        );
        dispatch(setListOfFriends(friends));
      }
    };
    if (activateButton === 0) {
      fetchFriends();
    } else if (activateButton === 1) {
      fetchPeople();
    } else if (activateButton === 2) {
      fetchReceivedInvitation();
    } else if (activateButton === 3) {
      fetchSentInvitation();
    }
  }, [activateButton, session]);

  const onClickStyle = (index: number) => {
    if (index === 0) {
      setActivateButton(0);
      setStyle0("");
      setStyle1("rounded-bl-xl");
      setStyle2("");
      setStyle3("");
    } else if (index === 1) {
      setActivateButton(1);
      setStyle0("rounded-br-xl");
      setStyle1("");
      setStyle2("rounded-bl-xl");
      setStyle3("");
    } else if (index === 2) {
      setActivateButton(2);
      setStyle0("");
      setStyle1("rounded-br-xl");
      setStyle2("");
      setStyle3("rounded-bl-xl");
    } else {
      setActivateButton(3);
      setStyle0("");
      setStyle1("");
      setStyle2("rounded-br-xl");
      setStyle3("");
    }
  };

  return (
    <div className="w-full h-full border border-gray-500 flex flex-col justify-start items-center bg-[rgb(8,19,38)] ">
      <div className="flex flex-col w-full">
        <div className="p-3 w-full flex flex-row justify-start items-center gap-3 bg-[#222e35]">
          <MdInsertInvitation size={28} className="text-white" />
          <p className="text-2xl font-bold text-white">Invitations</p>
        </div>
        <div className="flex flex-row justify-between text-lg text-white bg-[rgb(8,19,38)]">
          <div
            onClick={() => {
              onClickStyle(0);
            }}
            className={
              "w-full p-3 flex justify-center " +
              (activateButton == 0
                ? "bg-[rgb(8,19,38)]"
                : "bg-[#197ab2] " + style0)
            }
          >
            <div
              className={
                "cursor-pointer w-fit text-center flex flex-row items-center justify-center gap-2 p-1 " +
                (activateButton == 0
                  ? "border border-transparent border-b-white"
                  : "")
              }
            >
              <FaUsers size={26} />
              <p> Your friends </p>
            </div>
          </div>

          <div
            onClick={() => {
              onClickStyle(1);
            }}
            className={
              "w-full p-3 flex justify-center " +
              (activateButton == 1
                ? "bg-[rgb(8,19,38)]"
                : "bg-[#197ab2] " + style1)
            }
          >
            <div
              className={
                "cursor-pointer w-fit text-center flex flex-row items-center justify-center gap-2 p-1 " +
                (activateButton == 1
                  ? "border border-transparent border-b-white"
                  : "")
              }
            >
              <FaUserPlus size={25} />
              <p>People</p>
            </div>
          </div>

          <div
            onClick={() => {
              onClickStyle(2);
            }}
            className={
              "w-full p-3 flex justify-center " +
              (activateButton == 2
                ? "bg-[rgb(8,19,38)]"
                : "bg-[#197ab2] " + style2)
            }
          >
            <div
              className={
                "cursor-pointer w-fit text-center flex flex-row items-center justify-center gap-2 p-1 " +
                (activateButton == 2
                  ? "border border-transparent border-b-white"
                  : "")
              }
            >
              <FaArrowDown size={25} />
              <p>Received invitation</p>
            </div>
          </div>

          <div
            onClick={() => {
              onClickStyle(3);
            }}
            className={
              "w-full p-3 flex justify-center " +
              (activateButton == 3
                ? "bg-[rgb(8,19,38)]"
                : "bg-[#197ab2] " + style3)
            }
          >
            <div
              className={
                "cursor-pointer w-fit text-center flex flex-row items-center justify-center gap-2 p-1 " +
                (activateButton == 3
                  ? "border border-transparent border-b-white"
                  : "")
              }
            >
              <FaArrowUp size={25} />
              <p> Sent invitation</p>
            </div>
          </div>
        </div>
      </div>

      <br />
      <div className="w-[90%] lg:w-[60%] flex justify-center">
        <div className="w-full flex flex-row items-center gap-2 bg-[rgba(255,255,255,0.1)] p-2 rounded-lg">
          <input
            type="text"
            className="w-full bg-transparent text-white outline-none text-sm"
            placeholder="Search ..."
          />
          <FaSearch size={25} className="text-white" />
        </div>
      </div>
      <br />

      <div className="w-full h-full overflow-y-scroll p-4 py-6 bg-[rgb(8,19,38)] flex flex-col items-center">
        <div className="w-full flex flex-col justify-center items-center gap-8">
          {activateButton === 0 &&
            listOfFriends.map((item, index) => {
              return <CardYourFriends key={index} item={item} meId={userId} />;
            })}

          {activateButton === 1 &&
            listOfPeople.map((other, index) => {
              return <CardPeople key={index} other={other} me={userMe} />;
            })}

          {activateButton === 2 &&
            listOfReceivedInvitations.map((item, index) => {
              return <CardReceivedInvitation key={index} item={item} />;
            })}

          {activateButton === 3 &&
            listOfSentInvitations.map((invitation, index) => {
              return <CardSentInvitation key={index} invitation={invitation} />;
            })}
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
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
          }
        `}</style>
      </div>
    </div>
  );
}

export default Invitation;
