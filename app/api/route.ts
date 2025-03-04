import axios from "axios";

const apiKey = process.env.GEMINI_API_KEY as string;

export async function POST(req: Request) {
    try {
        const { skills, education, workExperience, profession } = await req.json();
        const prompt = `I am a ${profession || 'professional'} with ${skills || 'various'} skills and ${education || 'an education'}. I have ${workExperience || 'several'} years of work experience. I am looking for a job. What's my job title? Give me the job titles, job descriptions and salaries in Kes, separate the three with '&&'. Provide all possible job offers in format`;
        const response = await axios({
            method: "POST",
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            headers: {
                "content-type": "application/json"
            },
            data: {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            }
        });

        if (response.data.error) {
            return new Response(JSON.stringify({ error: response.data.error }), {
                status: 500,
            });
        }

        const result = response.data.candidates[0].content.parts[0].text;
        console.log(result);

        const jobOffers: any[] = [];

        // Comprehensive regex to handle multiple job offer formats
        const jobPatterns = [
            // Pattern 1: Basic job title, description, salary with &&
            /\*\*Job Title:\*\* (.*?)\s*\*\*Job Description:\*\* (.*?)\s*\*\*Salary:\*\* (.*?)\s*&&/gs,
            
            // Pattern 2: Option with && separator
            /\*\*Option \d+.*?\*\*\s*\*\*(.*?)\*\* && (.*?) && (.*?)\n/gs,
            
            // Pattern 3: Job Title with numbered variations and KES
            /\*\*Job Title(?:\s*\d+)?:\*\* (?:\*\*)?(.*?)(?:\*\*)?\s*\*\*Job Description(?:\s*\d+)?:\*\* (.*?)\s*\*\*(?:Estimated\s*)?Salary\s*(?:\(KES\))?:\*\* (.*?)\s*&&/gs,
            
            // Pattern 4: Option with full job details
            /\*\*Option \d+: (.*?)\*\*\s*\*\*Job Title:\*\* (.*?)\s*\*\*Job Description:\*\* (.*?)\s*\*\*(?:Estimated\s*)?Salary\s*(?:\(KES\))?:\*\* (.*?)\s*&&/gs,
            
            // Pattern 5: Markdown-style job offer with multiple potential formats
            /(?:\*\*)?Job Title(?:\s*\d+)?(?:\*\*)?:\s*(.*?)\n(?:\*\*)?Job Description(?:\s*\d+)?(?:\*\*)?:\s*(.*?)\n(?:\*\*)?(?:Estimated\s*)?Salary(?:\s*\(KES\))?(?:\*\*)?:\s*(.*?)(?:\n|$)/gs,

            // Pattern 6: Job title, description, and salary with numbered titles and KES
            /\*\*\d+\.\s*(.*?)\*\*\n\s*\*\*Job Description:\*\*\s*(.*?)\n\s*\*\*Salary\s*\(KES\):\*\*\s*(.*?)\s*&&/gs
        ];

        // Combine parsing for multiple job offer formats
        jobPatterns.forEach(jobPattern => {
            let match;
            while ((match = jobPattern.exec(result)) !== null) {
                // Adjust match extraction based on pattern complexity
                let title, description, salary, _;

                if (match.length === 4) {
                    // Standard 3-group patterns
                    [_, title, description, salary] = match;
                } else if (match.length === 5) {
                    // Patterns with an extra group (like Option X)
                    [_, _, title, description, salary] = match;
                }

                // Clean and trim extracted values
                title = title ? title.trim() : "Untitled Position";
                description = description ? description.trim() : "No description available";
                salary = salary ? salary.trim() : "Salary not specified";

                const jobOffer = {
                    title,
                    location: "Kenya",
                    salary: salary + (salary.includes("per") ? "" : " per month"),
                    snippet: description,
                    url: `https://www.linkedin.com/jobs/search/?keywords="${encodeURIComponent(title)}"%20AND%20"Remote"`
                };

                // Avoid duplicate entries
                if (!jobOffers.some(offer => offer.title === jobOffer.title)) {
                    jobOffers.push(jobOffer);
                }
            }
        });

        if (jobOffers.length === 0) {
            return new Response(JSON.stringify({ 
                error: "It's impossible to provide realistic job titles, descriptions, and salaries for someone with null qualifications.",
                details: result
            }), {
                status: 200,
            });
        } else {
            return new Response(JSON.stringify({ 
                jobOffers,
                rawResult: result
            }), {
                status: 200,
            });
        }
    } catch (error: any) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ 
            error: error.message,
            details: error.response?.data
        }), {
            status: 500,
        });
    }
}
