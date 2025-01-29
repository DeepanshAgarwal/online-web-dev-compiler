import cors from "cors";
import express, { Application } from "express";
import "dotenv/config";

import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compiler.routes";

const PORT = process.env.PORT || 4000;
const app: Application = express();

// const allowedOrigins = ["https://online-web-dev-compiler.vercel.app","localhost:5173"]; // Add your frontend origin

// app.use(
//     cors({
//         origin: allowedOrigins,
//         methods: ["GET", "POST", "PUT", "DELETE"], // Add allowed HTTP methods
//         credentials: true, // Enable if using cookies or authentication
//     })
// );

app.use(cors());

app.use(express.json());
dbConnect();

app.use("/compiler", compilerRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(PORT, () => {
    console.log("Server listening on PORT: " + PORT);
});
