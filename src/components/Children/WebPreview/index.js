import React, { useState } from "react";

function WebpagePreview() {
  const [url, setUrl] = useState("");
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMetadata = async (inputUrl) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.linkpreview.net/?key=b946fa0b9b15f183b71c188d654c5ddb&q=${encodeURIComponent(
          inputUrl
        )}`
      );

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setPreviews((prev) => [data, ...prev]); // Add the new preview to the start of the list
      }
    } catch (err) {
      setError("Failed to fetch webpage preview.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPreview = () => {
    if (!url.trim()) {
      setError("Please enter a valid URL.");
      return;
    }
    fetchMetadata(url);
    setUrl(""); // Clear the input field
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddPreview();
    }
  };

  const handleRemovePreview = (indexToRemove) => {
    setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      {/* Input Section */}
      <div className="flex items-center space-x-2 w-full">
        <button className="" onClick={handleAddPreview}>
          {/* Plus icon */}
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
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        <input
          type="text"
          className="w-full py-2 bg-transparent outline-none border-b-[1px]"
          placeholder="Enter a URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Error and Loading */}
      {loading && <p className="">Loading...</p>}
      {error && <p className="">{error}</p>}

      {/* Preview Boxes */}
      <div className="w-full space-y-2">
        {previews.map((metadata, index) => (
          <div
            key={index}
            className="relative flex items-center border custom-border p-4 rounded-md w-full cursor-pointer hover:shadow-md transition"
            onClick={() =>
              window.open(metadata.url, "_blank", "noopener noreferrer")
            }
          >
            {/* close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent click from opening the link
                handleRemovePreview(index);
              }}
              className="absolute top-1 right-1 p-1 text-gray-500 hover:text-red-700"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Preview Content */}
            {metadata.image && (
              <img
                src={metadata.image}
                alt="Preview"
                className="w-20 h-20 object-cover mr-4 rounded-md"
              />
            )}
            <div className="flex flex-col justify-between overflow-hidden">
              {/* Title with two-line limit */}
              <h3
                className="text-lg font-bold overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2, // Limit to 2 lines
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {metadata.title}
              </h3>
              <p
                className="text-sm text-gray-600 overflow-hidden text-ellipsis"
                style={{
                  whiteSpace: "nowrap",
                  maxHeight: "3em", // Limit description height
                }}
              >
                {metadata.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WebpagePreview;
