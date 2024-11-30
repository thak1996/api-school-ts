import express from "express";
import cors from "cors";
import messageRoutes from "./routes/messageRoutes";
import authRoutes from "./routes/authRoutes";
import { swaggerUi, swaggerDocs } from "./config/swagger";

export class App {
    public app: express.Application;
    private apiPrefix: string = "/api/v1";

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.swaggerSetup();
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(express.json());

        this.app.use((req, res, next) => {
            const currentTime = new Date().toISOString();
            console.log(`[${currentTime}] ${req.method} ${req.originalUrl}`);
            next();
        });
    }

    private routes(): void {
        this.app.use(`${this.apiPrefix}/message`, messageRoutes);
        this.app.use(`${this.apiPrefix}/auth`, authRoutes);
    }

    private swaggerSetup(): void {
        this.app.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(swaggerDocs)
        );

        this.app.get("/api-docs.json", (_req, res) => {
            res.json(swaggerDocs);
        });
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            if (process.env.NODE_ENV === "production") {
                console.log(`Server is running on port ${port}`);
            }
        });
    }
}
