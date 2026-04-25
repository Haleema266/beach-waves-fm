import { Button } from "@/components/ui/button";
import { usePlayer } from "@/hooks/usePlayer";
import { ChevronDown, ChevronUp, Pause, Play, Square } from "lucide-react";
import { useState } from "react";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MiniPlayer() {
  const { state, togglePlay, stopPlayback, seek, audioRef } = usePlayer();
  const [expanded, setExpanded] = useState(false);
  const { currentTrack, isPlaying, progress } = state;

  if (!currentTrack) return null;

  const currentTime = audioRef.current?.duration
    ? progress * audioRef.current.duration
    : 0;
  const totalTime = audioRef.current?.duration ?? currentTrack.duration;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-md transition-smooth md:bottom-0"
      data-ocid="mini_player"
    >
      {/* Progress bar */}
      <div
        className="relative h-1 bg-muted cursor-pointer group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          seek((e.clientX - rect.left) / rect.width);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") seek(Math.min(1, progress + 0.05));
          if (e.key === "ArrowLeft") seek(Math.max(0, progress - 0.05));
        }}
        role="slider"
        aria-label="Seek progress"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
      >
        <div
          className="h-full gradient-tropical transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `calc(${progress * 100}% - 6px)` }}
        />
      </div>

      <div className="flex items-center gap-3 px-4 py-2 md:px-6">
        {/* Album art */}
        <div className="relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-border shadow-xs">
          <img
            src={
              currentTrack.albumArtUrl ||
              "/assets/generated/beach-hero.dim_1200x600.jpg"
            }
            alt={currentTrack.album}
            className="w-full h-full object-cover"
          />
          {isPlaying && (
            <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
          )}
        </div>

        {/* Track info */}
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-semibold text-foreground truncate font-display"
            data-ocid="mini_player.track_title"
          >
            {currentTrack.title}
          </p>
          <p
            className="text-xs text-muted-foreground truncate"
            data-ocid="mini_player.track_artist"
          >
            {currentTrack.artist}
          </p>
        </div>

        {/* Time */}
        <span className="hidden md:block text-xs text-muted-foreground font-mono tabular-nums">
          {formatTime(currentTime)} / {formatTime(totalTime)}
        </span>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            data-ocid="mini_player.play_button"
            className="text-primary hover:text-primary/80 hover:bg-primary/10"
          >
            {isPlaying ? (
              <Pause className="size-5 fill-current" />
            ) : (
              <Play className="size-5 fill-current" />
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={stopPlayback}
            aria-label="Stop"
            data-ocid="mini_player.stop_button"
            className="text-muted-foreground hover:text-foreground"
          >
            <Square className="size-4 fill-current" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Collapse player" : "Expand player"}
            data-ocid="mini_player.expand_button"
            className="hidden md:inline-flex text-muted-foreground hover:text-foreground"
          >
            {expanded ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronUp className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-border px-6 py-3 bg-card/90 backdrop-blur-sm animate-fade-in">
          <p className="text-xs text-muted-foreground">
            From{" "}
            <span className="text-secondary font-medium">
              {state.currentChannel?.name}
            </span>
            {" · "}Album:{" "}
            <span className="text-foreground">{currentTrack.album}</span>
          </p>
        </div>
      )}
    </div>
  );
}
