import { Request, Response } from "express";

class MessageController {
    public getMessage(req: Request, res: Response): void {
        res.send({ message: "Hello World" });
    }
}

export default MessageController;
