import { pool } from "./database";
import { RowDataPacket } from "mysql2/promise";
import bcrypt from "bcrypt";

const createUsersTable = async () => {
    const connection = await pool.getConnection();
    try {
        const [rows]: [RowDataPacket[], any] = await connection.query(
            "SHOW TABLES LIKE 'users'"
        );
        const tables = rows as RowDataPacket[];
        if (tables.length === 0) {
            await connection.query(`
                CREATE TABLE users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
        }
    } catch (error) {
        console.error("Error creating the 'users' table:", error);
    } finally {
        await insertDefaultUser(connection);
        connection.release();
    }
};

const insertDefaultUser = async (connection: any) => {
    const defaultUser = {
        username: "adminteste",
        password: "admin@123456",
        email: "admin@example.com"
    };

    try {
        const hashedPassword = await bcrypt.hash(defaultUser.password, 10);
        await connection.query(
            `
            INSERT INTO users (username, password, email)
            VALUES (?, ?, ?) AS newUser
            ON DUPLICATE KEY UPDATE
                password = newUser.password,
                email = newUser.email
            `,
            [defaultUser.username, hashedPassword, defaultUser.email]
        );
    } catch (error) {
        console.error("Error inserting or updating default user:", error);
    }
};

export { createUsersTable };
