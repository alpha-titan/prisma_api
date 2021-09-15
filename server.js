import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import postsRoute from "./routes/posts.route.js";
dotenv.config({ path: `${process.cwd()}/prisma/.env` });
const app = express();
app.use(express.json());
app.use(cors());

//? routes
app.use("/users", userRoute);
app.use("/posts", postsRoute);

//? Init
app.listen(process.env.PORT, () =>
	console.log(`🚀 Server running on port ${process.env.PORT}`)
);
