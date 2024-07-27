import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (userId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (userId) {
      const socketIo = io(process.env.NEXT_PUBLIC_URL_BACKEND as string);

      socketIo.on("connect", () => {
        console.log("connected to socket server:", socketIo.id);
        socketIo.emit("register", userId);
      });

      setSocket(socketIo);

      return () => {
        if (socketIo) {
          socketIo.disconnect();
        }
      };
    }
  }, [userId]);

  const sendMessage = (content: Message, to: string) => {
    if (socket) {
      socket.emit("private message", { content, to });
    }
  };

  const onMessage = (callback: (message: Message) => void) => {
    if (socket) {
      socket.on("private message", callback);
    }
  };

  return { socket, sendMessage, onMessage };
};

export default useSocket;
