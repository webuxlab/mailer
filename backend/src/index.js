const fakeMailServer = require("./smtp-server");
const WebuxSocket = require("@studiowebux/socket");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");

const Nodemailer = require("../actions/nodemailer");
const WebuxMailer = require("../actions/webuxmailer");

const PORT = process.env.PORT || 3030;

async function LoadApp() {
  app.use(cors({ origin: process.env.HOST }));
  app.get("/healthcheck", (req, res, next) => {
    return res.status(200).json({ message: "I'm alive !" });
  });

  // loading the webux socket module
  const socketIO = new WebuxSocket(null, server);

  socketIO.Standalone().on("connect", (socket) => {
    console.log(`New User ${socket.id}`);

    socket.on("SendEmailWithNodemailer", (fn) => {
      Nodemailer(socket);

      fn(true);
    });

    socket.on("SendEmailWithWebuxmailer", (fn) => {
      WebuxMailer(socket);

      fn(true);
    });

    socket.on("disconnect", () => {
      console.log(`Bye Bye ${socket.id}`);
    });
  });

  fakeMailServer.startServer(socketIO.Standalone());

  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

try {
  LoadApp();
} catch (e) {
  console.error(e);
  process.exit(2);
}
