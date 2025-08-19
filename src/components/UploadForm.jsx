import React, { useRef, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";

export default function UploadForm() {
  const tiltCard = useRef(null);

  // tilt card when hover
  useEffect(() => {
    if (tiltCard.current) {
      VanillaTilt.init(tiltCard.current, {
        scale: 0.95,
        startY: 40,
        glare: true,
        "max-glare": 0.2,
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden bg-black/0">
      <div
        ref={tiltCard}
        className="
        w-200
        h-150
        mx-auto
        p-8
        rounded-xl
        border
        border-slate-500
        text-white
        bg-background/40
        backdrop-blur-lg
        [transform:perspective(500px)]
        [transform-style:preserve-3d]
        shadow-[0_0_1em_rgba(0,0,0,0.5)]
      "
        data-tilt
        data-tilt-scale="0.95"
        data-tilt-startY="40"
      >
        {" "}
        insert logic here
        {/* insert logic here */}
      </div>
    </div>
  );
}
