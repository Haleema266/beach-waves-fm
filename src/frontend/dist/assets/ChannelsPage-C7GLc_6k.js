import { r as reactExports, j as jsxRuntimeExports, S as Skeleton, u as usePlayer, a as useNavigate, P as Play, R as Radio } from "./index-DSY_0Yw_.js";
import { B as Badge } from "./badge-DY5XCNnt.js";
import { u as useChannels, m as motion, a as useTracks } from "./proxy-BHY4Xx0o.js";
function WaveDivider() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-10 overflow-hidden", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 1200 48",
      preserveAspectRatio: "none",
      className: "absolute inset-0 w-full h-full",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M0,24 C200,48 400,0 600,24 C800,48 1000,0 1200,24 L1200,48 L0,48 Z",
            className: "fill-muted/30"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M0,32 C150,48 350,16 600,32 C850,48 1050,16 1200,32 L1200,48 L0,48 Z",
            className: "fill-border/40"
          }
        )
      ]
    }
  ) });
}
function TropicalHeader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-card border-b border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/assets/generated/beach-hero.dim_1200x600.jpg",
          alt: "",
          className: "w-full h-full object-cover opacity-35"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0",
          style: {
            background: "linear-gradient(to right, oklch(0.96 0.01 55) 0%, oklch(0.96 0.01 55 / 0.75) 60%, transparent 100%)"
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 scanlines opacity-10 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative px-6 py-10 md:py-14 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -24 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.55, ease: "easeOut" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary text-xs font-mono uppercase tracking-[0.2em] mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-4 h-px bg-primary" }),
            "Now Broadcasting"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold text-foreground leading-tight", children: "Beach Waves FM" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 text-sm md:text-base max-w-md leading-relaxed", children: "Hand-curated tropical radio channels from the golden era of beach culture. Pick a vibe, press play." })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute bottom-3 right-4 text-2xl md:text-3xl opacity-25 select-none hidden sm:block tracking-wide",
        "aria-hidden": "true",
        children: "🌴🌊🌴🌊🌴"
      }
    )
  ] });
}
function ChannelCard({ channel, index }) {
  const { data: tracks = [] } = useTracks(channel.id);
  const { playTrack } = usePlayer();
  const navigate = useNavigate();
  function handlePlay() {
    if (tracks.length > 0) {
      playTrack(tracks[0], channel);
      navigate({ to: "/player" });
    }
  }
  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePlay();
    }
  }
  const hasCover = Boolean(channel.coverImageUrl);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      initial: { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.07, duration: 0.4, ease: "easeOut" },
      "data-ocid": `channels.item.${index + 1}`,
      "aria-label": `Play ${channel.name}`,
      className: "group relative overflow-hidden rounded-xl bg-card border border-border cursor-pointer w-full text-left\n        shadow-sm hover:shadow-lg hover:-translate-y-1 transition-smooth\n        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      onClick: handlePlay,
      onKeyDown: handleKeyDown,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video overflow-hidden", children: [
          hasCover ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: channel.coverImageUrl,
              alt: channel.name,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full gradient-tropical", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "scanlines absolute inset-0 opacity-20 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full gradient-tropical flex items-center justify-center shadow-lg ring-2 ring-primary-foreground/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "size-6 text-primary-foreground fill-current ml-0.5" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/90 text-primary-foreground text-xs font-mono uppercase tracking-wide border-0 px-2", children: channel.mood }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-card-foreground group-hover:text-primary transition-colors duration-200 truncate", children: channel.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed", children: channel.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-3 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "size-3 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              channel.trackIds.length,
              " track",
              channel.trackIds.length !== 1 ? "s" : ""
            ] })
          ] })
        ] })
      ]
    }
  );
}
const SKELETON_IDS = [
  "sk-a",
  "sk-b",
  "sk-c",
  "sk-d",
  "sk-e",
  "sk-f",
  "sk-g",
  "sk-h"
];
function ChannelSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl overflow-hidden border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-video w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3" })
    ] })
  ] });
}
function ChannelsPage() {
  const { data: channels = [], isLoading } = useChannels();
  const [filter, setFilter] = reactExports.useState("All");
  const moods = ["All", ...Array.from(new Set(channels.map((c) => c.mood)))];
  const filtered = filter === "All" ? channels : channels.filter((c) => c.mood === filter);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-full", "data-ocid": "channels.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TropicalHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WaveDivider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-6 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none border-b border-border bg-muted/20",
        "data-ocid": "channels.filter_bar",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground uppercase tracking-widest mr-1 flex-shrink-0", children: "Vibe:" }),
          moods.map((mood) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `channels.filter.${mood.toLowerCase()}`,
              onClick: () => setFilter(mood),
              className: [
                "px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wide whitespace-nowrap transition-smooth border flex-shrink-0",
                filter === mood ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              ].join(" "),
              children: mood
            },
            mood
          ))
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35 },
          className: "flex items-center gap-3 mb-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", "aria-hidden": "true", children: "🌴" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: filter === "All" ? "All Channels" : `${filter} Channels` }),
            !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-full", children: filtered.length })
          ]
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
          "data-ocid": "channels.loading_state",
          children: SKELETON_IDS.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(ChannelSkeleton, {}, id))
        }
      ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 text-center",
          "data-ocid": "channels.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", "aria-hidden": "true", children: "🏖️" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground", children: "No channels found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-sm", children: "Try a different vibe filter" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5", children: filtered.map((channel, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ChannelCard, { channel, index: i }, channel.id)) })
    ] })
  ] });
}
export {
  ChannelsPage as default
};
