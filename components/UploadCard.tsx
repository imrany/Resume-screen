"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import pdfToText from 'react-pdftotext';
import { ArrowLeft } from "lucide-react"

export default function UploadCard() {
  const router = useRouter()
  const [fileName, setFileName] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const [jobOffers, setJobOffers] = useState([])

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsDisabled(true)
    const formData = new FormData(e.currentTarget)
    const file = formData.get('file') as File
    formData.append('file_name', fileName)

    if (!file) {
      setIsDisabled(false)
      toast('Please upload a resume file.', {
        action: {
          label: "Retry",
          onClick: () => console.log("Undo"),
        },
      })
      return
    }

    try {
      const text = await pdfToText(file);
      const data = await extractResumeData(text)
      const url = '/api'
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json"
        }
      })
      const parseRes = await response.json()
      if (parseRes.error) {
        toast("Something went wrong", {
          description:parseRes.error,
          action: {
            label: "Retry",
            onClick: () => handleUpload(e),
          },
        })
        console.log(parseRes)
      } else {
        setJobOffers(parseRes.jobOffers)
      }
      setIsDisabled(false)
    } catch (error: any) {
      setIsDisabled(false)
      toast(error.message, {
        action: {
          label: "Retry",
          onClick: () => console.log("Undo"),
        },
      })
    }
  }

  async function extractResumeData(text: string) {
    const skills = extractSection(text, "Skills", "Education") || extractSection(text, "SKILLS", "HOBBIES");
    const education = extractSection(text, "Education", "Work experience") || extractSection(text, "EDUCATION", "SKILLS");
    const workExperience = extractSection(text, "Work experience", "Reference") || extractSection(text, "EMPLOYMENT HISTORY", "EDUCATION");
    const profession = extractSection(text, "Professional summary", "Skills") || extractSection(text, "Profile", "Employment History") || extractSection(text, "PROFILE", " EMPLOYMENT HISTORY");

    return {
      skills,
      education,
      workExperience,
      profession,
    };
  }

  function extractSection(text: string, startMarker: any, endMarker: any) {
    const startIndex = text.indexOf(startMarker);
    const endIndex = text.indexOf(endMarker, startIndex);

    if (startIndex === -1 || endIndex === -1) {
      return null;
    }

    return text.slice(startIndex + startMarker.length, endIndex).trim();
  }

  return (
    <>
      {jobOffers && jobOffers.length === 0 ? (
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>Upload Resume</CardTitle>
            <CardDescription>Upload your resume to start screening.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-5" onSubmit={handleUpload}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">File name</Label>
                  <Input type="text" readOnly disabled id="name" name="name" defaultValue={fileName} placeholder={fileName || "Name of your resume"} />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="file">Resume</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400">
                    <input
                      type="file"
                      accept="application/pdf"
                      id="file"
                      name="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFileName(file.name);
                        }
                      }}
                      required
                    />
                    <label htmlFor="file" className="block">
                      {fileName || "Drag and drop your resume here, or click to select a file"}
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-between">
                {isDisabled===false &&(<Button type="button" className="w-[200px]" variant="outline" onClick={() => router.push("/")}>Cancel</Button>)}
                <Button type="submit" className={`${isDisabled ? "w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600" : "w-[200px] bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600"} text-white`} disabled={isDisabled}>
                  {isDisabled ? "Screening..." : "Screen ✨"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-4 h-full items-center justify-center pt-10">
          <div className="fixed border-b-[1px] top-0 left-0 right-0 z-10 h-[60px] bg-white">
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center justify-between w-[800px] max-sm:w-[90vw]">
                <Button onClick={()=>setJobOffers([])}>
                  <ArrowLeft />
                </Button>
                <h3 className="ml-auto text-2xl font-semibold">Found {jobOffers.length} job offers</h3>
              </div>
            </div>
          </div>
          {jobOffers.map((jobOffer:any, index:number) => (
            <Card className="w-[800px] mt-[40px] max-sm:w-[90vw]" key={index}>
              <CardHeader>
                <CardTitle>{jobOffer.title}</CardTitle>
                <CardDescription>Here are the job offers based on your resume.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <p className="text-sm text-gray-700">{jobOffer.snippet}</p>
                <p className="text-sm text-gray-500"><span className="text-black">Salary</span>: {jobOffer.salary}</p>
                <p className="text-sm text-gray-500"><span className="text-black">Location</span>: {jobOffer.location}</p>
              </CardContent>
              <CardFooter>
                <a href={`${jobOffer.url}`} rel="noopener noreferrer" target="_blank">
                  <Button className="bg-pink-500 text-white hover:bg-pink-500">View Job Offer</Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
