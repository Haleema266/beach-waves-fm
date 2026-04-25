import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAddFavorite,
  useChannels,
  useFavorites,
  useRemoveFavorite,
  useTracks,
} from "@/hooks/useBackend";
import { usePlayer } from "@/hooks/usePlayer";
import type { Track } from "@/types/music";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  Pause,
  Play,
  Radio,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const MOOD_COLORS: Record<string, string> = {
  Chill: "bg-secondary/20 text-secondary border-secondary/40",
  Relaxed: "bg-secondary/20 text-secondary border-secondary/40",
  Retro: "bg-accent/20 text-accent border-accent/40",
  Dreamy: "bg-chart-5/20 text-chart-5 border-chart-5/40",
};

function getMoodClass(mood: string): string {
  return MOOD_COLORS[mood] ?? "bg-primary/20 text-primary border-primary/40";
}

export default function PlayerPage() {
  const { state, dispatch, togglePlay, seek, setVolume, playTrack } =
    usePlayer();
  const { currentTrack, currentChannel, isPlaying, progress, volume } = state;
  const navigate = useNavigate();
  const { data: channels = [] } = useChannels();
  const { data: tracks = [] } = useTracks(currentChannel?.id ?? null);
  const { data: favorites = [] } = useFavorites();
  const addFav = useAddFavorite();
  const removeFav = useRemoveFavorite();
  const [queueOpen, setQueueOpen] = useState(true);

  const isFav = currentTrack
    ? favorites.some((f) => f.id === currentTrack.id) ||
      state.favorites.some((f) => f.id === currentTrack.id)
    : false;

  const currentIndex = tracks.findIndex((t) => t.id === currentTrack?.id);

  function playNext() {
    if (!currentChannel || tracks.length === 0) return;
    const next = tracks[(currentIndex + 1) % tracks.length];
    playTrack(next, currentChannel);
  }

  function playPrev() {
    if (!currentChannel || tracks.length === 0) return;
    const prev = tracks[(currentIndex - 1 + tracks.length) % tracks.length];
    playTrack(prev, currentChannel);
  }

  function toggleFavorite() {
    if (!currentTrack) return;
    if (isFav) {
      removeFav.mutate(currentTrack.id);
      dispatch({ type: "REMOVE_FAVORITE", trackId: currentTrack.id });
    } else {
      addFav.mutate(currentTrack.id);
      dispatch({ type: "ADD_FAVORITE", track: currentTrack });
    }
  }

  if (!currentTrack) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.18 0.05 260) 0%, oklch(0.14 0.04 220) 40%, oklch(0.16 0.06 185) 70%, oklch(0.12 0.03 260) 100%)",
        }}
        data-ocid="player.empty_state"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="text-8xl mb-6 select-none drop-shadow-lg">🌴</div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">
            Nothing playing
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xs text-base">
            Head to Channels and pick something groovy
          </p>
          <Button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="btn-tropical gradient-tropical text-card border-0 px-8 py-3 text-base"
            data-ocid="player.browse_channels_button"
          >
            Browse Channels
          </Button>
        </motion.div>
      </div>
    );
  }

  const currentTime = progress * currentTrack.duration;
  const totalTime = currentTrack.duration;

  return (
    <div
      className="min-h-full relative"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.18 0.05 260) 0%, oklch(0.14 0.04 220) 30%, oklch(0.16 0.06 185) 60%, oklch(0.20 0.08 55) 80%, oklch(0.18 0.07 15) 100%)",
      }}
    >
      {/* Channel info banner */}
      <div
        className="relative z-10 flex items-center justify-between px-6 py-3 border-b"
        style={{ borderColor: "oklch(0.35 0.04 260 / 0.6)" }}
        data-ocid="player.channel_banner"
      >
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-7 h-7">
            <div className="absolute inset-0 rounded-full gradient-tropical opacity-70 animate-pulse" />
            <Radio className="relative z-10 size-4 text-card" />
          </div>
          <span className="font-display text-base font-bold text-foreground tracking-wide">
            {currentChannel?.name ?? "—"}
          </span>
          {currentChannel?.mood && (
            <Badge
              className={`text-xs px-2 py-0.5 border ${getMoodClass(currentChannel.mood)}`}
              data-ocid="player.mood_badge"
            >
              {currentChannel.mood}
            </Badge>
          )}
        </div>

        {/* Favorite button — top right */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={toggleFavorite}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          data-ocid="player.favorite_button"
          className={`transition-smooth ${
            isFav
              ? "text-accent hover:text-accent/80"
              : "text-muted-foreground hover:text-accent"
          }`}
        >
          <Heart
            className={`size-5 transition-smooth ${isFav ? "fill-current scale-110" : ""}`}
          />
        </Button>
      </div>

      {/* Main player area */}
      <div className="flex flex-col items-center px-6 pt-10 pb-8 max-w-2xl mx-auto">
        {/* Album art */}
        <motion.div
          key={currentTrack.id}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden"
          style={{
            boxShadow: isPlaying
              ? "0 0 40px oklch(0.68 0.18 55 / 0.45), 0 0 80px oklch(0.62 0.19 15 / 0.25), 0 20px 60px rgba(0,0,0,0.6)"
              : "0 20px 60px rgba(0,0,0,0.6)",
            transition: "box-shadow 0.8s ease",
          }}
          data-ocid="player.album_art"
        >
          <img
            src={
              currentTrack.albumArtUrl ||
              "/assets/generated/beach-hero.dim_1200x600.jpg"
            }
            alt={`${currentTrack.album} cover art`}
            className="w-full h-full object-cover"
          />
          {/* CRT scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px)",
            }}
          />
          {/* CRT subtle vignette */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.45) 100%)",
            }}
          />
          {/* Glow border when playing */}
          {isPlaying && (
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                boxShadow: "inset 0 0 0 2px oklch(0.78 0.16 55 / 0.5)",
              }}
            />
          )}
        </motion.div>

        {/* Track info */}
        <motion.div
          key={`info-${currentTrack.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-8 text-center w-full"
        >
          <h1
            className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight"
            data-ocid="player.track_title"
          >
            {currentTrack.title}
          </h1>
          <p
            className="text-base text-muted-foreground mt-1"
            data-ocid="player.track_artist"
          >
            {currentTrack.artist}
          </p>
          <p
            className="text-sm mt-0.5"
            style={{ color: "oklch(0.6 0.06 185)" }}
          >
            {currentTrack.album}
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mt-7 w-full space-y-1.5">
          <div
            className="relative h-2 rounded-full cursor-pointer group"
            style={{ background: "oklch(0.28 0.02 260)" }}
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
            data-ocid="player.seek_bar"
          >
            <div
              className="h-full gradient-tropical rounded-full transition-all duration-200"
              style={{ width: `${progress * 100}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-md opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
              style={{ left: `calc(${progress * 100}% - 8px)` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground font-mono tabular-nums">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalTime)}</span>
          </div>
        </div>

        {/* Playback controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={playPrev}
            aria-label="Previous track"
            data-ocid="player.prev_button"
            className="w-11 h-11 rounded-full text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-smooth"
          >
            <SkipBack className="size-5" />
          </Button>

          {/* Large pulsing play/pause button */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.93 }}
            whileHover={{ scale: 1.05 }}
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            data-ocid="player.play_button"
            className="relative w-18 h-18 flex items-center justify-center rounded-full"
            style={{
              width: "4.5rem",
              height: "4.5rem",
              background:
                "linear-gradient(135deg, oklch(0.78 0.16 55), oklch(0.68 0.22 15))",
              boxShadow: isPlaying
                ? "0 0 24px oklch(0.78 0.16 55 / 0.6), 0 4px 16px rgba(0,0,0,0.4)"
                : "0 4px 16px rgba(0,0,0,0.4)",
              transition: "box-shadow 0.4s ease",
            }}
          >
            {isPlaying && (
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: "oklch(0.78 0.16 55 / 0.3)" }}
                aria-hidden="true"
              />
            )}
            {isPlaying ? (
              <Pause className="size-6 text-card fill-current relative z-10" />
            ) : (
              <Play className="size-6 text-card fill-current relative z-10 ml-0.5" />
            )}
          </motion.button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={playNext}
            aria-label="Next track"
            data-ocid="player.next_button"
            className="w-11 h-11 rounded-full text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-smooth"
          >
            <SkipForward className="size-5" />
          </Button>
        </div>

        {/* Volume slider */}
        <div className="flex items-center gap-3 mt-5">
          <Volume2 className="size-4 text-muted-foreground flex-shrink-0" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Volume"
            data-ocid="player.volume_slider"
            className="w-32 h-1.5 cursor-pointer"
            style={{ accentColor: "oklch(0.78 0.16 55)" }}
          />
        </div>
      </div>

      {/* Queue / tracklist */}
      <div
        className="max-w-2xl mx-auto px-6 pb-10"
        data-ocid="player.queue_section"
      >
        <div
          className="rounded-2xl overflow-hidden border"
          style={{
            background: "oklch(0.16 0.03 260 / 0.8)",
            borderColor: "oklch(0.30 0.04 260 / 0.6)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Queue header — collapsible */}
          <button
            type="button"
            onClick={() => setQueueOpen(!queueOpen)}
            className="w-full flex items-center justify-between px-5 py-4 transition-smooth hover:bg-white/5"
            data-ocid="player.queue_toggle"
            aria-expanded={queueOpen}
          >
            <div className="flex items-center gap-3">
              <span className="font-display text-base font-bold text-foreground">
                Queue
              </span>
              {currentChannel && (
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full border"
                  style={{
                    background: "oklch(0.72 0.15 185 / 0.15)",
                    color: "oklch(0.72 0.15 185)",
                    borderColor: "oklch(0.72 0.15 185 / 0.35)",
                  }}
                >
                  {currentChannel.name}
                </span>
              )}
              <span className="text-xs text-muted-foreground">
                {tracks.length} tracks
              </span>
            </div>
            {queueOpen ? (
              <ChevronUp className="size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground" />
            )}
          </button>

          <AnimatePresence initial={false}>
            {queueOpen && (
              <motion.div
                key="queue"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div
                  className="border-t"
                  style={{ borderColor: "oklch(0.30 0.04 260 / 0.6)" }}
                >
                  {tracks.length === 0 ? (
                    <div className="space-y-2 p-4">
                      {["a", "b", "c", "d"].map((id) => (
                        <Skeleton
                          key={id}
                          className="h-13 rounded-lg"
                          style={{
                            background: "oklch(0.22 0.02 260 / 0.6)",
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div
                      className="divide-y"
                      style={{ borderColor: "oklch(0.24 0.03 260 / 0.4)" }}
                      data-ocid="player.tracklist"
                    >
                      {tracks.map((track: Track, i: number) => {
                        const isActive = track.id === currentTrack?.id;
                        return (
                          <button
                            type="button"
                            key={track.id}
                            data-ocid={`player.track.${i + 1}`}
                            onClick={() =>
                              currentChannel && playTrack(track, currentChannel)
                            }
                            className={[
                              "w-full flex items-center gap-4 px-5 py-3.5 text-left transition-smooth",
                              isActive ? "bg-primary/10" : "hover:bg-white/5",
                            ].join(" ")}
                          >
                            {/* Track number / playing indicator */}
                            <span
                              className="w-6 text-xs font-mono text-center flex-shrink-0"
                              style={{
                                color: isActive
                                  ? "oklch(0.78 0.16 55)"
                                  : "oklch(0.5 0.01 260)",
                              }}
                            >
                              {isActive && isPlaying ? "▶" : i + 1}
                            </span>

                            {/* Thumbnail */}
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-white/10">
                              <img
                                src={
                                  track.albumArtUrl ||
                                  "/assets/generated/beach-hero.dim_1200x600.jpg"
                                }
                                alt={track.album}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Title / artist */}
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm font-medium truncate ${
                                  isActive ? "font-display" : "text-foreground"
                                }`}
                                style={
                                  isActive
                                    ? { color: "oklch(0.85 0.14 55)" }
                                    : {}
                                }
                              >
                                {track.title}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {track.artist}
                              </p>
                            </div>

                            {/* Duration */}
                            <span
                              className="text-xs font-mono tabular-nums flex-shrink-0"
                              style={{ color: "oklch(0.5 0.01 260)" }}
                            >
                              {formatTime(track.duration)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Other channels */}
      {channels.filter((c) => c.id !== currentChannel?.id).length > 0 && (
        <div
          className="border-t px-6 py-8"
          style={{
            background: "oklch(0.14 0.03 260 / 0.7)",
            borderColor: "oklch(0.28 0.04 260 / 0.5)",
          }}
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-base font-bold text-foreground mb-4">
              More Channels
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {channels
                .filter((c) => c.id !== currentChannel?.id)
                .map((ch) => (
                  <button
                    type="button"
                    key={ch.id}
                    data-ocid={`player.channel_switch.${ch.id}`}
                    onClick={() => navigate({ to: "/" })}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-foreground transition-smooth hover:bg-primary/10"
                    style={{
                      background: "oklch(0.20 0.03 260 / 0.8)",
                      border: "1px solid oklch(0.32 0.04 260 / 0.6)",
                    }}
                  >
                    <span className="text-base">📻</span>
                    {ch.name}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
