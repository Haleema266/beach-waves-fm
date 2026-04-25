import { PlayerContext } from "@/context/PlayerContext";
import { useContext } from "react";

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
