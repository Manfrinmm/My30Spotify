import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import { Creators as PlaylistsDetailsAction } from "../ducks/playlistDetails";
import { Creators as ErrorAactions } from "../ducks/error";

export function* getPlaylistDetails(action) {
  try {
    const response = yield call(
      api.get,
      `/playlists/${action.payload.id}?_embed=songs`
    );

    yield put(PlaylistsDetailsAction.getPlaylistDetailsSuccess(response.data));
  } catch (error) {
    yield put(
      ErrorAactions.setError("Não foi possível obter os detalhes da playlist")
    );
  }
}
