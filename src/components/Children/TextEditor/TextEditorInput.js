import React, { useState, useId, useRef } from "react";

export function TextEditorInput() {
  const [textContent, setTextContent] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const inputId = useId(); // Generate a unique ID for the input

  const textareaRef = useRef(null);

  const handleInput = (e) => {
    const textarea = textareaRef.current;

    if (textarea) {
      // Reset the height to recalculate the correct height
      textarea.style.height = "auto";

      // Set the height to match the scrollHeight (fits content)
      textarea.style.height = `${textarea.scrollHeight}px`;
    }

    setTextContent(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result); // Set the uploaded image's data URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Image Upload */}
      <div className="">
        <label
          htmlFor={inputId} // Use the unique ID here
          className="cursor-pointer flex items-center transition"
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
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </label>
        <input
          id={inputId} // Use the unique ID here
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        className="textarea w-full resize-none outline-none overflow-hidden"
        placeholder="Start to type something..."
        value={textContent}
        onInput={handleInput}
        style={{ overflow: "hidden" }} // Prevents scrollbar from showing
      />

      {/* Preview Section */}
      {imageSrc && (
        <div className="p-2">
          <img
            src={imageSrc}
            alt="Uploaded Preview"
            className="w-full max-h-[70rem] object-contain rounded-md"
          />
        </div>
      )}
    </div>
  );
}
