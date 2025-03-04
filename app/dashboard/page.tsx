import { Button } from "@/components/ui/button";
import  Upload  from "@/components/UploadCard";
import { Plus } from "lucide-react";

export default function Page() {
    return (
    <div className="flex flex-col w-full h-full items-center justify-center pb-20 font-[family-name:var(--font-geist-sans)]  bg-gradient-to-t from-blue-100/20 dark:from-blue-900/5">
        <div className="flex w-full">
            <div className="ml-auto flex gap-3 px-4">
                <Button className="rounded-[100px] h-[30px] w-[30px] bg-zinc-600">
                    <Plus className="w-[24px] h-[24px]"/>
                </Button>
            </div>
        </div>
        <Upload/>
    </div>
    )
}