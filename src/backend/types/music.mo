module {
  public type ChannelId = Nat;
  public type TrackId = Nat;

  public type Channel = {
    id : ChannelId;
    name : Text;
    description : Text;
    mood : Text;
    coverImageUrl : Text;
    trackIds : [TrackId];
  };

  public type Track = {
    id : TrackId;
    title : Text;
    artist : Text;
    album : Text;
    duration : Nat; // seconds
    audioUrl : Text;
    albumArtUrl : Text;
    channelId : ChannelId;
  };
};
