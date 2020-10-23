import { call, put } from "redux-saga/effects";

import api from "../../services/api";
import { Creators as ErrorAactions } from "../ducks/error";
import {
  Creators as PlaylistsDetailsAction,
  IPlaylistDetails,
} from "../ducks/playlistDetails";

export function* getPlaylistDetails(action: any) {
  try {
    const { data } = yield call(api.get, `/playlists/${action.payload.id}`);

    console.log(data);

    const playlist = {
      id: data,
      name: data.name,
      description: data.description,
      thumbnail: data.images[0].url,
      tracks: data.tracks.items.map((item: any) => ({
        id: item.track.id,
        thumbnail: item.track.album.images[0].url,
        name: item.track.name,
        artists: item.track.artists.map((artist: any) => artist.name),
        preview_url: item.track.preview_url,
        album: item.track.album.name,
      })),
      total: data.tracks.total,
    };

    yield put(PlaylistsDetailsAction.getPlaylistDetailsSuccess(playlist));
  } catch (error) {
    yield put(
      ErrorAactions.setError("Não foi possível obter os detalhes da playlist"),
    );
  }
}
