import UploadCard  from "@/components/UploadCard";

export default function Page() {
    return (
        <div
            className="flex flex-col w-full h-screen items-center justify-center pb-20 font-sans bg-gradient-to-t from-blue-100/20 dark:from-blue-900/5"
        >
            <svg aria-hidden="true" className="pointer-events-none [z-index:-1] absolute inset-0 h-full w-full fill-blue-500/50 stroke-blue-500/50 [mask-image:linear-gradient(to_top,_#ffffffad,_transparent)] opacity-[.30]" style={{visibility: "visible"}}>
                <defs>
                <pattern id=":Rs57qbt6ja:" width="20" height="20" patternUnits="userSpaceOnUse" x="-1" y="-1">
                    <path d="M.5 20V.5H20" fill="none" strokeDasharray="0"></path>
                </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth="0" fill="url(#:Rs57qbt6ja:)"></rect>
            </svg>
            <main className="flex flex-col justify-center h-full items-center">
                <UploadCard/>
            </main>
        </div>
    )
}