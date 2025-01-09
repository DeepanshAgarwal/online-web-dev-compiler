import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: "Web-Dev-Compiler",
        });
        console.log("Connection established");
    } catch (error) {
        console.log("error connecting to DB");
    }
};
