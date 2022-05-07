import React from "react";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-5 text-center">
        <p className="text-3xl">404</p>

        <p>This page is no longer available.</p>
      </div>
    </div>
  );
};

export default NotFound;
