import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';

// Load env from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('No GEMINI_API_KEY found in .env.local');
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        // There isn't a direct listModels method on the main class in the Node SDK usually, 
        // but we can try to get a model and run a test, OR rely on the error message which told us to call ListModels.
        // Actually, the SDK *does* have a ModelService, but it's often easier to just try a simple generation to check connectivity
        // However, since we are getting 404s, we really want to see the list.
        // The SDK might not expose listModels directly in the high-level entry point easily.
        // Let's try to access the `getGenerativeModel` and inspect config, 
        // OR just try a known stable legacy model like 'gemini-1.0-pro' to see if that works.

        // Attempting to use the ModelManager if accessible, otherwise we'll try a fallback request.
        // NOTE: The Node SDK doesn't always expose listModels simply. 
        // Let's try to just run a generation with explicitly 'gemini-1.5-flash' again but printing full error.

        console.log("Testing Model: gemini-1.5-flash");
        const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' }); // Try with 'models/' prefix
        const result = await model.generateContent('Hello');
        console.log("Success with models/gemini-1.5-flash:", await result.response.text());

    } catch (error) {
        console.error("Error with models/gemini-1.5-flash:", error.message);
    }

    try {
        console.log("Testing Model: gemini-1.5-flash (no prefix)");
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent('Hello');
        console.log("Success with gemini-1.5-flash:", await result.response.text());

    } catch (error) {
        console.error("Error with gemini-1.5-flash:", error.message);
    }

    try {
        console.log("Testing Model: gemini-1.0-pro");
        const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });
        const result = await model.generateContent('Hello');
        console.log("Success with gemini-1.0-pro:", await result.response.text());
    } catch (error) {
        console.error("Error with gemini-1.0-pro:", error.message);
    }
}

listModels();
