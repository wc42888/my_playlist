import { createSelector } from 'reselect';

const getAllTracksById = (state) => state.getIn(['entities', 'track', 'byId']);
const trackIdsForPlaylist = (state, trackIds) => trackIds;

export const getAllTracksForPlaylist = () =>
  createSelector(
    [getAllTracksById, trackIdsForPlaylist],
    (trackById, trackIds) => trackIds.map((id) => trackById.get(id)),
  );
