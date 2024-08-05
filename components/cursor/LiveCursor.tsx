import { LiveCursorProps } from "@/types/type";
import Cursor from "./Cursor";
import React from "react";
import { COLORS } from "@/constants";

const LiveCursor = ({ others }: LiveCursorProps) => {
  return others.map(({ connectionId, presence }) => {
    if (!presence?.cursor) return null;
    return (
      <Cursor
        key={connectionId}
        color={COLORS[Number(connectionId) % COLORS.length]}
        x={presence.cursor.x}
        y={presence.cursor.y}
        message={presence.message}
      />
    );
  });
};

export default LiveCursor;
