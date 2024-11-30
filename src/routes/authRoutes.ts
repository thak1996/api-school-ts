import { Router, Request, Response } from "express";
import AuthController from "../controllers/authController";
import {
    registerValidation,
    loginValidation
} from "../middleware/authValidation";
import { handleValidationErrors } from "../middleware/handleValidationErrors";

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login a user
 *     description: Login a user with username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post(
    "/login",
    loginValidation,
    handleValidationErrors,
    (req: Request, res: Response) => authController.login(req, res)
);

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Create a new user with username, password, and email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "example"
 *               password:
 *                 type: string
 *                 example: "example@123456"
 *               email:
 *                 type: string
 *                 example: "example@example.com"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post(
    "/register",
    registerValidation,
    handleValidationErrors,
    (req: Request, res: Response) => authController.register(req, res)
);

export default router;
