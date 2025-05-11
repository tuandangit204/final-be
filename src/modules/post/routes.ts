import { Router } from "express";
import { validateBody, validateQuery } from "~/middlewares/validation";
import { createPostSchema, getPostsSchema } from "./schema";
import { createPost, getPosts } from "./controller";


const postRoutes = Router();

postRoutes.post('/', validateBody(createPostSchema), createPost)
postRoutes.get('/', validateQuery(getPostsSchema), getPosts)

export default postRoutes;