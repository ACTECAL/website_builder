
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export class GeminiService {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async generateContent(prompt: string, retries = 2): Promise<string> {
        if (!this.apiKey) throw new Error("API Key is missing");

        try {
            const response = await fetch(`${GEMINI_API_URL}?key=${this.apiKey}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                })
            });

            if (!response.ok) {
                if (retries > 0 && response.status >= 500) {
                    await delay(1000);
                    return this.generateContent(prompt, retries - 1);
                }
                const err = await response.json();
                throw new Error(err.error?.message || "Failed to fetch from Gemini");
            }

            const data = await response.json();
            return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
        } catch (error) {
            if (retries > 0) {
                await delay(1000);
                return this.generateContent(prompt, retries - 1);
            }
            throw error;
        }
    }

    async analyzeLayout(blocks: any[]): Promise<string> {
        if (!this.apiKey) throw new Error("API Key is missing");

        const prompt = `You are an Elite Web Design Critic for Nexora ERP. 
        Analyze the following layout blocks and provide 3 concise, constructive improvements for aesthetics and usability. 
        Focus on spacing, visual hierarchy, and the "Elite++" premium dark/glassmorphic aesthetic.
        
        Blocks Data: ${JSON.stringify(blocks)}
        
        Keep your response brief, professional, and actionable.`;

        return this.generateContent(prompt);
    }

    async suggestGroupings(blocks: any[]): Promise<string> {
        if (!this.apiKey) throw new Error("API Key is missing");

        const prompt = `You are an AI Design Architect. 
        Look at these website components and suggest logical groupings (semantic sections).
        Blocks: ${JSON.stringify(blocks)}
        
        Return a concise list of suggestions, e.g., 'Group Feature 1, 2, and 3 into a "Solutions" section'.`;

        return this.generateContent(prompt);
    }
}
