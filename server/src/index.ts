import express, { Application } from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compiler.routes";

const PORT = process.env.PORT || 4000;
const app: Application = express();

app.use(express.json());
app.use(cors());
config();

app.use("/compiler", compilerRouter);

dbConnect();
app.listen(PORT, () => {
    console.log("Server listening on PORT: " + PORT);
});
