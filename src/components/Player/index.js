import React from "react";
import { connect } from "react-redux";
import Sound from "react-sound";

import Slider from "rc-slider";
import { bindActionCreators } from "redux";

import BackwardIcon from "../../assets/images/backward.svg";
import ForwardIcon from "../../assets/images/forward.svg";
import PauseIcon from "../../assets/images/pause.svg";
import PlayIcon from "../../assets/images/play.svg";
import RepeatIcon from "../../assets/images/repeat.svg";
import ShuffleIcon from "../../assets/images/shuffle.svg";
import VolumeIcon from "../../assets/images/volume.svg";
import { Creators as PlayerActions } from "../../store/ducks/player";
import {
  Container,
  Current,
  Volume,
  Progress,
  Controls,
  Time,
  ProgressSlider,
} from "./styles";

const Player = ({
  player,
  play,
  pause,
  next,
  prev,
  playing,
  position,
  duration,
  handlePosition,
  setPosition,
  positionShown,
  progress,
  setVolume,
}) => (
  <Container>
    {!!player.currentSong && (
      <Sound
        url={player.currentSong.file}
        playStatus={player.status}
        onFinishedPlaying={next}
        onPlaying={playing}
        position={player.position}
        volume={player.volume}
      />
    )}
    <Current>
      {!!player.currentSong && (
        <>
          <img
            src={player.currentSong.thumbnail}
            alt={player.currentSong.title}
          />

          <div>
            <span>{player.currentSong.title}</span>
            <small>{player.currentSong.author}</small>
          </div>
        </>
      )}
    </Current>

    <Progress>
      <Controls>
        <button>
          <img src={ShuffleIcon} />
        </button>
        <button onClick={prev}>
          <img src={BackwardIcon} />
        </button>
        {!!player.currentSong && player.status === Sound.status.PLAYING ? (
          <button onClick={pause}>
            <img src={PauseIcon} alt="pause" />
          </button>
        ) : (
          <button onClick={play}>
            <img src={PlayIcon} alt="play" />
          </button>
        )}

        <button onClick={next}>
          <img src={ForwardIcon} />
        </button>
        <button>
          <img src={RepeatIcon} />
        </button>
      </Controls>

      <Time>
        <span>{positionShown || position}</span>
        <ProgressSlider>
          <Slider
            railStyle={{ background: "#404040", borderRadius: 10 }}
            trackStyle={{ background: "#1ed760" }}
            handleStyle={{ border: 0 }}
            max={1000}
            onChange={value => handlePosition(value / 1000)}
            onAfterChange={value => setPosition(value / 1000)}
            value={progress}
          />
        </ProgressSlider>
        <span>{duration}</span>
      </Time>
    </Progress>
    <Volume>
      <img src={VolumeIcon} alt="Volume" />
      <Slider
        railStyle={{
          background: "#404040",
          borderRadius: 10,
        }}
        trackStyle={{ background: "#fff" }}
        handleStyle={{ display: "none" }}
        value={player.volume}
        onChange={setVolume}
      />
    </Volume>
  </Container>
);

function msToTime(duration) {
  if (!duration) return null;

  let seconds = parseInt((duration / 1000) % 60, 10);
  const minutes = parseInt((duration / 60000) % 60, 10);

  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${seconds}`;
}

const mapStateToProps = state => ({
  player: state.player,
  position: msToTime(state.player.position),
  duration: msToTime(state.player.duration),
  positionShown: msToTime(state.player.positionShown),
  progress:
    parseInt(
      (state.player.positionShown || state.player.position) *
        (1000 / state.player.duration),
      10,
    ) || 0,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(PlayerActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);
