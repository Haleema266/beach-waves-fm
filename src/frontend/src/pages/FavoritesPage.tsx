import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useChannels,
  useFavorites,
  useRemoveFavorite,
} from "@/hooks/useBackend";
import { usePlayer } from "@/hooks/usePlayer";
import type { Track } from "@/types/music";
import { useNavigate } from "@tanstack/react-router";
import { Heart, Trash2, Waves } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const SKELETON_IDS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e"];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function FavoritesPage() {
  const { state, playTrack, dispatch } = usePlayer();
  const { data: serverFavorites = [], isLoading } = useFavorites();
  const removeFav = useRemoveFavorite();
  const { data: channels = [] } = useChannels();
  const navigate = useNavigate();

  // Merge server favorites with local context favorites (dedup by id)
  const seen = new Set<number>();
  const favorites: Track[] = [];
  for (const f of [...serverFavorites, ...state.favorites]) {
    if (!seen.has(f.id)) {
      seen.add(f.id);
      favorites.push(f);
    }
  }

  function handleRemove(e: React.MouseEvent, track: Track) {
    e.stopPropagation();
    removeFav.mutate(track.id);
    dispatch({ type: "REMOVE_FAVORITE", trackId: track.id });
    toast.success(`Removed "${track.title}" from favorites`);
  }

  function handlePlay(track: Track) {
    const channel = channels.find((c) => c.id === track.channelId);
    if (channel) {
      playTrack(track, channel);
      navigate({ to: "/player" });
    } else {
      toast.error("Channel not found");
    }
  }

  const getChannelName = (channelId: number) =>
    channels.find((c) => c.id === channelId)?.name ?? "Unknown Channel";

  return (
    <div className="min-h-full bg-background">
      {/* ── Page Header ── */}
      <div className="relative bg-card border-b border-border overflow-hidden">
        {/* Decorative tropical gradient strip */}
        <div
          className="absolute inset-x-0 bottom-0 h-1 gradient-tropical opacity-80"
          aria-hidden="true"
        />
        {/* Subtle wave pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, currentColor 20px, currentColor 21px)",
          }}
          aria-hidden="true"
        />
        <div className="relative px-6 py-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="flex items-center gap-4"
          >
            {/* Icon badge */}
            <div className="w-16 h-16 rounded-full gradient-tropical flex items-center justify-center shadow-md flex-shrink-0">
              <Heart
                className="size-8 text-card fill-current"
                aria-hidden="true"
              />
            </div>
            <div>
              <h1 className="font-display text-4xl font-bold text-foreground tracking-tight leading-tight">
                Favorites
              </h1>
              <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
                <Waves className="size-3.5 text-secondary" aria-hidden="true" />
                {favorites.length > 0
                  ? `${favorites.length} track${favorites.length !== 1 ? "s" : ""} saved`
                  : "Your saved tracks"}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Wave Divider ── */}
      <div
        className="h-10 bg-muted/20 relative overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full text-card"
          aria-hidden="true"
        >
          <path
            d="M0,20 C200,40 400,0 600,20 C800,40 1000,0 1200,20 L1200,0 L0,0 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* ── Track List ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        {isLoading ? (
          <div className="space-y-3" data-ocid="favorites.loading_state">
            {SKELETON_IDS.map((id) => (
              <Skeleton key={id} className="h-[72px] rounded-xl" />
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div
            className="space-y-1.5"
            data-ocid="favorites.list"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.06 } },
              hidden: {},
            }}
          >
            {favorites.map((track, i) => {
              const isActive = state.currentTrack?.id === track.id;
              const isNowPlaying = isActive && state.isPlaying;
              const channelName = getChannelName(track.channelId);

              return (
                <motion.button
                  type="button"
                  key={track.id}
                  variants={{
                    hidden: { opacity: 0, x: -14 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.3 },
                    },
                  }}
                  data-ocid={`favorites.item.${i + 1}`}
                  onClick={() => handlePlay(track)}
                  aria-label={`Play ${track.title} by ${track.artist}`}
                  className={[
                    "group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer w-full text-left",
                    "border transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "bg-primary/10 border-primary/30"
                      : "bg-card/50 border-transparent hover:bg-accent/10 hover:border-accent/25",
                  ].join(" ")}
                >
                  {/* Album Art */}
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-border/50 shadow-sm">
                    <img
                      src={
                        track.albumArtUrl ||
                        "/assets/generated/beach-hero.dim_1200x600.jpg"
                      }
                      alt={`${track.album} cover`}
                      className="w-full h-full object-cover"
                    />
                    {isNowPlaying && (
                      <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                        <span className="flex gap-[3px] items-end h-4">
                          {["b1", "b2", "b3"].map((bId, bi) => (
                            <span
                              key={bId}
                              className="w-[3px] rounded-full bg-card animate-bounce"
                              style={{
                                animationDelay: `${bi * 0.15}s`,
                                height: `${8 + bi * 3}px`,
                              }}
                            />
                          ))}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold truncate leading-snug ${
                        isActive
                          ? "text-primary font-display"
                          : "text-foreground"
                      }`}
                    >
                      {track.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {track.artist}
                      <span className="mx-1 opacity-50">·</span>
                      <span className="text-secondary/80">{channelName}</span>
                    </p>
                  </div>

                  {/* Duration */}
                  <span className="text-xs text-muted-foreground font-mono tabular-nums hidden sm:block flex-shrink-0">
                    {formatTime(track.duration)}
                  </span>

                  {/* Remove Button */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleRemove(e, track)}
                    aria-label={`Remove ${track.title} from favorites`}
                    data-ocid={`favorites.delete_button.${i + 1}`}
                    className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 text-muted-foreground hover:text-destructive transition-opacity duration-200 flex-shrink-0"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 text-center"
      data-ocid="favorites.empty_state"
    >
      {/* Illustrated icon stack */}
      <div className="relative mb-8 w-24 h-24">
        <div className="absolute inset-0 rounded-full gradient-tropical opacity-20 animate-pulse" />
        <div className="absolute inset-2 rounded-full bg-card border border-border flex items-center justify-center shadow-md">
          <span className="text-4xl select-none" role="img" aria-label="sunset">
            🌅
          </span>
        </div>
      </div>

      <h2 className="font-display text-2xl font-bold text-foreground mb-3">
        No tracks saved yet
      </h2>
      <p className="text-muted-foreground mb-8 max-w-xs leading-relaxed">
        Explore the channels and hit the{" "}
        <Heart className="inline size-3.5 text-accent fill-current mx-0.5 align-middle" />{" "}
        heart to save your favorite tracks here.
      </p>

      {/* Wave decoration */}
      <div className="flex items-center gap-3 mb-8 text-muted-foreground/30">
        <Waves className="size-5" />
        <span className="text-xs font-mono tracking-widest uppercase">
          Explore channels
        </span>
        <Waves className="size-5 scale-x-[-1]" />
      </div>

      <Button
        type="button"
        onClick={() => navigate({ to: "/" })}
        className="btn-tropical gradient-tropical text-card border-0"
        data-ocid="favorites.browse_button"
      >
        Browse Channels
      </Button>
    </motion.div>
  );
}
