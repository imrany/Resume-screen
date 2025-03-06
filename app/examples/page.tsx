"use client"
import { Button } from "@/components/ui/button";
import { Resume } from "@/lib/types";
import { Download } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function page() {
    const router=useRouter()
    const [isLoading,setIsLoading]=useState(true)
    const [resumes,setResumes]=useState<Resume[]>([
        {
            filename:"/pdf",
            url:"https://",
            format:"PDF",
        }
    ])

    async function getResumes(){
        try{
            const url="/api/pdf"
            const response=await fetch(url)
            const parseRes=await response.json()
            if(parseRes.error){
                setIsLoading(false)
                toast(parseRes.error, {
                    action: {
                      label: "Retry",
                      onClick: () => getResumes(),
                    },
                  })
            }else{
                setResumes(parseRes.resumes)
                setIsLoading(false)
            }
        }catch(error:any){
            setIsLoading(false)
            toast(error.message, {
                action: {
                  label: "Retry",
                  onClick: () => getResumes(),
                },
            })
        }
    }

    useEffect(()=>{
        getResumes()
    },[])
    return (
        <div
            className="flex flex-col w-full min-h-screen items-center justify-center pb-20 font-sans bg-gradient-to-t from-blue-100/20 dark:from-blue-900/5"
        >
            <svg aria-hidden="true" className="pointer-events-none [z-index:-1] fixed inset-0 h-full w-full fill-blue-500/50 stroke-blue-500/50 [mask-image:linear-gradient(to_top,_#ffffffad,_transparent)] opacity-[.30]" style={{ visibility: "visible" }}>
            <defs>
                <pattern id=":Rs57qbt6ja:" width="20" height="20" patternUnits="userSpaceOnUse" x="-1" y="-1">
                <path d="M.5 20V.5H20" fill="none" strokeDasharray="0"></path>
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#:Rs57qbt6ja:)"></rect>
            </svg>
            <main className="flex flex-col justify-center gap-4 min-h-screen items-center">
                {isLoading?(
                    <p className="text-base text-black">Loading...</p>
                ):(
                    <>
                        <p className="text-2xl font-semibold text-cyan-700">Examples of Resume Format Downloads in PDF</p>
                        <div className="grid grid-cols-4 gap-4 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3">
                            {resumes?resumes.map((resume)=>(
                                <div key={resume.filename} className="bg-none p-4 flex flex-col gap-2">
                                    <Image
                                        className="dark:invert rounded-[10px]"
                                        src={"/pdf.webp"}
                                        alt={resume.filename}
                                        width={200}
                                        height={200}
                                        priority
                                    />
                                    <p className="text-gray-500 text-sm">{resume.filename}</p>
                                    <Button variant={"outline"} className="font-light w-[200px]" onClick={() => window.open(resume.url, "_blank")}>
                                        <span>Download PDF</span> 
                                        <Download/>
                                    </Button>
                                </div>
                            )):(
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-xl text-cyan-700">No resume found</p>
                                    <Button onClick={()=>router.back()}>Return</Button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    )
}