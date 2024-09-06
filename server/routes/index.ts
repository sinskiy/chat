import { Router } from "express";
import authRouter from "./authRouter.js";
import usersRouter from "./usersRouter.js";
import messagesRouter from "./messagesRouter.js";
import friendRequestsRouter from "./friendRequestsRouter.js";
import groupRequestsRouter from "./groupRequestsRouter.js";
import groupsRouter from "./groupsRouter.js";
const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/friendRequests", friendRequestsRouter);
apiRouter.use("/messages", messagesRouter);
apiRouter.use("/groupRequests", groupRequestsRouter);
apiRouter.use("/groups", groupsRouter);

export default apiRouter;
