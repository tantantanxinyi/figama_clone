import React, { Key, use, useCallback, useEffect, useState } from "react";
import LiveCursor from "./cursor/LiveCursor";
import { useMyPresence, useOthers } from "@liveblocks/react";
import CursorChat from "./cursor/CursorChat";
import { CursorMode, Reaction } from "@/types/type";
import ReactionSelector from "./reaction/FlyingReaction";

const Live = () => {
  const others = useOthers();

  const [{ cursor }, updateMyPresence] = useMyPresence() as any;

  const [cursorState, setCursorState] = useState({ mode: CursorMode.Hidden });

  const [reaction, setReaction] = useState<Reaction[]>([]);

  const handlePointserMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    // check if the cursor is not null and the mode is not ReactionSelector
    if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
      updateMyPresence({ cursor: { x, y } });
    }
  }, []);

  const handlePointserLeave = useCallback((event: React.PointerEvent) => {
    // event.preventDefault();
    setCursorState({ mode: CursorMode.Hidden });
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;

    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: null, message: null });
  }, []);

  const handlePointserDown = useCallback((event: React.PointerEvent) => {
    // 去掉preventDefault
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;

    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });
  }, []);

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "/") {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: ""
        });
      } else if (e.key === "Escape") {
        updateMyPresence({ message: "" });
        setCursorState({ mode: CursorMode.Hidden });
      } else if (e.key === "e") {
        setCursorState({
          mode: CursorMode.ReactionSelector
        });
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      console.log(23423);
      if (e.key === "/") {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [updateMyPresence]);

  return (
    <div
      onPointerMove={handlePointserMove}
      onPointerLeave={handlePointserLeave}
      onPointerDown={handlePointserDown}
      className="h-[100vh] w-full flex justify-center items-center text-center"
    >
      <h1 className="text-5xl text-white">Liveblocks figma clone</h1>

      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}

      {cursorState.mode === CursorMode.ReactionSelector && (
        <ReactionSelector
          setReaction={reaction => {
            setReaction(reaction);
          }}
        />
      )}

      <LiveCursor others={others} />
    </div>
  );
};

export default Live;
