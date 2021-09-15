import Prisma from "@prisma/client";
import chalk from "chalk";
const { PrismaClient } = Prisma;
const prismaClient = new PrismaClient();
export const getAllPosts = async (_, res, next) => {
	try {
		console.log(chalk.yellow("creating post ........"));
		const posts = await prismaClient.post.findMany();
		console.log(chalk.green(`Found ${posts?.length ?? 0} posts`));
		return res
			.status(200)
			.json({ success: true, data: posts ? posts : [] });
	} catch (error) {
		console.log(chalk.black.bgRedBright.bold(error.message));
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};

export const createPost = async (req, res, next) => {
	const data = req.body;
	try {
		console.log(chalk.yellow("creating post ........"));
		const post = await prismaClient.post.create({
			data,
		});
		console.log(chalk.green(`created a post with ${post.id}`));
		return res.status(201).json({ success: true, data: post ? post : {} });
	} catch (error) {
		console.log(chalk.white.bgRedBright(error));
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};

export const deletePost = async (req, res, next) => {
	const { postId } = req.params;

	try {
		console.log(chalk.yellow("Deleting post ........"));
		const post = await prismaClient.post.delete({
			where: {
				id: postId,
			},
		});
		console.log(chalk.green(`Deleted a post with ${post.id}`));
		return res.status(201).json({ success: true, data: post ? post : {} });
	} catch (error) {
		console.log(chalk.white.bgRedBright(error));
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};
