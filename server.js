import express from "express";
import usersRouter from "./routes/users.js";

const app = express();
//app.use(express.json());

const cors = require("cors");
app.use(cors());

// Utilisation du router "users"
app.use("/users", usersRouter);

// Export pour Vercel
export default app;
