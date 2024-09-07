import { NextFunction, Request, Response } from "express";
import { ErrorWithStatus } from "./errorHandler.js";
import prisma from "../configs/db.js";

export async function isUser(req: Request, _: Response, next: NextFunction) {
  if (!req.user) {
    return next(new ErrorWithStatus("Unauthorized", 401));
  }

  next();
}

export async function isUserById(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  const userId = Number(req.params.userId) || Number(req.query.userId);
  if (!req.user || (req.user && userId !== req.user.id)) {
    return next(new ErrorWithStatus("Unauthorized", 401));
  }

  next();
}

export async function isMessageOwner(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  const { messageId } = req.params;
  try {
    const message = await prisma.message.findUnique({
      where: { id: Number(messageId) },
    });
    if (!message || !req.user || message.senderId !== req.user?.id) {
      return next(new ErrorWithStatus("Unauthorized", 401));
    }

    next();
  } catch (err) {
    next(err);
  }
}

export async function isGroupCreator(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  const { groupId } = req.params;
  try {
    const group = await prisma.group.findUnique({
      where: { id: Number(groupId) },
    });
    if (!group || !req.user || group.creatorId !== req.user?.id) {
      return next(new ErrorWithStatus("Unauthorized", 401));
    }

    next();
  } catch (err) {
    next(err);
  }
}

export async function isGroupRequestOwner(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  const { groupRequestId } = req.params;
  try {
    const groupRequest = await prisma.groupRequest.findUnique({
      where: { id: Number(groupRequestId) },
    });
    if (!groupRequest || !req.user || groupRequest.userId !== req.user?.id) {
      return next(new ErrorWithStatus("Unauthorized", 401));
    }

    next();
  } catch (err) {
    next(err);
  }
}

export async function isFriendRequestOwner(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  const { friendRequestId } = req.params;
  try {
    const friendRequest = await prisma.friendRequest.findUnique({
      where: { id: Number(friendRequestId) },
    });
    if (!friendRequest || !req.user || friendRequest.userId !== req.user?.id) {
      return next(new ErrorWithStatus("Unauthorized", 401));
    }

    next();
  } catch (err) {
    next(err);
  }
}
