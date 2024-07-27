import { createServer, Server } from "http";
import next from "next";
import { Socket } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

interface Users {
  [key: string]: string;
}
const users: Users = {};

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(server);

  io.on("connection", (socket: Socket) => {
    console.log("a user connected:", socket.id);

    // Listen for an event to register the user
    socket.on("register", (userId: string) => {
      users[userId] = socket.id;
      console.log("User registered:", userId, socket.id);
    });

    socket.on("private message", (data: { content: string; to: string }) => {
      const { content, to } = data;
      const toSocketId = users[to]; // Get the recipient's socket ID
      if (toSocketId) {
        socket.to(toSocketId).emit("private message", {
          content,
          from: socket.id,
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected:", socket.id);
      // Remove the user from the users object
      for (const [userId, socketId] of Object.entries(users)) {
        if (socketId === socket.id) {
          delete users[userId];
          break;
        }
      }
    });
  });

  server.listen(3000, (err?: any) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
