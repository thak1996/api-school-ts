import dotenv from "dotenv";
import { App } from "./app";
import { createUsersTable } from "./database/userTable";

dotenv.config();

const app = new App();
const PORT = parseInt(process.env.BACKEND_PORT || "8080", 10);

const initializeDatabase = async () => {
    await createUsersTable();
};

initializeDatabase()
    .then(() => {
        app.start(PORT);
    })
    .catch((error) => {
        console.error("Error starting the server:", error);
    });
