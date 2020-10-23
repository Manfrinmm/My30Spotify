import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../components/Loading";
import { IState } from "../../store";
import {
  Creators as PlaylistsActions,
  IPlaylist,
} from "../../store/ducks/playlists";
import { Container, Title, List, Playlist } from "./styles";

const Browse: React.FC = () => {
  const playlists = useSelector<IState, IPlaylist[]>(
    state => state.playlists.data,
  );

  const loading = useSelector<IState, boolean>(
    state => state.playlists.loading,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(PlaylistsActions.getPlaylistRequest());
  }, [dispatch]);

  return (
    <Container>
      <Title>Navegar {loading && <Loading />}</Title>

      <List>
        {playlists.map(playlist => (
          <Playlist key={playlist.id} to={`/playlists/${playlist.id}`}>
            <img src={playlist.thumbnail} alt={playlist.name} />
            <strong>{playlist.name}</strong>

            <p>
              {
                new DOMParser().parseFromString(
                  playlist.description,
                  "text/html",
                ).body.innerText
              }
            </p>
          </Playlist>
        ))}
      </List>
    </Container>
  );
};

export default Browse;
