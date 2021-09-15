import expressRouter from "express-promise-router";

const router = expressRouter();

//? Controller Import
import {
	getAllUsers,
	createNewUser,
	getUserByEmail,
	deleteUserByEmail,
	getPostsOfUser,
} from "../controllers/user.controller.js";

//? GET All Users
router.route("/").get(getAllUsers);

//? POST Create User

router.route("/").post(createNewUser);

//? Find user by email;
router.route("/:email").get(getUserByEmail);

//? Delete User by email
router.route("/:email").delete(deleteUserByEmail);

//? Get Posts of a user
router.route("/:username/posts").get(getPostsOfUser);

export default router;
