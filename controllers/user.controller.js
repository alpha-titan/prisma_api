import Prisma from "@prisma/client";
import chalk from "chalk";
const { PrismaClient } = Prisma;
const prismaClient = new PrismaClient();

export const getAllUsers = async (_, res, next) => {
	try {
		console.log(
			chalk.greenBright("Getting from Postgres DB through Prisma ORM")
		);
		const users = await prismaClient.user.findMany();
		return res.status(200).json({ success: true, data: users });
	} catch (e) {
		console.log(chalk.redBright(e));
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};

export const createNewUser = async (req, res, next) => {
	const newUSer = req.body;
	try {
		console.log(
			chalk.greenBright(
				"Creating  User on Postgres DB through Prisma ORM"
			)
		);
		const user = await prismaClient.user.create({ data: newUSer });
		return res.status(200).json({ success: true, data: user });
	} catch (e) {
		console.log(chalk.redBright(e));
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};

export const getUserByEmail = async (req, res, next) => {
	const { email: Email = null } = req.params;
	try {
		console.log(chalk.black.bold(`Finding User with email -> ${Email}`));
		const user = await prismaClient.user.findFirst({
			where: {
				Email,
			},
		});
		return res.status(200).json({ success: true, data: user });
	} catch (e) {
		console.log(chalk.redBright(e));
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};

export const deleteUserByEmail = async (req, res, next) => {
	const { email: Email = null } = req.params;
	try {
		console.log(
			chalk.black.bgGreenBright.bold(
				`Deleting User with email -> ${Email}`
			)
		);
		const user = await prismaClient.user.delete({
			where: {
				Email,
			},
		});
		return res.status(200).json({ success: true, data: user });
	} catch (e) {
		console.log(chalk.redBright(e));
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};

export const getPostsOfUser = async (req, res, next) => {
	const { username: Username = "" } = req.params;

	try {
		console.log(chalk.yellow(`Getting all posts of ${Username}......`));
		const posts = await prismaClient.user.findMany({
			where: { Username },
			select: {
				Post: true,
			},
		});
		console.log(
			chalk.green(`Found ${posts?.length ?? 0} Post by ${Username}`)
		);
		return res
			.status(200)
			.json({ success: true, data: posts ? posts : [] });
	} catch (error) {
		console.log(chalk.red(error));
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
};
