import { ClipboardDocumentIcon } from "@heroicons/24/outline";// Heroicons for clipboard icon
import React, { useState } from 'react';

const CopyTextComponent= ({ text }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied status after 2 seconds
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <span>{text}</span>
      <button
        onClick={copyToClipboard}
        className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
      >

        <ClipboardDocumentIcon className="h-5 w-5 mr-2" />
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default CopyTextComponent;
