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
import { ArrowLeft } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function TypeCard() {
    const router = useRouter()
    const [isDisabled, setIsDisabled] = useState(false)
    const [jobOffers, setJobOffers] = useState([])

    async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault()
            setIsDisabled(true)
            const data = {
                full_name: e.currentTarget.full_name.value,
                experience: e.currentTarget.experience.value,
                qualifications: e.currentTarget.qualifications.value
            }
            const url = '/api/text'
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
                    description: parseRes.error,
                    action: {
                        label: "Retry",
                        onClick: () => handleUpload(e),
                    },
                })
                console.log(parseRes)
            } else {
                if (parseRes.jobOffers.length === 0) {
                    toast("Found no job offers", {
                        action: {
                            label: "Retry",
                            onClick: () => handleUpload(e),
                        },
                    })
                } else {
                    setJobOffers(parseRes.jobOffers)
                }
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

    return (
        <>
            {jobOffers && jobOffers.length === 0 ? (
                <Card className="w-[500px]">
                    <CardHeader>
                        <CardTitle>Type Resume</CardTitle>
                        <CardDescription>Type your qualification and search for a job offer.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-5" onSubmit={handleUpload}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="full_name">Enter full name</Label>
                                    <Input type="text" id="full_name" name="full_name" placeholder={"John Doe"} />
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="qualifications">Enter your qualifications</Label>
                                    <Textarea name="qualifications" className="min-h-[200px] max-h-[600px]" id="qualifications"></Textarea>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="experience">Enter years of experience</Label>
                                    <Input type="number" id="experience" name="experience" placeholder={"3"} />
                                </div>
                            </div>
                            <div className="flex w-full justify-between">
                                {isDisabled === false && (<Button type="button" className="w-[200px]" variant="outline" onClick={() => router.push("/")}>Cancel</Button>)}
                                <Button type="submit" className={`${isDisabled ? "w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600" : "w-[200px] bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600"} text-white`} disabled={isDisabled}>
                                    {isDisabled ? "Searching..." : "Search for job ✨"}
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
                                <Button onClick={() => setJobOffers([])}>
                                    <ArrowLeft />
                                </Button>
                                <h3 className="ml-auto text-2xl font-semibold">Found {jobOffers.length} job offers</h3>
                            </div>
                        </div>
                    </div>
                    {jobOffers.map((jobOffer: any, index: number) => (
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
