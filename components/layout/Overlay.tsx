import React from "react";
interface IOverlay {
  onClick: React.MouseEventHandler;
}
function Overlay({ onClick }: IOverlay) {
  return (
    <div
      onClick={onClick}
      className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60"
    />
  );
}

export default Overlay;
