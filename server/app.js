import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import HandleGlobalError from "./lib/HandleGlobalError.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import protectUserRoutes from "./middlewares/protectUserRoutes.js";
import globalMiddlewares from "./middlewares/globalMiddlwares.js";
import socketConnect from "./lib/socketConnect.js";
import socketAuthMiddleware from "./middlewares/socketAuthMiddleware.js";

const { app, httpServer, io } = socketConnect();

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.get("/health", (req, res) => {
  res.send("Server health is fine and good");
});

// NOTE: SOCKET CONNECTION
io.use(socketAuthMiddleware);

io.on("connection", (socket) => {
  socket.on("isConnected", (arg, callback) => {
    console.log(arg);
    callback("Yeah, is connected");
  });

  console.log(`User connected: ${socket.id}`);

  socket.on("keepAlive", (data) => {
    console.log("Keep-alive ping received:", data);
  });

  socket.on("joinRooms", (roomIds) => {
    if (!roomIds || roomIds.length === 0) return;
    roomIds.map((roomId) => {
      console.log("room joined", roomId);
      socket.join(roomId);
    });
  });

  socket.on("disconnect", (reason) => {
    console.log(`User disconnected: ${socket.id}, Reason: ${reason}`);
  });
});

// MARK: GLOBAL MIDDLEWARES
globalMiddlewares(app);

// NOTE: DIFFERENT ROUTES
app.use("/auth", authRouter);
app.use("/user", protectUserRoutes, userRouter);

// NOTE: UNIDENTIFIED ROUTES
app.all("*", (req, res, next) => {
  return next(
    new HandleGlobalError(
      `Somethings went wrong. Please check your Url - ${req.originalUrl}`,
      500,
      "Fail"
    )
  );
});

//  NOTE: GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export { app };

export default httpServer;
