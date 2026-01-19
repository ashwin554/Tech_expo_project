const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const path = require('path');

// Load env from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('No GEMINI_API_KEY found in .env.local');
        return;
    }
    console.log('API Key found: ' + apiKey.substring(0, 10) + '...');

    const genAI = new GoogleGenerativeAI(apiKey);

    const modelsToTest = [
        'gemini-1.5-flash',
        'gemini-1.5-flash-latest',
        'gemini-1.5-pro',
        'gemini-pro',
        'gemini-2.0-flash-exp', // Experimental
        'gemini-flash-latest'   // User suggestion
    ];

    console.log('Starting model connectivity tests...\n');

    for (const modelName of modelsToTest) {
        try {
            process.stdout.write(`Testing ${modelName.padEnd(25)}: `);
            const model = genAI.getGenerativeModel({ model: modelName });

            // Minimal generation test
            const result = await model.generateContent('Hi');
            const response = await result.response;
            const text = response.text();

            console.log(`✅ SUCCESS`);
        } catch (error) {
            let msg = error.message;
            if (msg.includes('404')) msg = '404 Not Found';
            else if (msg.includes('403')) msg = '403 Forbidden';
            console.log(`❌ FAILED (${msg})`);
        }
    }
}

testModels();
