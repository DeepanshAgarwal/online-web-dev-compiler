import cors from "cors";
import express, { Application } from "express";
import "dotenv/config";

import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compiler.routes";

const PORT = process.env.PORT || 4000;
const app: Application = express();

const corsOptions = {
    origin: "*", // Allow all origins. You can restrict this to specific origins if needed.
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
dbConnect();

app.use("/compiler", compilerRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(PORT, () => {
    console.log("Server listening on PORT: " + PORT);
});
