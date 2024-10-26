// app/memories/new/page.tsx
import { useState } from 'react';

export default function AddMemory() {
  const [file, setFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Parse specific commands from the user's input
  const parseCommand = (message: string) => {
    const lowerMessage = message.toLowerCase();

    // Example command: "Show memories tagged with [tag]"
    if (lowerMessage.startsWith('show memories tagged with')) {
      const tag = lowerMessage.replace('show memories tagged with', '').trim();
      return { command: 'show-tagged-memories', tag };
    }

    // Example command: "Add a new memory titled [title] from [date]"
    if (lowerMessage.startsWith('add a new memory titled')) {
      const match = lowerMessage.match(/add a new memory titled (.+) from (.+)/);
      if (match) {
        return { command: 'add-memory', title: match[1], date: match[2] };
      }
    }

    return { command: 'default', message }; // For regular chatbot interactions
  };

  // Handle chat input submission
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    const userMessage = input;
    setLoading(true); // Start loading

    // Append user's message to chat history
    setMessages((prevMessages) => [...prevMessages, { role: 'user', content: userMessage }]);

    // Parse the command from user's input
    const parsedCommand = parseCommand(userMessage);

    let botResponse = '';
    
    if (parsedCommand.command === 'show-tagged-memories') {
      // Handle the "Show memories tagged with" command
      botResponse = `Here are the memories tagged with "${parsedCommand.tag}":\n- Memory 1\n- Memory 2`;
    } else if (parsedCommand.command === 'add-memory') {
      // Handle the "Add a new memory" command
      botResponse = `New memory titled "${parsedCommand.title}" from "${parsedCommand.date}" will be added!`;
    } else {
      // If no specific command is detected, send it to the LLM
      botResponse = await sendToLLM(userMessage);
    }

    // Append bot's response to chat history
    setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: botResponse }]);

    setLoading(false); // Stop loading
    setInput(''); // Clear input
  };

  // Function to send request to LLM API
  const sendToLLM = async (userMessage: string) => {
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await response.json();
    return data.reply;
  };

  // Robot icon for chatbot
  const RobotIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-gray-500 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12h6m-3-3v6m7 6H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 002-2h6a2 2 0 002 2h2a2 2 0 012 2v9a2 2 0 01-2 2z"
      />
    </svg>
  );

  // Blue ball icon for user
  const BlueBallIcon = () => (
    <div className="h-6 w-6 bg-blue-500 rounded-full mr-2"></div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Upper Section: Add Memory Form */}
      <div className="flex-1 container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Add New Memory</h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Memory Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="Enter a title..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Upload Photo/Video</label>
            <input
              type="file"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              onChange={handleFileChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Notes</label>
            <textarea
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              rows={4}
              placeholder="Write down your thoughts..."
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tags</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="Add tags (e.g., Birthday, Vacation)"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Save Memory</button>
        </form>
      </div>

      {/* Lower Section: Chatbot Interface */}
      <div className="w-full bg-gray-100 p-4 fixed bottom-0 h-1/3 border-t border-gray-300">
        <h2 className="text-xl font-bold mb-4">Chat with Memory Assistant</h2>

        {/* Chat Window */}
        <div className="flex flex-col space-y-2 h-2/3 overflow-y-auto mb-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex items-start p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
              {/* Display appropriate icon based on the role */}
              {msg.role === 'user' ? <BlueBallIcon /> : <RobotIcon />}
              <div>
                <strong>{msg.role === 'user' ? 'You' : 'Assistant'}: </strong> {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        {loading && <div className="text-center text-gray-500 mb-4">Assistant is typing...</div>}

        {/* Input Area */}
        <form onSubmit={handleChatSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md px-4 py-2"
            placeholder="Ask me anything about your memories..."
            disabled={loading} // Disable input while loading
          />
          <button
            className={`bg-blue-600 text-white px-4 py-2 ml-2 rounded-md ${loading ? 'opacity-50' : ''}`}
            type="submit"
            disabled={loading} // Disable button while loading
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
