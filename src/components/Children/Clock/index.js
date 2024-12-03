import React, { useEffect, useRef, useState } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());
  const [fontSize, setFontSize] = useState(24); // Initial font size in pixels
  const containerRef = useRef(null);

  // Update the clock every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Adjust font size based on the parent container's width
  const adjustFontSize = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      // Set font size relative to container width (e.g., 10% of the container width)
      setFontSize(containerWidth / 6);
    }
  };

  // Use ResizeObserver to observe changes in container width dynamically
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      adjustFontSize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  // Format the time in HH:MM:SS format
  const formattedTime = time.toLocaleTimeString();

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center w-full h-full"
    >
      <div
        className="flex justify-center items-center w-full text-center font-bold"
        style={{
          fontSize: `${fontSize}px`, // Dynamically set font size based on container width
          maxWidth: "100%",
          wordWrap: "break-word", // Allow the text to wrap when it's too long
          overflow: "hidden", // Hide overflow
        }}
      >
        {formattedTime}
      </div>
    </div>
  );
}

export default Clock;
