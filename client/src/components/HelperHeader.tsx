import { Button } from "./ui/button";
import { Save, Share2Icon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
    CompilerSliceStateType,
    updateCurrentLanguage,
} from "../redux/slices/compilerSlice";
import { RootState } from "../redux/store";

const HelperHeader = () => {
    const dispatch = useDispatch();
    const currentLanguage = useSelector(
        (state: RootState) => state.compilerSlice.currentLanguage
    );
    return (
        <div className="__helper-header h-[50px] bg-black text-white p-2 flex justify-between items-center">
            <div className="__btn_container flex gap-1">
                <Button
                    className="flex justify-center items-center gap-1"
                    variant={"success"}
                >
                    <Save />
                    Save
                </Button>
                <Button
                    className="flex justify-center items-center gap-1"
                    variant={"secondary"}
                >
                    <Share2Icon />
                    Share
                </Button>
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
