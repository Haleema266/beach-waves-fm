import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useChannels, useTracks } from "@/hooks/useBackend";
import { usePlayer } from "@/hooks/usePlayer";
import type { Channel } from "@/types/music";
import { useNavigate } from "@tanstack/react-router";
import { Play, Radio } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// Wave divider SVG as a tropical section separator
function WaveDivider() {
  return (
    <div className="relative h-10 overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0,24 C200,48 400,0 600,24 C800,48 1000,0 1200,24 L1200,48 L0,48 Z"
          className="fill-muted/30"
        />
        <path
          d="M0,32 C150,48 350,16 600,32 C850,48 1050,16 1200,32 L1200,48 L0,48 Z"
          className="fill-border/40"
        />
      </svg>
    </div>
  );
}

function TropicalHeader() {
  return (
    <div className="relative overflow-hidden bg-card border-b border-border">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/beach-hero.dim_1200x600.jpg"
          alt=""
          className="w-full h-full object-cover opacity-35"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.96 0.01 55) 0%, oklch(0.96 0.01 55 / 0.75) 60%, transparent 100%)",
          }}
        />
      </div>

      {/* Scanline texture over hero */}
      <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />

      <div className="relative px-6 py-10 md:py-14 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="text-primary text-xs font-mono uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
            <span className="inline-block w-4 h-px bg-primary" />
            Now Broadcasting
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Beach Waves FM
          </h1>
          <p className="text-muted-foreground mt-3 text-sm md:text-base max-w-md leading-relaxed">
            Hand-curated tropical radio channels from the golden era of beach
            culture. Pick a vibe, press play.
          </p>
        </motion.div>
      </div>

      {/* Decorative palm tree row */}
      <div
        className="absolute bottom-3 right-4 text-2xl md:text-3xl opacity-25 select-none hidden sm:block tracking-wide"
        aria-hidden="true"
      >
        🌴🌊🌴🌊🌴
      </div>
    </div>
  );
}

// Individual channel card
function ChannelCard({ channel, index }: { channel: Channel; index: number }) {
  const { data: tracks = [] } = useTracks(channel.id);
  const { playTrack } = usePlayer();
  const navigate = useNavigate();

  function handlePlay() {
    if (tracks.length > 0) {
      playTrack(tracks[0], channel);
      navigate({ to: "/player" });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePlay();
    }
  }

  const hasCover = Boolean(channel.coverImageUrl);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: "easeOut" }}
      data-ocid={`channels.item.${index + 1}`}
      aria-label={`Play ${channel.name}`}
      className="group relative overflow-hidden rounded-xl bg-card border border-border cursor-pointer w-full text-left
        shadow-sm hover:shadow-lg hover:-translate-y-1 transition-smooth
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      onClick={handlePlay}
      onKeyDown={handleKeyDown}
    >
      {/* Cover art / fallback gradient */}
      <div className="relative aspect-video overflow-hidden">
        {hasCover ? (
          <img
            src={channel.coverImageUrl}
            alt={channel.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full gradient-tropical" aria-hidden="true" />
        )}

        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* CRT scanline overlay */}
        <div className="scanlines absolute inset-0 opacity-20 pointer-events-none" />

        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full gradient-tropical flex items-center justify-center shadow-lg ring-2 ring-primary-foreground/30">
            <Play className="size-6 text-primary-foreground fill-current ml-0.5" />
          </div>
        </div>

        {/* Mood badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary/90 text-primary-foreground text-xs font-mono uppercase tracking-wide border-0 px-2">
            {channel.mood}
          </Badge>
        </div>
      </div>

      {/* Card info */}
      <div className="p-4">
        <h3 className="font-display text-base font-bold text-card-foreground group-hover:text-primary transition-colors duration-200 truncate">
          {channel.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
          {channel.description}
        </p>
        <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
          <Radio className="size-3 flex-shrink-0" />
          <span>
            {channel.trackIds.length} track
            {channel.trackIds.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

// Loading skeleton
const SKELETON_IDS = [
  "sk-a",
  "sk-b",
  "sk-c",
  "sk-d",
  "sk-e",
  "sk-f",
  "sk-g",
  "sk-h",
];

function ChannelSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card">
      <Skeleton className="aspect-video w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export default function ChannelsPage() {
  const { data: channels = [], isLoading } = useChannels();
  const [filter, setFilter] = useState<string>("All");

  const moods = ["All", ...Array.from(new Set(channels.map((c) => c.mood)))];
  const filtered =
    filter === "All" ? channels : channels.filter((c) => c.mood === filter);

  return (
    <div className="bg-background min-h-full" data-ocid="channels.page">
      {/* Hero header */}
      <TropicalHeader />

      {/* Wave divider above the grid */}
      <WaveDivider />

      {/* Mood filters */}
      <div
        className="px-6 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none border-b border-border bg-muted/20"
        data-ocid="channels.filter_bar"
      >
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mr-1 flex-shrink-0">
          Vibe:
        </span>
        {moods.map((mood) => (
          <button
            type="button"
            key={mood}
            data-ocid={`channels.filter.${mood.toLowerCase()}`}
            onClick={() => setFilter(mood)}
            className={[
              "px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wide whitespace-nowrap transition-smooth border flex-shrink-0",
              filter === mood
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground",
            ].join(" ")}
          >
            {mood}
          </button>
        ))}
      </div>

      {/* Grid section */}
      <div className="px-6 py-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-2xl" aria-hidden="true">
            🌴
          </span>
          <h2 className="font-display text-xl font-bold text-foreground">
            {filter === "All" ? "All Channels" : `${filter} Channels`}
          </h2>
          {!isLoading && (
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {filtered.length}
            </span>
          )}
        </motion.div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            data-ocid="channels.loading_state"
          >
            {SKELETON_IDS.map((id) => (
              <ChannelSkeleton key={id} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="channels.empty_state"
          >
            <div className="text-6xl mb-4" aria-hidden="true">
              🏖️
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">
              No channels found
            </h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Try a different vibe filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((channel, i) => (
              <ChannelCard key={channel.id} channel={channel} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
