import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import * as marked from "marked";

const apiKey=process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
    try{
        const { prompt } = req.body;
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp"});
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text:any=marked.parse(response.text())
    
        const aiResponse: any = text.replace(/<[^>]+>/g, '');
        return res.json({
          prompt,
          aiResponse
        })
        return new Response(JSON.stringify({ text:"hey"}), {
            headers: { 'Content-Type': 'application/json' },
        });
    
    }catch(error:any){
        console.error('Error:', error); // Return an error response
        return res.status(500).json({ error: error.message });
        return new Response(JSON.stringify({ text:"hey"}), {
            headers: { 'Content-Type': 'application/json' },
        });
    }

}