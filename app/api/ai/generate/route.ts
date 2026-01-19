import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AI_ARCHITECT_PROMPT } from '@/app/lib/prompts';

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'GEMINI_API_KEY not configured' },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const fullPrompt = AI_ARCHITECT_PROMPT.replace('{{user_input}}', prompt);

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        let text = response.text();

        // Clean up potential markdown formatting
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        let workflowJson;
        try {
            workflowJson = JSON.parse(text);
        } catch (e) {
            return NextResponse.json({ error: 'Failed to parse AI response', raw: text }, { status: 500 });
        }

        return NextResponse.json(workflowJson);
    } catch (error) {
        console.error('AI Generation Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate workflow', details: String(error) },
            { status: 500 }
        );
    }
}
