import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID as string,
  key: process.env.PUSHER_KEY as string,
  secret: process.env.PUSHER_SECRET as string,
  cluster: process.env.PUSHER_CLUSTER as string,
  useTLS: true,
});

export async function POST(req: NextRequest) {
  try {
    const data: Invitation = await req.json();
    console.log("invitation-" + data.idReceiver);
    await pusher.trigger("my-channel", "invitation-" + data.idReceiver, data);
    return NextResponse.json({ message: "Message sent" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
