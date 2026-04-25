import { createActor } from "@/backend";
import type { Channel, Track } from "@/types/music";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// --- Sample data for demo when backend has no data ---
const SAMPLE_CHANNELS: Channel[] = [
  {
    id: 1,
    name: "Sunset Grooves",
    description: "Smooth beats for golden hour vibes",
    mood: "Chill",
    coverImageUrl: "/assets/generated/beach-hero.dim_1200x600.jpg",
    trackIds: [1, 2, 3],
  },
  {
    id: 2,
    name: "Poolside Chill",
    description: "Tropical house for the poolside",
    mood: "Relaxed",
    coverImageUrl: "/assets/generated/beach-hero.dim_1200x600.jpg",
    trackIds: [4, 5],
  },
  {
    id: 3,
    name: "Retro Riviera",
    description: "80s classics from the French Riviera",
    mood: "Retro",
    coverImageUrl: "/assets/generated/beach-hero.dim_1200x600.jpg",
    trackIds: [6, 7],
  },
  {
    id: 4,
    name: "Ocean Drive",
    description: "Late night cruising along the coast",
    mood: "Dreamy",
    coverImageUrl: "/assets/generated/beach-hero.dim_1200x600.jpg",
    trackIds: [8, 9],
  },
];

const SAMPLE_TRACKS: Track[] = [
  {
    id: 1,
    title: "Neon Palm",
    artist: "Solar Drift",
    album: "Coastal Dreams",
    duration: 240,
    audioUrl: "",
    albumArtUrl: "/assets/generated/beach-hero.dim_1200x600.jpg",
    channelId: 1,
  },
  {
    id: 2,
    title: "Hibiscus Highway",
    artist: "The Coral Keys",
    album: "Summer Static",
    duration: 198,
    audioUrl: "",
    albumArtUrl: "/assets/generated/beach-hero.dim_1200x600.jpg",
    channelId: 1,
  },
  {
    id: 3,
    title: "Tide Runner",
    artist: "Wavefront",
    album: "Coastal Dreams",
    duration: 215,
    audioUrl: "",
    albumArtUrl: "/assets/generated/beach-hero.dim_1200x600.jpg",
    channelId: 1,
  },
  {
    id: 4,
    title: "Aquamarine Haze",
    artist: "DJ Pelican",
    album: "Pool Sessions Vol.1",
    duration: 312,
    audioUrl: "",
    albumArtUrl: "/assets/generated/beach-hero.dim_1200x600.jpg",
    channelId: 2,
  },
  {
    id: 5,
    title: "Coconut Wireless",
    artist: "Breeze Collective",
    album: "Pool Sessions Vol.1",
    duration: 275,
    audioUrl: "",
    albumArtUrl: "/assets/generated/beach-hero.dim_1200x600.jpg",
    channelId: 2,
  },
  {
    id: 6,
    title: "Riviera Nights",
    artist: "Le Yacht Club",
    album: "Côte d'Azur",
    duration: 188,
    audioUrl: "",
    albumArtUrl: "/assets/generated/beach-hero.dim_1200x600.jpg",
    channelId: 3,
  },
  {
    id: 7,
    title: "Monaco Dreamin'",
    artist: "Giselle Fontaine",
    album: "Côte d'Azur",
    duration: 204,
    audioUrl: "",
    albumArtUrl: "/assets/generated/beach-hero.dim_1200x600.jpg",
    channelId: 3,
  },
  {
    id: 8,
    title: "Ocean Drive After Dark",
    artist: "Vaporwave Visionaries",
    album: "Midnight Cruise",
    duration: 333,
    audioUrl: "",
    albumArtUrl: "/assets/generated/beach-hero.dim_1200x600.jpg",
    channelId: 4,
  },
  {
    id: 9,
    title: "Flamingo Boulevard",
    artist: "Miami Glitch",
    album: "Midnight Cruise",
    duration: 251,
    audioUrl: "",
    albumArtUrl: "/assets/generated/beach-hero.dim_1200x600.jpg",
    channelId: 4,
  },
];

