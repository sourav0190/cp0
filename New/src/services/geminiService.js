import { GoogleGenerativeAI } from "@google/generative-ai";

// Replace with actual API key or use process.env.VITE_GEMINI_API_KEY
// For hackathon purposes, we use a placeholder that will handle mock responses if key is missing
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY";

const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPT = `
You are the Food Bridge AI Concierge, a luxury culinary assistant for the Food Bridge platform.
Our platform features:
1. Flavor Twin (formerly Craft): A scrollytelling experience about culinary precision.
2. Food Translator (formerly Experience): A tool to bridge cultural and flavor gaps.
3. Flavor Parallels: An interactive discovery tool to find unexpected ingredient pairings.
4. Recipe Discovery: A standalone page to search and filter recipes by allergies (like Wheat, Dairy), Diets (Vegan, Keto), and Cuisines.

Your goal:
- Help users navigate the site.
- Explain "How it works": Users search, filter, and discover unique flavor connections.
- Keep responses premium, concise, and helpful.
- If they ask "What should I do?", suggest searching for flavor parallels or exploring curated recipes.
- Act like a high-end restaurant concierge.
`;

export const getGeminiResponse = async (userMessage, history) => {
    try {
        if (API_KEY === "YOUR_GEMINI_API_KEY") {
            // Mock response if no key is provided
            await new Promise(resolve => setTimeout(resolve, 800));
            if (userMessage.toLowerCase().includes("how does this work")) {
                return "Food Bridge is conceptualized as a curiosity-first culinary platform. You can use our 'Flavor Parallels' tool to discover ingredients that share chemical profiles, or dive into 'Recipe Discovery' to find meals tailored specifically to your goal-based diets and dietary restrictions.";
            }
            return "I'm here to guide you through our culinary landscape. You can explore ingredient connections, filter recipes by dietary needs, or experience our visual storytelling modules.";
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Convert history to Gemini format
        const chat = model.startChat({
            history: history.slice(0, -1).map(msg => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }],
            })),
            generationConfig: {
                maxOutputTokens: 200,
            },
        });

        const result = await chat.sendMessage([{ text: SYSTEM_PROMPT + "\n\nUser Question: " + userMessage }]);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};
