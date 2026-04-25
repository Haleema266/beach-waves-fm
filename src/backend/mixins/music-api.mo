import Debug "mo:core/Debug";
import List "mo:core/List";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Types "../types/music";

mixin (
  channels : List.List<Types.Channel>,
  tracks : List.List<Types.Track>,
  favorites : Map.Map<Principal, Set.Set<Types.TrackId>>,
) {

  // --- Channel Discovery ---

  public query func listChannels() : async [Types.Channel] {
    Debug.todo();
  };

  public query func getChannel(id : Types.ChannelId) : async ?Types.Channel {
    Debug.todo();
  };

  // --- Tracks ---

  public query func getTracksByChannel(channelId : Types.ChannelId) : async [Types.Track] {
    Debug.todo();
  };

  public query func getTrack(id : Types.TrackId) : async ?Types.Track {
    Debug.todo();
  };

  // --- Favorites ---

  public shared ({ caller }) func addFavorite(trackId : Types.TrackId) : async () {
    Debug.todo();
  };

  public shared ({ caller }) func removeFavorite(trackId : Types.TrackId) : async () {
    Debug.todo();
  };

  public shared query ({ caller }) func listFavorites() : async [Types.Track] {
    Debug.todo();
  };
};
