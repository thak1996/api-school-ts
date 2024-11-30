import { Request, Response, NextFunction } from "express";
import { pool } from "../database/database";
import { RowDataPacket } from "mysql2/promise";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
    user?: RowDataPacket;
}

const secretKey = process.env.JWT_SECRET as string;

if (!secretKey) {
    throw new Error(
        "JWT_SECRET is not configured in the environment variables."
    );
}

const authenticate = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, secretKey) as { id: number };
        const connection = await pool.getConnection();
        const [rows]: [RowDataPacket[], any] = await connection.query(
            "SELECT * FROM users WHERE id = ?",
            [decoded.id]
        );
        connection.release();
        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid token." });
        }
        req.user = rows[0];
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token.", error });
    }
};

export default authenticate;
