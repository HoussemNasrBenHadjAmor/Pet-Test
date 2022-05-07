import React from "react";

const ServerDown = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col text-center gap-5">
        <p className="text-3xl">504</p>

        <p>Server is down, please try again later.</p>
      </div>
    </div>
  );
};

export default ServerDown;
