import React, { MouseEventHandler } from "react";
interface IOverlay {
  onClick: React.MouseEventHandler;
}
function Overlay({ onClick }: IOverlay) {
  return (
    <div
      onClick={onClick}
      className="fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-60"
    />
  );
}

export default Overlay;
