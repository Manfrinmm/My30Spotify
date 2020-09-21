import React, { Component } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import Loading from "../../components/Loading";
import { Creators as PlaylistsActions } from "../../store/ducks/playlists";
import { Container, Title, List, Playlist } from "./styles";

class browse extends Component {
  componentDidMount() {
    const { getPlaylistRequest } = this.props;

    getPlaylistRequest();
  }

  render() {
    const { loading, data: playlists } = this.props.playlists;

    return (
      <Container>
        <Title>Navegar {loading && <Loading />}</Title>

        <List>
          {playlists.map(playlist => (
            <Playlist key={playlist.id} to={`/playlists/${playlist.id}`}>
              <img src={playlist.thumbnail} alt={playlist.title} />
              <strong>{playlist.title}</strong>
              <p>{playlist.description}</p>
            </Playlist>
          ))}
        </List>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(PlaylistsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(browse);
