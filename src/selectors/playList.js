import { createSelector } from 'reselect';

const getAllUserPlaylistById = (state) =>
  state.getIn(['entities', 'playList', 'byId']);
const getAllUserplaylistAllIds = (state) =>
  state.getIn(['entities', 'playList', 'allIds']);

export const getAllUserPlaylist = createSelector(
  [getAllUserPlaylistById, getAllUserplaylistAllIds],
  (userPlaylistById, playlistIds) =>
    playlistIds.map((id) => userPlaylistById.get(id)),
);
