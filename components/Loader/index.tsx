"use client";

import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-[100px]  w-full bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
    </div>
  );
};

export default Loading;
