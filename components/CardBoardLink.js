"use client";
import { useState } from 'react';

const CardBoardLink = ({ boardId }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  
  const boardLink = `${
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://codefastsaas.com"
  }/b/${boardId}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(boardLink);
      setCopySuccess(true);
      
      // Reset success message after 2 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  return (
    <div className="bg-base-100 rounded-3xl text-sm px-4 py-2.5">
      <div className="flex items-center justify-between">
        <p className="truncate flex-1">{boardLink}</p>
        <button 
          className="btn btn-sm btn-neutral ml-2 flex items-center" 
          onClick={copyLink}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-1"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          {copySuccess ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

export default CardBoardLink;