// app/api/flashcards/route.js
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

export async function POST(request) {
  try {
    const { topic } = await request.json();
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo',
      prompt: `List 5 key points about ${topic}.`,
      max_tokens: 100,
    });

    // Split the response text into flashcards (adjust the split logic as needed)
    const flashcards = response.choices[0].text.trim().split("\n").filter(Boolean);
    return NextResponse.json({ flashcards });
  } catch (error) {
    return NextResponse.json({ message: 'Error generating flashcards' }, { status: 500 });
  }
}
