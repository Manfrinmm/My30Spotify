import { call, put } from "redux-saga/effects";

import api from "../../services/api";
import { Creators as ErrorActions } from "../ducks/error";
import { Creators as PlaylistsAction } from "../ducks/playlists";

export function* getPlaylists() {
  try {
    const response = yield call(api.get, "/me/playlists", {
      params: {
        limit: 50,
      },
    });

    const data = response.data.items.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      href: item.href,
      thumbnail: item.images[0].url,
      tracks: item.tracks,
    }));

    yield put(PlaylistsAction.getPlaylistSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(ErrorActions.setError("Não foi possível obter as playlists"));
  }
}
