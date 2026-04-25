export interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  audioUrl: string;
  albumArtUrl: string;
  channelId: number;
}

export interface Channel {
  id: number;
  name: string;
  description: string;
  mood: string;
  coverImageUrl: string;
  trackIds: number[];
}

export interface PlayerState {
  currentTrack: Track | null;
  currentChannel: Channel | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  favorites: Track[];
}

export type PlayerAction =
  | { type: "SET_TRACK"; track: Track; channel: Channel }
  | { type: "TOGGLE_PLAY" }
  | { type: "SET_PLAYING"; playing: boolean }
  | { type: "SET_PROGRESS"; progress: number }
  | { type: "SET_VOLUME"; volume: number }
  | { type: "ADD_FAVORITE"; track: Track }
  | { type: "REMOVE_FAVORITE"; trackId: number }
  | { type: "SET_FAVORITES"; favorites: Track[] }
  | { type: "STOP" };
