import mongoose from "mongoose";

interface ICodeSchema {
    fullCode: {
        html: String;
        css: String;
        javascript: String;
    };
}

const CodeSchema = new mongoose.Schema<ICodeSchema>({
    fullCode: {
        html: String,
        css: String,
        javascript: String,
    },
});

export const Code = mongoose.model("Code", CodeSchema);
