import { Router } from "express";
import MessageController from "../controllers/messageController";

const router = Router();
const messageController = new MessageController();

/**
 * @swagger
 * /api/v1/message:
 *   get:
 *     summary: Get a message test
 *     description: Retrieve a message test
 *     tags:
 *       - Messages
 *     responses:
 *       200:
 *         description: Message retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello, this is a test message!"
 */
router.get("/", messageController.getMessage);

export default router;
