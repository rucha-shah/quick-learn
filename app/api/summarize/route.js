// app/api/summarize/route.js
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

export async function POST(request) {
  try {
    const { topic } = await request.json();
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo',
      prompt: `Explain ${topic} in simple terms.`,
      max_tokens: 150,
    });

    return NextResponse.json({ summary: response.choices[0].text.trim() });
  } catch (error) {
    return NextResponse.json({ message: 'Error generating summary' }, { status: 500 });
  }
}
