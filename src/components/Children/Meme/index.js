import React, { useState } from "react";

// List all file names from the /meme folder
const memeFiles = ["1.gif", "2.webp", "3.gif", "4.gif", "5.gif", "6.gif"];

const MemeDisplay = () => {
  const [currentMeme, setCurrentMeme] = useState(getRandomMeme());

  // Function to get a random meme
  function getRandomMeme() {
    const randomIndex = Math.floor(Math.random() * memeFiles.length);
    return memeFiles[randomIndex];
  }

  // Refresh meme handler
  const handleRefresh = () => {
    setCurrentMeme(getRandomMeme());
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleRefresh}
        className="font-semibold rounded transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
      <div className="max-w-md rounded-lg overflow-hidden">
        <img
          src={`/meme/${currentMeme}`}
          alt="Random Meme"
          className="w-full object-contain"
        />
      </div>
    </div>
  );
};

export default MemeDisplay;
