import React, { useRef, useEffect, useState } from "react";
import VanillaTilt from "vanilla-tilt";
import axios from "axios";
import PredictionResult from "./PredictionResult";

export default function UploadForm() {
  const tiltCard = useRef(null);
  const [inputUrl, setInputUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // tilt card when hover
  useEffect(() => {
    if (tiltCard.current) {
      VanillaTilt.init(tiltCard.current, {
        scale: 0.95,
        glare: true,
        "max-glare": 0.2,
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // add trim to remove whitespace if any
    if (!inputUrl.trim()) return;
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/prediction", {
        imgURL: inputUrl,
      });
      const predictions = response.data.response;

      const bestPredictions = predictions[0];

      setResult({
        imageUrl: inputUrl,
        label: bestPredictions?.tagName || "Unknown",
        confidence: (bestPredictions.probability * 100).toFixed(2) ?? "N/A",
      });
    } catch (error) {
      setError("Error, please check the URL and try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden bg-black/0">
      {/* frosted card */}
      <div
        ref={tiltCard}
        className="w-200 h-150 mx-auto p-8 rounded-xl border border-slate-500 text-white bg-background/40 backdrop-blur-lg [transform:perspective(500px)][transform-style:preserve-3d] shadow-[0_0_1em_rgba(0,0,0,0.5)] flex flex-col justify-center items-center"
        data-tilt
        data-tilt-scale="0.95"
      >
        {/* image URL input field */}
        <div className="space-y-8 max-h-full overflow-auto ">
          <form
            className="flex flex-col sm:flex-row w-full max-w-md"
            onSubmit={handleSubmit}
          >
            <input
              type="search"
              placeholder="🔎 paste image URL here"
              value={inputUrl}
              onChange={(e) => {
                setInputUrl(e.target.value);
              }}
              className="flex-grow px-4 sm:px-6 py-2 rounded-s-md border-solid border-white bg-white text-blue-800"
            />
            <button
              type="submit"
              disabled={loading}
              className=" px-4 sm:px-5 py-2 bg-purple-600/70 text-white rounded-e-md cursor-pointer"
            >
              GO
            </button>
          </form>

          {/* render preview image here */}
          {inputUrl && (
            <img
              src={inputUrl}
              alt="preview-image"
              className="w-full max-w-md rounded border"
            />
          )}

          {error && <p className="text-red-500 mt-4">{error}</p>}
          {/* render prediction result here */}
          {result && (
            <PredictionResult
              label={result.label || "unknown"}
              confidence={result.confidence ?? "N/A"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Pseudo code:
// 1. Render upload form
//    - Input field for image URL
//    - Submit button
//    - Render preview image on the top

// 2. On submit:
//    - Validate image URL format
//    - Extract tags (from user input or metadata)
//    - Call prediction API with image URL and tags

// 3. Handle response:
//    - If success: display predicted label, confidence score, suggestions
//    - If error: show error message (e.g., invalid URL, prediction failed)
