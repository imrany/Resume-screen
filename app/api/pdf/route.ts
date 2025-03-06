import { Resume } from "@/lib/types";

const resumes:Resume[]=[
    {
        filename:"Amsterdam-Modern-Resume-Template-1.pdf",
        url:"/resumes/Amsterdam-Modern-Resume-Template-1.pdf",
        format:"PDF",
    },
    {
        filename:"Berlin-Simple-Resume-Template.pdf",
        url:"/resumes/Berlin-Simple-Resume-Template.pdf",
        format:"PDF",
    },
    {
        filename:"Dublin-Resume-Template-Modern.pdf",
        url:"/resumes/Dublin-Resume-Template-Modern.pdf",
        format:"PDF",
    },
    {
        filename:"London-Resume-Template-Professional.pdf",
        url:"/resumes/London-Resume-Template-Professional.pdf",
        format:"PDF",
    },
    {
        filename:"Oslo-Resume-Template-Modern.pdf",
        url:"/resumes/Oslo-Resume-Template-Modern.pdf",
        format:"PDF",
    },
    {
        filename:"Santiago-Resume-Template-Professional.pdf",
        url:"/resumes/Santiago-Resume-Template-Professional.pdf",
        format:"PDF",
    },
    {
        filename:"Stockholm-Resume-Template-Simple.pdf",
        url:"/resumes/Stockholm-Resume-Template-Simple.pdf",
        format:"PDF",
    },
    {
        filename:"Sydney-Resume-Template-Modern.pdf",
        url:"/resumes/Sydney-Resume-Template-Modern.pdf",
        format:"PDF",
    }
]

export async function GET(req: Request) {
    try {
        return new Response(JSON.stringify({ 
            resumes,
        }), {
            status: 200,
        });
    } catch (error: any) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ 
            error: error.message,
        }), {
            status: 500,
        });
    }
}
