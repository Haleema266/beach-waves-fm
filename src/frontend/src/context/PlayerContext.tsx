import type { Channel, PlayerAction, PlayerState, Track } from "@/types/music";
import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";

interface PlayerContextValue {
  state: PlayerState;
  dispatch: React.Dispatch<PlayerAction>;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  playTrack: (track: Track, channel: Channel) => void;
  togglePlay: () => void;
  stopPlayback: () => void;
  seek: (progress: number) => void;
  setVolume: (volume: number) => void;
}

export const PlayerContext = createContext<PlayerContextValue | null>(null);

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case "SET_TRACK":
      return {
        ...state,
        currentTrack: action.track,
        currentChannel: action.channel,
        isPlaying: true,
        progress: 0,
      };
    case "TOGGLE_PLAY":
      return { ...state, isPlaying: !state.isPlaying };
    case "SET_PLAYING":
      return { ...state, isPlaying: action.playing };
    case "SET_PROGRESS":
      return { ...state, progress: action.progress };
    case "SET_VOLUME":
      return { ...state, volume: action.volume };
    case "ADD_FAVORITE":
      if (state.favorites.find((f) => f.id === action.track.id)) return state;
      return { ...state, favorites: [...state.favorites, action.track] };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((f) => f.id !== action.trackId),
      };
    case "SET_FAVORITES":
      return { ...state, favorites: action.favorites };
    case "STOP":
      return { ...state, isPlaying: false, currentTrack: null, progress: 0 };
    default:
      return state;
  }
}

const initialState: PlayerState = {
  currentTrack: null,
  currentChannel: null,
  isPlaying: false,
  progress: 0,
  volume: 0.8,
  favorites: [],
};

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = initialState.volume;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleTimeUpdate = () => {
      if (audio.duration) {
        dispatch({
          type: "SET_PROGRESS",
          progress: audio.currentTime / audio.duration,
        });
      }
    };
    const handleEnded = () => dispatch({ type: "SET_PLAYING", playing: false });
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (state.isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [state.isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = state.volume;
  }, [state.volume]);

  const playTrack = useCallback((track: Track, channel: Channel) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (track.audioUrl) {
      audio.src = track.audioUrl;
      audio.load();
    }
    dispatch({ type: "SET_TRACK", track, channel });
    audio.play().catch(() => {});
  }, []);

  const togglePlay = useCallback(() => {
    dispatch({ type: "TOGGLE_PLAY" });
  }, []);

  const stopPlayback = useCallback(() => {
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    dispatch({ type: "STOP" });
  }, []);

  const seek = useCallback((progress: number) => {
    const audio = audioRef.current;
    if (audio?.duration) {
      audio.currentTime = progress * audio.duration;
    }
    dispatch({ type: "SET_PROGRESS", progress });
  }, []);

  const setVolume = useCallback((volume: number) => {
    dispatch({ type: "SET_VOLUME", volume });
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        state,
        dispatch,
        audioRef,
        playTrack,
        togglePlay,
        stopPlayback,
        seek,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
