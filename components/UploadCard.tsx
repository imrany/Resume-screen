"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import pdfToText from 'react-pdftotext';

export default function UploadCard() {
  const router = useRouter()
  const [fileName,setFileName]=useState("")
  const [isDisabled,setIsDisabled]=useState(false)

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsDisabled(true)
    const formData = new FormData(e.currentTarget)
    const file = formData.get('file') as File
    formData.append('file_name',fileName)

    if (!file) {
      setIsDisabled(false)
      alert('Please upload a resume file.')
      return
    }

    try {
      const text = await pdfToText(file);
      const data = await extractResumeData(text)
      console.log(data)
      setIsDisabled(false)
    } catch (error:any) {
      setIsDisabled(false)
      alert(error.message)
    }
  }

  async function extractResumeData(text:string) {
    const skills = extractSection(text, "Skills", "Education");
    const education = extractSection(text, "Education", "Work experience");
    const workExperience = extractSection(text, "Work experience", "Reference");
    const profession = extractSection(text, "Professional summary", "Skills");
  
    return {
      skills,
      education,
      workExperience,
      profession,
    };
  }

  function extractSection(text:string, startMarker:any, endMarker:any) {
    const startIndex = text.indexOf(startMarker);
    const endIndex = text.indexOf(endMarker, startIndex);
  
    if (startIndex === -1 || endIndex === -1) {
      return null;
    }
  
    return text.slice(startIndex + startMarker.length, endIndex).trim();
  }

  return (
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
              <Input type="text" readOnly disabled id="name" name="name" defaultValue={fileName} placeholder={fileName||"Name of your resume"} />
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
            <Button type="button" className="w-[200px]" variant="outline" onClick={() => router.push("/")}>Cancel</Button>
            <Button type="submit" className="w-[200px]" variant={isDisabled?"secondary":"default"}>
              {isDisabled ? "Screening..." : "Screen"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
