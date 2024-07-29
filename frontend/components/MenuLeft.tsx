"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { BsPeopleFill } from "react-icons/bs";
import { GrLogout } from "react-icons/gr";
import { MdOutlineMessage } from "react-icons/md";

function MenuLeft() {
  const router = useRouter();
  const path = usePathname();
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (session) {
      setUsername((session as any)?.name as string);
      setImage((session as any)?.image as string);
    }
  }, [session]);
  return (
    <div className="h-full p-2.5 bg-[#222e35] flex flex-col justify-start items-center border border-gray-500">
      <Avatar src={image} name={username} size="50" round={true} />
      <br />
      <div
        onClick={() => {
          router.push("/chatHome");
        }}
        className={
          "p-2 hover:bg-[rgba(255,255,255,0.1)] cursor-pointer rounded-full flex justify-center items-center " +
          (path === "/chatHome" || path.startsWith("/chatHome/oneChat/")
            ? "bg-[rgba(255,255,255,0.1)]"
            : "")
        }
      >
        <MdOutlineMessage size={28} className="text-[rgba(255,255,255,0.4)]" />
      </div>
      <br />

      <div
        onClick={() => {
          router.push("/chatHome/invitation");
        }}
        className={
          "p-2 hover:bg-[rgba(255,255,255,0.1)] cursor-pointer rounded-full flex justify-center items-center " +
          (path === "/chatHome/invitation" ? "bg-[rgba(255,255,255,0.1)]" : "")
        }
      >
        <BsPeopleFill size={28} className="text-[rgba(255,255,255,0.4)]" />
      </div>
      {/* <br />
      <div className="p-2 hover:bg-[rgba(255,255,255,0.1)] cursor-pointer rounded-full flex justify-center items-center">
        <IoSettingsOutline size={28} className="text-[rgba(255,255,255,0.4)]" />
      </div> */}
      <br />
      <div
        onClick={async () => {
          await signOut({ callbackUrl: "/" });
        }}
        className="p-2 hover:bg-[rgba(255,255,255,0.1)] cursor-pointer rounded-full flex justify-center items-center"
      >
        <GrLogout size={28} className="text-[rgba(255,255,255,0.4)]" />
      </div>
    </div>
  );
}

export default MenuLeft;
