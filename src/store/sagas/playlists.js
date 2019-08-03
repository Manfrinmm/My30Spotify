import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import { Creators as PlaylistsAction } from "../ducks/playlists";
import { Creators as ErrorAactions } from "../ducks/error";

export function* getPlaylists() {
  try {
    const response = yield call(api.get, "/playlists");

    yield put(PlaylistsAction.getPlaylistSuccess(response.data));
  } catch (error) {
    yield put(ErrorAactions.setError("Não foi possível obter as playlists"));
  }
}
