/* TODO ADD PORTKEY OR OTHER SOLUTION FOR ROUTING LLM REQUESTS */

import { NextResponse } from 'next/server'
import dotenv from 'dotenv';
dotenv.config();

export async function POST(request: Request) {
  const { message } = await request.json();
  let model;

  // Command Parsing Logic
  if (message.toLowerCase().includes('add a new memory')) {
    return NextResponse.json({
      reply: 'I can help you add a new memory. Please provide the title and date.',
    });
  }

  // Example: Fetch memories with a certain tag
  if (message.toLowerCase().includes('show memories tagged with')) {
    return NextResponse.json({
      reply: 'Here are your memories tagged with "Vacation": Memory 1, Memory 2.',
    });
  }

  if (process.env.ENVIRONMENT !== 'production') {
      model === 'gpt-4o-mini'
  } else {
      model === 'gpt-4o'
  };

  // Replace this with your actual API request to the LLM (e.g., OpenAI)
  const apiResponse = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      prompt: message,
      max_tokens: 150,
    }),
  });

  const apiData = await apiResponse.json();
  const reply = apiData.choices[0].text;

  return NextResponse.json({ reply });
}