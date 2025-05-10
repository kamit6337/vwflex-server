import "./lib/passport.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import authRouter from "./routes/authRoutes.js";
import globalMiddlewares from "./middlewares/globalMiddlwares.js";
import socketConnect from "./lib/socketConnect.js";
import socketAuthMiddleware from "./middlewares/socketAuthMiddleware.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import cors from "cors";
import newConnection from "./socket/newConnection.js";
import joinRooms from "./socket/joinRooms.js";
import onDisconnect from "./socket/onDisconnect.js";
import unIdentifiedUrlError from "./controllers/error/unIdentifiedUrlError.js";

const { app, httpServer, io } = socketConnect();

const init = async () => {
  try {
    app.get("/", (req, res) => {
      res.send("Hello from the server");
    });

    app.get("/health", (req, res) => {
      res.send("Server health is fine and good");
    });

    // NOTE: SOCKET CONNECTION
    io.use(socketAuthMiddleware);
    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);
      newConnection(socket);
      joinRooms(socket);
      onDisconnect(socket);
    });

    // MARK: GLOBAL MIDDLEWARES
    globalMiddlewares(app);

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      formatError: (formattedError, error) => {
        return { message: formattedError.message || error?.message };
      },
    });

    await server.start();

    app.use(
      "/graphql",
      cors(),
      expressMiddleware(server, {
        context: ({ req }) => {
          return { req };
        },
      })
    );

    // NOTE: DIFFERENT ROUTES
    app.use("/auth", authRouter);

    // NOTE: UNIDENTIFIED ROUTES
    app.all("*", unIdentifiedUrlError);

    //  NOTE: GLOBAL ERROR HANDLER
    app.use(globalErrorHandler);
  } catch (error) {
    console.log("Issue in server started", error);
  }
};

init();

export { app };

export default httpServer;
