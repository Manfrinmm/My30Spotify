export const Types = {
  GET_REQUEST: "playlists/GET_REQUEST",
  GET_SUCCESS: "playlists/GET_SUCCESS",
};

export interface IPlaylist {
  id: string;
  name: string;
  description: string;
  href: string;
  thumbnail: string;
  tracks: string;
}

export interface IPlaylistsState {
  data: IPlaylist[];
  loading: boolean;
}

// id: "2fS5bR8G8wlqt73xndQOGn",
// name: "Bass Music 2020",
// description: "Heavy Electronic Bass Music for crusing in your car, gaming or getting ready for the club. Including the latest trending Brazilian Bass, G House, Bass House, Electrónica. Follow the playlist and follow us on Instagram: <a href="https://instagram.com/clapmode">@clapmode</a>",
// href: "https://api.spotify.com/v1/playlists/2fS5bR8G8wlqt73xndQOGn",
// images: [{…}],
// tracks: {href: "https://api.spotify.com/v1/playlists/2fS5bR8G8wlqt73xndQOGn/tracks", total: 216},

const INITIAL_STATE: IPlaylistsState = {
  data: [],
  loading: false,
};

export default function Playlists(state = INITIAL_STATE, action: any): any {
  switch (action.type) {
    case "playlists/GET_REQUEST":
      return { ...state, loading: true };
    case Types.GET_SUCCESS:
      return { ...state, loading: false, data: action.payload.data };

    default:
      return state;
  }
}

export const Creators = {
  getPlaylistRequest: (): any => ({ type: Types.GET_REQUEST }),

  getPlaylistSuccess: (data: IPlaylist[]): any => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
};
