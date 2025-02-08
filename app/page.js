// app/page.js
'use client';
import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [summary, setSummary] = useState('');
  const [flashcards, setFlashcards] = useState([]);

  const getSummary = async () => {
    const res = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic }),
    });
    const data = await res.json();
    setSummary(data.summary);
  };

  const getFlashcards = async () => {
    const res = await fetch('/api/flashcards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic }),
    });
    const data = await res.json();
    setFlashcards(data.flashcards);
  };

  return (
    <div>
      <h1>Welcome to QuickLearn</h1>
      <input
        type="text"
        placeholder="Enter a topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button onClick={getSummary}>Get Summary</button>
      {summary && (
        <div>
          <h3>Summary</h3>
          <p>{summary}</p>
        </div>
      )}
      <button onClick={getFlashcards}>Generate Flashcards</button>
      {flashcards.length > 0 && (
        <div>
          <h3>Flashcards</h3>
          <ul>
            {flashcards.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
