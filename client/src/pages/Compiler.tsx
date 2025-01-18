// import React from "react";

import { useParams } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
import HelperHeader from "../components/HelperHeader";
import RenderCode from "../components/RenderCode";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../components/ui/resizable";
import { useEffect } from "react";
import axios from "axios";
import { handleError } from "../utils/handleError";
import { useDispatch } from "react-redux";
import { updateFullCode } from "../redux/slices/compilerSlice";
import { toast } from "sonner";

const Compiler = () => {
    const { urlId } = useParams();
    const dispatch = useDispatch();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const loadCode = async () => {
        try {
            const response = await axios.post(backendUrl + "/compiler/load", {
                urlId: urlId,
            });
            dispatch(updateFullCode(response.data.fullCode));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error?.response?.status === 500) {
                    toast("Invalid URL, Default Code Loaded");
                }
            }
            handleError(error);
        }
    };

    useEffect(() => {
        if (urlId) {
            loadCode();
        }
    }, [urlId]);
    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel
                className="h-[calc(100dvh-60px)] min-w-[350px]"
                defaultSize={50}
            >
                <HelperHeader />
                <CodeEditor />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
                className="h-[calc(100dvh-60px)] min-w-[350px]"
                defaultSize={50}
            >
                <RenderCode />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default Compiler;
