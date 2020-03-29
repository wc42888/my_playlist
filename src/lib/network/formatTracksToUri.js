const formatTracksToUri = (tracks) =>
  tracks.map((track) => `spotify:track:${track.id}`);

export default formatTracksToUri;
