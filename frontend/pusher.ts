import Pusher from "pusher-js";

var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
  cluster: "eu",
});

export default pusher;
