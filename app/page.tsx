import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col h-screen items-center justify-center pb-20 font-[family-name:var(--font-geist-sans)]  bg-gradient-to-t from-blue-100/20 dark:from-blue-900/5">
      <svg aria-hidden="true" className="pointer-events-none [z-index:-1] absolute inset-0 h-full w-full fill-blue-500/50 stroke-blue-500/50 [mask-image:linear-gradient(to_top,_#ffffffad,_transparent)] opacity-[.30]" style={{visibility: "visible"}}>
        <defs>
          <pattern id=":Rs57qbt6ja:" width="20" height="20" patternUnits="userSpaceOnUse" x="-1" y="-1">
            <path d="M.5 20V.5H20" fill="none" strokeDasharray="0"></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#:Rs57qbt6ja:)"></rect>
      </svg>

      <main className="flex flex-col gap-y-12 justify-center h-full items-center">
        <h1 className="text-4xl sm:text-6xl leading-0.5 tracking-tighter w-full text-zinc-700 font-bold text-center sm:text-left">
          The Best Screener for your resume
        </h1>
        <p className="text-gray-500 text-lg text-wrap text-center w-[720px]">
          Find online job offers by uploading or typing your resume and qualification here,
          We use <span className="text-black font-semibold">artificial intelligence</span> to scan and scrap your resume and find you online job offers.
        </p>
        {/* <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> */}

        <div className="flex gap-4 w-full justify-center items-center flex-col sm:flex-row">
          <a
            className="flex items-center justify-center h-[40px] w-[150px] bg-black text-white rounded-[10px]"
            href="/"
          >
            Get Started
          </a>
          <a
            className="flex items-center justify-center h-[40px] w-[150px] border-[1px] rounded-[10px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Type Resume
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Type resume
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to dashboard →
        </a>
      </footer>
    </div>
  );
}
