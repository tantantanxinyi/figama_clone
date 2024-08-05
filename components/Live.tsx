import React, { use, useCallback } from "react";
import LiveCursor from "./cursor/LiveCursor";
import { useMyPresence, useOthers } from "@liveblocks/react";

const Live = () => {
  const others = useOthers();

  const [{ cursor }, updateMyPresence] = useMyPresence() as any;

  const handlePointserMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;

    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });
  });

  const handlePointserLeave = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;

    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: null, message: null });
  });

  const handlePointserDown = useCallback((event: React.PointerEvent) => {
    // 去掉preventDefault
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;

    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });
  });

  return (
    <div
      onPointerMove={handlePointserMove}
      onPointerLeave={handlePointserLeave}
      onPointerDown={handlePointserDown}
      className="h-[100vh] w-full flex justify-center items-center text-center"
    >
      <h1 className="text-5xl text-white">l iveblocks figma clone</h1>
      <LiveCursor others={others} />
    </div>
  );
};

export default Live;
