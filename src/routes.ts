import express, { Request, Response, Router } from "express";

import { CreateUserController } from "../src/controllers/user/createUserController"
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailsUserController } from "./controllers/user/DetailsUserController";
import { IsAuthenticated } from "./middleware/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { AllCategoriesController } from "./controllers/category/AllCategoriesController";
import { CreatePostController } from "./controllers/post/createPostController";
import { GetAllPostsController } from "./controllers/post/GetAllPostController";

const router = Router();

/****** Router User ******/
router.post("/user/", new CreateUserController().handle);
router.post("/session/", new AuthUserController().handle);
router.get("/me/", IsAuthenticated, new DetailsUserController().handle);


/***** Router Category *****/
router.post("/category/", IsAuthenticated, new CreateCategoryController().handle);
router.get("/listCategories/", IsAuthenticated, new AllCategoriesController().handle);

/***** Router Post *****/
router.post("/post/", IsAuthenticated ,new CreatePostController().handle);
router.get('/posts/', IsAuthenticated, new GetAllPostsController().handle);

export { router };