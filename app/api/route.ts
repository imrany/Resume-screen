

export async function POST(req: Request) {
    
   

    return new Response(JSON.stringify({ text:"hey"}), {
        headers: { 'Content-Type': 'application/json' },
    });
}