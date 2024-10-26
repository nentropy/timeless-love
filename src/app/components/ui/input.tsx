'use client';

import { useState } from 'react';

interface EmailInputProps {
  label?: string;
  placeholder?: string;
  onSubmit: (email: string) => void; // Callback for handling submission
}

export function Input({
  label = 'Email Address',
  placeholder = 'Enter your email',
  onSubmit,
}: EmailInputProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setError('');
      onSubmit(email); // Trigger callback with valid email
    } else {
      setError('Please enter a valid email address');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      {label && (
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition duration-300">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow p-3 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none"
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby="email-error"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
        >
          Submit
        </button>
      </div>
      {error && (
        <p id="email-error" className="text-red-600 mt-2 text-sm">
          {error}
        </p>
      )}
    </form>
  );
}
