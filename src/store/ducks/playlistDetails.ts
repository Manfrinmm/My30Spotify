export const Types = {
  GET_REQUEST: "playlistsDetails/GET_REQUEST",
  GET_SUCCESS: "playlistsDetails/GET_SUCCESS",
};

export interface ITrack {
  id: string;
  thumbnail: string;
  name: string;
  artists: string[];
  preview_url: string;
  album: string;
}

export interface IPlaylistDetails {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  tracks: ITrack[];
  total: number;
}

export interface IPlaylistsDetailsState {
  data: IPlaylistDetails;
  loading: boolean;
}

const INITIAL_STATE: IPlaylistsDetailsState = {
  data: {} as IPlaylistDetails,
  loading: false,
};

export default function playlistsDetails(
  state = INITIAL_STATE,
  action: any,
): any {
  switch (action.type) {
    case Types.GET_REQUEST:
      return { ...state, loading: true };
    case Types.GET_SUCCESS:
      return { ...state, loading: false, data: action.payload.data };

    default:
      return state;
  }
}

export const Creators = {
  getPlaylistDetailsRequest: (id: string): any => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),

  getPlaylistDetailsSuccess: (data: IPlaylistDetails): any => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
};
