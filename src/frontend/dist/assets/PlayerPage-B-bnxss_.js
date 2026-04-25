import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, u as usePlayer, a as useNavigate, B as Button, R as Radio, H as Heart, b as Pause, P as Play, C as ChevronUp, d as ChevronDown, S as Skeleton } from "./index-DSY_0Yw_.js";
import { B as Badge } from "./badge-DY5XCNnt.js";
import { M as MotionConfigContext, i as isHTMLElement, b as useConstant, P as PresenceContext, c as usePresence, d as useIsomorphicLayoutEffect, L as LayoutGroupContext, u as useChannels, a as useTracks, e as useFavorites, f as useAddFavorite, g as useRemoveFavorite, m as motion } from "./proxy-BHY4Xx0o.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["polygon", { points: "19 20 9 12 19 4 19 20", key: "o2sva" }],
  ["line", { x1: "5", x2: "5", y1: "19", y2: "5", key: "1ocqjk" }]
];
const SkipBack = createLucideIcon("skip-back", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["polygon", { points: "5 4 15 12 5 20 5 4", key: "16p6eg" }],
  ["line", { x1: "19", x2: "19", y1: "5", y2: "19", key: "futhcm" }]
];
const SkipForward = createLucideIcon("skip-forward", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
];
const Volume2 = createLucideIcon("volume-2", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
const MOOD_COLORS = {
  Chill: "bg-secondary/20 text-secondary border-secondary/40",
  Relaxed: "bg-secondary/20 text-secondary border-secondary/40",
  Retro: "bg-accent/20 text-accent border-accent/40",
  Dreamy: "bg-chart-5/20 text-chart-5 border-chart-5/40"
};
function getMoodClass(mood) {
  return MOOD_COLORS[mood] ?? "bg-primary/20 text-primary border-primary/40";
}
function PlayerPage() {
  const { state, dispatch, togglePlay, seek, setVolume, playTrack } = usePlayer();
  const { currentTrack, currentChannel, isPlaying, progress, volume } = state;
  const navigate = useNavigate();
  const { data: channels = [] } = useChannels();
  const { data: tracks = [] } = useTracks((currentChannel == null ? void 0 : currentChannel.id) ?? null);
  const { data: favorites = [] } = useFavorites();
  const addFav = useAddFavorite();
  const removeFav = useRemoveFavorite();
  const [queueOpen, setQueueOpen] = reactExports.useState(true);
  const isFav = currentTrack ? favorites.some((f) => f.id === currentTrack.id) || state.favorites.some((f) => f.id === currentTrack.id) : false;
  const currentIndex = tracks.findIndex((t) => t.id === (currentTrack == null ? void 0 : currentTrack.id));
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[70vh] px-6 text-center",
        style: {
          background: "linear-gradient(160deg, oklch(0.18 0.05 260) 0%, oklch(0.14 0.04 220) 40%, oklch(0.16 0.06 185) 70%, oklch(0.12 0.03 260) 100%)"
        },
        "data-ocid": "player.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.5 },
            className: "flex flex-col items-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-8xl mb-6 select-none drop-shadow-lg", children: "🌴" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-3", children: "Nothing playing" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 max-w-xs text-base", children: "Head to Channels and pick something groovy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  onClick: () => navigate({ to: "/" }),
                  className: "btn-tropical gradient-tropical text-card border-0 px-8 py-3 text-base",
                  "data-ocid": "player.browse_channels_button",
                  children: "Browse Channels"
                }
              )
            ]
          }
        )
      }
    );
  }
  const currentTime = progress * currentTrack.duration;
  const totalTime = currentTrack.duration;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-full relative",
      style: {
        background: "linear-gradient(160deg, oklch(0.18 0.05 260) 0%, oklch(0.14 0.04 220) 30%, oklch(0.16 0.06 185) 60%, oklch(0.20 0.08 55) 80%, oklch(0.18 0.07 15) 100%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative z-10 flex items-center justify-between px-6 py-3 border-b",
            style: { borderColor: "oklch(0.35 0.04 260 / 0.6)" },
            "data-ocid": "player.channel_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center w-7 h-7", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full gradient-tropical opacity-70 animate-pulse" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "relative z-10 size-4 text-card" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-base font-bold text-foreground tracking-wide", children: (currentChannel == null ? void 0 : currentChannel.name) ?? "—" }),
                (currentChannel == null ? void 0 : currentChannel.mood) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs px-2 py-0.5 border ${getMoodClass(currentChannel.mood)}`,
                    "data-ocid": "player.mood_badge",
                    children: currentChannel.mood
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  onClick: toggleFavorite,
                  "aria-label": isFav ? "Remove from favorites" : "Add to favorites",
                  "data-ocid": "player.favorite_button",
                  className: `transition-smooth ${isFav ? "text-accent hover:text-accent/80" : "text-muted-foreground hover:text-accent"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Heart,
                    {
                      className: `size-5 transition-smooth ${isFav ? "fill-current scale-110" : ""}`
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center px-6 pt-10 pb-8 max-w-2xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.88 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              className: "relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden",
              style: {
                boxShadow: isPlaying ? "0 0 40px oklch(0.68 0.18 55 / 0.45), 0 0 80px oklch(0.62 0.19 15 / 0.25), 0 20px 60px rgba(0,0,0,0.6)" : "0 20px 60px rgba(0,0,0,0.6)",
                transition: "box-shadow 0.8s ease"
              },
              "data-ocid": "player.album_art",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: currentTrack.albumArtUrl || "/assets/generated/beach-hero.dim_1200x600.jpg",
                    alt: `${currentTrack.album} cover art`,
                    className: "w-full h-full object-cover"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-0 pointer-events-none",
                    "aria-hidden": "true",
                    style: {
                      background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-0 pointer-events-none rounded-2xl",
                    "aria-hidden": "true",
                    style: {
                      background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.45) 100%)"
                    }
                  }
                ),
                isPlaying && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-0 rounded-2xl pointer-events-none",
                    style: {
                      boxShadow: "inset 0 0 0 2px oklch(0.78 0.16 55 / 0.5)"
                    }
                  }
                )
              ]
            },
            currentTrack.id
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4, delay: 0.1 },
              className: "mt-8 text-center w-full",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "font-display text-2xl md:text-3xl font-bold text-foreground leading-tight",
                    "data-ocid": "player.track_title",
                    children: currentTrack.title
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-base text-muted-foreground mt-1",
                    "data-ocid": "player.track_artist",
                    children: currentTrack.artist
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm mt-0.5",
                    style: { color: "oklch(0.6 0.06 185)" },
                    children: currentTrack.album
                  }
                )
              ]
            },
            `info-${currentTrack.id}`
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 w-full space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative h-2 rounded-full cursor-pointer group",
                style: { background: "oklch(0.28 0.02 260)" },
                onClick: (e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  seek((e.clientX - rect.left) / rect.width);
                },
                onKeyDown: (e) => {
                  if (e.key === "ArrowRight") seek(Math.min(1, progress + 0.05));
                  if (e.key === "ArrowLeft") seek(Math.max(0, progress - 0.05));
                },
                role: "slider",
                "aria-label": "Seek progress",
                "aria-valuenow": Math.round(progress * 100),
                "aria-valuemin": 0,
                "aria-valuemax": 100,
                tabIndex: 0,
                "data-ocid": "player.seek_bar",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full gradient-tropical rounded-full transition-all duration-200",
                      style: { width: `${progress * 100}%` }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-md opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity",
                      style: { left: `calc(${progress * 100}% - 8px)` }
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground font-mono tabular-nums", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatTime(currentTime) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatTime(totalTime) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4 mt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                onClick: playPrev,
                "aria-label": "Previous track",
                "data-ocid": "player.prev_button",
                className: "w-11 h-11 rounded-full text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-smooth",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkipBack, { className: "size-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                type: "button",
                whileTap: { scale: 0.93 },
                whileHover: { scale: 1.05 },
                onClick: togglePlay,
                "aria-label": isPlaying ? "Pause" : "Play",
                "data-ocid": "player.play_button",
                className: "relative w-18 h-18 flex items-center justify-center rounded-full",
                style: {
                  width: "4.5rem",
                  height: "4.5rem",
                  background: "linear-gradient(135deg, oklch(0.78 0.16 55), oklch(0.68 0.22 15))",
                  boxShadow: isPlaying ? "0 0 24px oklch(0.78 0.16 55 / 0.6), 0 4px 16px rgba(0,0,0,0.4)" : "0 4px 16px rgba(0,0,0,0.4)",
                  transition: "box-shadow 0.4s ease"
                },
                children: [
                  isPlaying && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "absolute inset-0 rounded-full animate-ping",
                      style: { background: "oklch(0.78 0.16 55 / 0.3)" },
                      "aria-hidden": "true"
                    }
                  ),
                  isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "size-6 text-card fill-current relative z-10" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "size-6 text-card fill-current relative z-10 ml-0.5" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                onClick: playNext,
                "aria-label": "Next track",
                "data-ocid": "player.next_button",
                className: "w-11 h-11 rounded-full text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-smooth",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { className: "size-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "size-4 text-muted-foreground flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "range",
                min: 0,
                max: 1,
                step: 0.01,
                value: volume,
                onChange: (e) => setVolume(Number(e.target.value)),
                "aria-label": "Volume",
                "data-ocid": "player.volume_slider",
                className: "w-32 h-1.5 cursor-pointer",
                style: { accentColor: "oklch(0.78 0.16 55)" }
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "max-w-2xl mx-auto px-6 pb-10",
            "data-ocid": "player.queue_section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-2xl overflow-hidden border",
                style: {
                  background: "oklch(0.16 0.03 260 / 0.8)",
                  borderColor: "oklch(0.30 0.04 260 / 0.6)",
                  backdropFilter: "blur(12px)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setQueueOpen(!queueOpen),
                      className: "w-full flex items-center justify-between px-5 py-4 transition-smooth hover:bg-white/5",
                      "data-ocid": "player.queue_toggle",
                      "aria-expanded": queueOpen,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-base font-bold text-foreground", children: "Queue" }),
                          currentChannel && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "text-xs font-medium px-2 py-0.5 rounded-full border",
                              style: {
                                background: "oklch(0.72 0.15 185 / 0.15)",
                                color: "oklch(0.72 0.15 185)",
                                borderColor: "oklch(0.72 0.15 185 / 0.35)"
                              },
                              children: currentChannel.name
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                            tracks.length,
                            " tracks"
                          ] })
                        ] }),
                        queueOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "size-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-4 text-muted-foreground" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: queueOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { height: 0, opacity: 0 },
                      animate: { height: "auto", opacity: 1 },
                      exit: { height: 0, opacity: 0 },
                      transition: { duration: 0.3, ease: "easeInOut" },
                      style: { overflow: "hidden" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "border-t",
                          style: { borderColor: "oklch(0.30 0.04 260 / 0.6)" },
                          children: tracks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 p-4", children: ["a", "b", "c", "d"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Skeleton,
                            {
                              className: "h-13 rounded-lg",
                              style: {
                                background: "oklch(0.22 0.02 260 / 0.6)"
                              }
                            },
                            id
                          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "divide-y",
                              style: { borderColor: "oklch(0.24 0.03 260 / 0.4)" },
                              "data-ocid": "player.tracklist",
                              children: tracks.map((track, i) => {
                                const isActive = track.id === (currentTrack == null ? void 0 : currentTrack.id);
                                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "button",
                                  {
                                    type: "button",
                                    "data-ocid": `player.track.${i + 1}`,
                                    onClick: () => currentChannel && playTrack(track, currentChannel),
                                    className: [
                                      "w-full flex items-center gap-4 px-5 py-3.5 text-left transition-smooth",
                                      isActive ? "bg-primary/10" : "hover:bg-white/5"
                                    ].join(" "),
                                    children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          className: "w-6 text-xs font-mono text-center flex-shrink-0",
                                          style: {
                                            color: isActive ? "oklch(0.78 0.16 55)" : "oklch(0.5 0.01 260)"
                                          },
                                          children: isActive && isPlaying ? "▶" : i + 1
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "img",
                                        {
                                          src: track.albumArtUrl || "/assets/generated/beach-hero.dim_1200x600.jpg",
                                          alt: track.album,
                                          className: "w-full h-full object-cover"
                                        }
                                      ) }),
                                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "p",
                                          {
                                            className: `text-sm font-medium truncate ${isActive ? "font-display" : "text-foreground"}`,
                                            style: isActive ? { color: "oklch(0.85 0.14 55)" } : {},
                                            children: track.title
                                          }
                                        ),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: track.artist })
                                      ] }),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          className: "text-xs font-mono tabular-nums flex-shrink-0",
                                          style: { color: "oklch(0.5 0.01 260)" },
                                          children: formatTime(track.duration)
                                        }
                                      )
                                    ]
                                  },
                                  track.id
                                );
                              })
                            }
                          )
                        }
                      )
                    },
                    "queue"
                  ) })
                ]
              }
            )
          }
        ),
        channels.filter((c) => c.id !== (currentChannel == null ? void 0 : currentChannel.id)).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "border-t px-6 py-8",
            style: {
              background: "oklch(0.14 0.03 260 / 0.7)",
              borderColor: "oklch(0.28 0.04 260 / 0.5)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-bold text-foreground mb-4", children: "More Channels" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto pb-2 scrollbar-none", children: channels.filter((c) => c.id !== (currentChannel == null ? void 0 : currentChannel.id)).map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `player.channel_switch.${ch.id}`,
                  onClick: () => navigate({ to: "/" }),
                  className: "flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-foreground transition-smooth hover:bg-primary/10",
                  style: {
                    background: "oklch(0.20 0.03 260 / 0.8)",
                    border: "1px solid oklch(0.32 0.04 260 / 0.6)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "📻" }),
                    ch.name
                  ]
                },
                ch.id
              )) })
            ] })
          }
        )
      ]
    }
  );
}
export {
  PlayerPage as default
};
