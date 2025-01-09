import express, { Application } from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compiler.routes";

const app: Application = express();

app.use(express.json());
app.use(cors());
config();

app.use("/compiler", compilerRouter);

dbConnect();
app.listen(4000, () => {
    console.log("Server is listening on PORT: 4000");
});
