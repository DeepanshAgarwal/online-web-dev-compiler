// import React from "react";

import CodeEditor from "../components/CodeEditor";
import HelperHeader from "../components/HelperHeader";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../components/ui/resizable";

const Compiler = () => {
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
                RIGHT
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default Compiler;
