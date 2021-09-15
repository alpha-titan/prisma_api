import expressRouter from "express-promise-router";

import {
	getAllPosts,
	deletePost,
	createPost,
} from "../controllers/posts.controller.js";
const router = expressRouter();

//? Get all Posts
router.route("/").get(getAllPosts);

//? Create a Post
router.route("/").post(createPost);

//? Delete a Post
router.route("/:postId").delete(deletePost);
export default router;
