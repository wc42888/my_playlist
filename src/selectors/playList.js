import { createSelector } from 'reselect';

const getAllUserPlaylistById = (state) => state.entities.playList.byId;
const getAllUserplaylistAllIds = (state) => state.entities.playList.allIds;

export const getAllUserPlaylist = createSelector(
  [getAllUserPlaylistById, getAllUserplaylistAllIds],
  (userPlaylistById, playlistIds) =>
    playlistIds.map((id) => userPlaylistById[id]),
);
