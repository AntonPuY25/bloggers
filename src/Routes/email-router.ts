import {Router} from "express";
import {emailController} from "../compositionRoots/compositions-root";

export const emailRouter = Router({});

emailRouter.post('/', emailController.sendEmail.bind(emailController))