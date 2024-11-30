import { Request, Response } from "express";
import { RegisterUser, LoginUser } from "../interfaces/userInterfaces";
import { pool } from "../database/database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthController {
    public async register(
        req: Request<{}, {}, RegisterUser>,
        res: Response
    ): Promise<void> {
        const { username, password, email } = req.body;

        try {
            const connection = await pool.getConnection();
            const hashedPassword = await bcrypt.hash(password, 10);

            await connection.query(
                "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
                [username, hashedPassword, email]
            );
            connection.release();
            res.status(201).send({ message: "User registered successfully." });
        } catch (error) {
            res.status(500).send({ message: "Error registering user.", error });
        }
    }

    public async login(
        req: Request<{}, {}, LoginUser>,
        res: Response
    ): Promise<void> {
        const { username, password } = req.body;

        try {
            const connection = await pool.getConnection();
            const [rows]: [any[], any] = await connection.query(
                "SELECT * FROM users WHERE username = ?",
                [username]
            );
            connection.release();
            if (rows.length === 0) {
                res.status(401).send({ message: "Login is invalid." });
                return;
            }
            const user = rows[0];
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );
            if (!isPasswordValid) {
                res.status(401).send({ message: "Password is incorrect." });
                return;
            }
            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET || "your_secret_key",
                { expiresIn: "1h" }
            );
            res.send({ message: "Login successful.", token });
        } catch (error) {
            res.status(500).send({ message: "Error logging in.", error });
        }
    }
}

export default AuthController;
