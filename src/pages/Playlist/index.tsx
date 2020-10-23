import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ClockIcon from "../../assets/images/clock.svg";
import PlusIcon from "../../assets/images/plus.svg";
import Loading from "../../components/Loading";
import { IState } from "../../store";
import { Creators as PlayerActions } from "../../store/ducks/player.js";
import {
  Creators as PlaylistDetailsActions,
  IPlaylistDetails,
} from "../../store/ducks/playlistDetails";
import {
  Container,
  LoadingContainer,
  Header,
  SongList,
  SongItem,
} from "./styles";

interface IRouteParams {
  id: string;
}

const Playlist: React.FC = () => {
  const [selectedSongId, setSelectedSongId] = useState<string>();

  const routeParams = useParams();

  const { id } = routeParams as IRouteParams;

  const loading = useSelector<IState, boolean>(
    state => state.playlistDetails.loading,
  );

  const playlist = useSelector<IState, IPlaylistDetails>(
    state => state.playlistDetails.data,
  );

  const currentSong = useSelector<IState>(state => state.playlistDetails.data);

  const dispatch = useDispatch();

  const loadPlaylistDetails = useCallback(() => {
    dispatch(PlaylistDetailsActions.getPlaylistDetailsRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
    loadPlaylistDetails();
  }, [loadPlaylistDetails]);

  const renderDetails = useCallback(() => {
    return (
      <Container>
        <Header>
          <img src={playlist.thumbnail} alt={playlist.name} />
          <div>
            <span>PLAYLIST</span>
            <h1>{playlist.name}</h1>
            {
              new DOMParser().parseFromString(playlist.description, "text/html")
                .body.innerText
            }
            {!!playlist && <p>{playlist.total} músicas</p>}

            <button
              type="button"
              onClick={() => {
                dispatch(
                  PlayerActions.loadSong(playlist.tracks[0], playlist.tracks),
                );
              }}
            >
              PLAY
            </button>
          </div>
        </Header>
        <SongList cellPadding={0} cellSpacing={0}>
          <thead>
            <tr>
              <th> </th>
              <th>Título</th>
              <th>Artista</th>
              <th>Álbum</th>
              <th>
                <img src={ClockIcon} alt="Duração" />
              </th>
            </tr>
          </thead>

          <tbody>
            {!playlist.tracks ? (
              <tr>
                <td colSpan={5}>Nenhuma música cadastrada</td>
              </tr>
            ) : (
              playlist.tracks.map(song => (
                <SongItem
                  key={song.id}
                  onClick={() => setSelectedSongId(song.id)}
                  onDoubleClick={() => {
                    dispatch(PlayerActions.loadSong(song, playlist.tracks));
                  }}
                  selected={selectedSongId === song.id}
                  playing={currentSong && currentSong.id === song.id}
                >
                  <td>
                    <img src={PlusIcon} alt="Adicionar" />
                  </td>
                  <td>{song.name}</td>
                  <td>{song.artists.join(", ")}</td>
                  <td>{song.album}</td>
                  <td>0:30</td>
                </SongItem>
              ))
            )}
          </tbody>
        </SongList>
      </Container>
    );
  }, [playlist, selectedSongId, currentSong, dispatch]);

  console.log(currentSong);

  return loading ? (
    <LoadingContainer>
      <Loading />
    </LoadingContainer>
  ) : (
    renderDetails()
  );
};

// const mapStateToProps = state => ({
//   playlistDetails: state.playlistDetails,
//   currentSong: state.player.currentSong,
// });

// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ ...PlaylistDetailsActions, ...PlayerActions }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
export default Playlist;
