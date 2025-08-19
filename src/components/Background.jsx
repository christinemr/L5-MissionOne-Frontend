import React from "react";

export default function Background({ children }) {
  return (
    <div className="h-screen w-full bg-cover bg-center bg-[url('/images/background.jpeg')]">
      {/* nested components */}
      {children}
    </div>
  );
}
