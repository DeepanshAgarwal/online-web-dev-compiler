import { Button } from "./ui/button";
import { Code, Copy, Loader, Save, Share2Icon } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import {
    CompilerSliceStateType,
    updateCurrentLanguage,
} from "../redux/slices/compilerSlice";
import { RootState } from "../redux/store";
import { handleError } from "../utils/handleError";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { toast } from "sonner";

const HelperHeader = () => {
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const [shareBtn, setShareBtn] = useState<boolean>(false);
    const { urlId } = useParams();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    const fullCode = useSelector(
        (state: RootState) => state.compilerSlice.fullCode
    );

    useEffect(() => {
        if (urlId) {
            setShareBtn(true);
        } else {
            setShareBtn(false);
        }
    }, [urlId]);

    const handleSaveCode = async () => {
        setSaveLoading(true);
        try {
            const response = await axios.post(
                `${backendUrl}/compiler/save`,
                {
                    fullCode: fullCode,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            navigate(`/compiler/${response.data.url}`, { replace: true });
        } catch (error) {
            handleError(error);
        } finally {
            setSaveLoading(false);
        }
    };

    const dispatch = useDispatch();
    const currentLanguage = useSelector(
        (state: RootState) => state.compilerSlice.currentLanguage
    );
    return (
        <div className="__helper-header h-[50px] bg-black text-white p-2 flex justify-between items-center">
            <div className="__btn_container flex gap-1">
                <Button
                    onClick={handleSaveCode}
                    className="flex justify-center items-center gap-1"
                    variant={"success"}
                    disabled={saveLoading}
                >
                    {saveLoading ? (
                        <>
                            <Loader className="animate-spin" />
                        </>
                    ) : (
                        <>
                            <Save />
                            Save
                        </>
                    )}
                </Button>
                {shareBtn && (
                    <Dialog>
                        <DialogTrigger className="whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 flex justify-center items-center gap-1">
                            <Share2Icon />
                            Share
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="flex justify-center items-center gap-1">
                                    <Code size={18} />
                                    Share your Code!
                                </DialogTitle>
                                <DialogDescription className="flex flex-col gap-2">
                                    <div className="__url flex gap-1">
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-2 py-2 rounded text-slate-400 bg-slate-800 text-center"
                                            value={window.location.href}
                                        />
                                        <Button
                                            variant={"outline"}
                                            onClick={() => {
                                                window.navigator.clipboard.writeText(
                                                    window.location.href
                                                );
                                                toast(
                                                    "URL copied to clipboard"
                                                );
                                            }}
                                        >
                                            <Copy />
                                        </Button>
                                    </div>

                                    <p className="text-center">
                                        Share this URL with your friends to
                                        collaborate.
                                    </p>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
            </div>

            <div className="__tab_switcher flex justify-center items-center gap-1">
                <small>Current Language:</small>
                <Select
                    defaultValue={currentLanguage}
                    onValueChange={(value) =>
                        dispatch(
                            updateCurrentLanguage(
                                value as CompilerSliceStateType["currentLanguage"]
                            )
                        )
                    }
                >
                    <SelectTrigger className="w-[180px] bg-gray-800 outline-none focus:ring-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="css">CSS</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default HelperHeader;
