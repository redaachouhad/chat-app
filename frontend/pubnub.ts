import PubNub from "pubnub";
const pubnub: PubNub = new PubNub({
  publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY as string,
  subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBE_KEY as string,
  uuid: "frontend-uuid", // Unique identifier for the client
});

export default pubnub;
