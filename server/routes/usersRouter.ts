import { Router } from "express";
import {
  chatsGet,
  friendsGet,
  userByUsernameGet,
  userDelete,
  userProfilePicturePatch,
  userUsernamePatch,
} from "../controllers/usersController.js";
import { isUserById } from "../middlewares/isUser.js";
import upload from "../configs/multer.js";
const router = Router();

router.get("/", userByUsernameGet);
router.get("/:userId/chats", isUserById, chatsGet);
router.get("/:userId/friends", isUserById, friendsGet);
router.patch("/:userId/username", isUserById, userUsernamePatch);
router.patch(
  "/:userId/profile-picture",
  isUserById,
  upload.single("profile-picture"),
  userProfilePicturePatch,
);
router.delete("/:userId", isUserById, userDelete);

export default router;