function mergeWithSample<T extends { id: number }>(
  backendData: T[],
  sample: T[],
): T[] {
  if (backendData.length > 0) return backendData;
  return sample;
}

function bigintToNumber(val: bigint | number): number {
  return typeof val === "bigint" ? Number(val) : val;
}

export function useChannels() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Channel[]>({
    queryKey: ["channels"],
    queryFn: async () => {
      if (!actor) return SAMPLE_CHANNELS;
      try {
        const raw = await (
          actor as unknown as { getChannels: () => Promise<unknown[]> }
        ).getChannels();
        const mapped = (
          raw as Array<{
            id: bigint | number;
            name: string;
            description: string;
            mood: string;
            coverImageUrl: string;
            trackIds: Array<bigint | number>;
          }>
        ).map((c) => ({
          id: bigintToNumber(c.id),
          name: c.name,
          description: c.description,
          mood: c.mood,
          coverImageUrl: c.coverImageUrl,
          trackIds: c.trackIds.map(bigintToNumber),
        }));
        return mergeWithSample(mapped, SAMPLE_CHANNELS);
      } catch {
        return SAMPLE_CHANNELS;
      }
    },
    enabled: !isFetching,
  });
}

export function useTracks(channelId: number | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Track[]>({
    queryKey: ["tracks", channelId],
    queryFn: async () => {
      if (!actor || channelId === null) {
        return SAMPLE_TRACKS.filter((t) => t.channelId === (channelId ?? 1));
      }
      try {
        const raw = await (
          actor as unknown as { getTracks: (id: bigint) => Promise<unknown[]> }
        ).getTracks(BigInt(channelId));
        const mapped = (
          raw as Array<{
            id: bigint | number;
            title: string;
            artist: string;
            album: string;
            duration: bigint | number;
            audioUrl: string;
            albumArtUrl: string;
            channelId: bigint | number;
          }>
        ).map((t) => ({
          id: bigintToNumber(t.id),
          title: t.title,
          artist: t.artist,
          album: t.album,
          duration: bigintToNumber(t.duration),
          audioUrl: t.audioUrl,
          albumArtUrl: t.albumArtUrl,
          channelId: bigintToNumber(t.channelId),
        }));
        const sampleForChannel = SAMPLE_TRACKS.filter(
          (t) => t.channelId === channelId,
        );
        return mergeWithSample(mapped, sampleForChannel);
      } catch {
        return SAMPLE_TRACKS.filter((t) => t.channelId === channelId);
      }
    },
    enabled: !isFetching,
  });
}

export function useFavorites() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Track[]>({
    queryKey: ["favorites"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const raw = await (
          actor as unknown as { getFavorites: () => Promise<unknown[]> }
        ).getFavorites();
        return (
          raw as Array<{
            id: bigint | number;
            title: string;
            artist: string;
            album: string;
            duration: bigint | number;
            audioUrl: string;
            albumArtUrl: string;
            channelId: bigint | number;
          }>
        ).map((t) => ({
          id: bigintToNumber(t.id),
          title: t.title,
          artist: t.artist,
          album: t.album,
          duration: bigintToNumber(t.duration),
          audioUrl: t.audioUrl,
          albumArtUrl: t.albumArtUrl,
          channelId: bigintToNumber(t.channelId),
        }));
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
  });
}

export function useAddFavorite() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (trackId: number) => {
      if (!actor) return;
      await (
        actor as unknown as { addFavorite: (id: bigint) => Promise<void> }
      ).addFavorite(BigInt(trackId));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["favorites"] }),
  });
}

export function useRemoveFavorite() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (trackId: number) => {
      if (!actor) return;
      await (
        actor as unknown as { removeFavorite: (id: bigint) => Promise<void> }
      ).removeFavorite(BigInt(trackId));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["favorites"] }),
  });
}
