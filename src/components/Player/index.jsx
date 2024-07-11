import React, { useEffect, useRef, useState } from 'react';
import { useCurrentSong } from '../../contexts/currentSongContext';
import './player.css';

const Player = ({ onPlayPause, onNext, onPrevious }) => {
  const { currentSong, isPlaying, setIsPlaying } = useCurrentSong();
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seekPercentage, setSeekPercentage] = useState(0);
  const [playerExpanded, setPlayerExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 767);
  };

  useEffect(() => {
    handleResize(); // Check on initial load
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong, setIsPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentSong, isPlaying, setIsPlaying]);

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    setCurrentTime(currentTime);
    const percentage = (currentTime / duration) * 100;
    setSeekPercentage(percentage);
  };

  const handleSeek = (event) => {
    const seekTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
    setSeekPercentage(event.target.value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const backgroundStyle = currentSong
    ? {
      background: `linear-gradient(108.18deg, ${currentSong.accent} 2.46%, #000000 99.84%)`,
    }
    : {
      background: 'linear-gradient(0deg, #000000, #000000)',
    };

  const handleFloatingPlayerClick = () => {
    setPlayerExpanded(true);
  };

  const handleCollapseClick = () => {
    setPlayerExpanded(false);
  };

  return (
    <>
      <div className={`player ${playerExpanded ? 'expanded' : ''}`} style={isMobile ? backgroundStyle : {}}>
        {playerExpanded && (
          <div className="collapse-button" onClick={handleCollapseClick}>
            <img src="/assets/down-arrow.png" alt="Collapse" width="24px" height="24px" className='cursor-pointer' />
          </div>
        )}
        <div>
          <h3 className='player__song--title'>{currentSong.name}</h3>
          <p className='player__song--artist'>{currentSong.artist}</p>
        </div>
        <div className='h-44vh'>
          <div className='song-thumbnail'>
            <img className='mb-3' src={`https://cms.samespace.com/assets/${currentSong.cover}`} alt={currentSong.name} />
          </div>
          <audio
            ref={audioRef}
            src={currentSong.url}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={() => setDuration(audioRef.current.duration)}
            onError={() => console.error('Error loading audio source')}
          ></audio>
        </div>
        <div>
          <div className="seek-bar">
            <input
              type="range"
              className='audio-seeker'
              value={seekPercentage}
              onChange={handleSeek}
              style={{ backgroundSize: `${seekPercentage}% 100%` }}
            />
            <div className="time">
              <span className="current-time">{formatTime(currentTime)}</span>
              <span className="total-time">{formatTime(duration)}</span>
            </div>
          </div>
          <div className='controls-container mt-3'>
            <div className='options'>
              <img width={"48px"} height={"48px"} src='/assets/options.png' className='options-icon' />
            </div>
            <div className="controls">
              <div><img onClick={onPrevious} src='/assets/prev.png' width={"24px"} height={"16px"} className='controls__icon' /></div>
              <div>
                {isPlaying ? (
                  <img onClick={onPlayPause} src='/assets/pause.png' width={"48px"} height={"48px"} className='controls__icon play-pause' />
                ) : (
                  <img onClick={onPlayPause} src='/assets/play.png' width={"48px"} height={"48px"} className='controls__icon play-pause' />
                )}
              </div>
              <div><img onClick={onNext} src='/assets/next.png' width={"24px"} height={"16px"} className='controls__icon' /></div>
            </div>
            <div className='sound'>
              <img width={"48px"} height={"48px"} src='/assets/sound.png' />
            </div>
          </div>
        </div>
      </div>
      {isMobile && !playerExpanded && (
        <div className='floating-player' onClick={handleFloatingPlayerClick}>
          <div className='floating-player--container'>
            <div className='floating-player--top'>
              <div className='floating-player--left'>
                <div className='floating-player__cover'>
                  <img src={`https://cms.samespace.com/assets/${currentSong.cover}`} alt={currentSong.name} />
                </div>
                <div className='floating-player__copy'>
                  <h3 className='floating-player__copy__title'>{currentSong.name}</h3>
                  <p className='floating-player__copy__artist'>{currentSong.artist}</p>
                </div>
              </div>
              <div className='floating-player__controller' onClick={(e) => e.stopPropagation()}>
                {isPlaying ? (
                  <img onClick={onPlayPause} src='/assets/pause.png' width={"48px"} height={"48px"} className='controls__icon' />
                ) : (
                  <img onClick={onPlayPause} src='/assets/play.png' width={"48px"} height={"48px"} className='controls__icon' />
                )}
              </div>
            </div>
            <div className='floating-player--bottom w-100' onClick={(e) => e.stopPropagation()}>
              <div className="seek-bar">
                <input
                  type="range"
                  className='audio-seeker mb-0'
                  value={seekPercentage}
                  onChange={handleSeek}
                  style={{ backgroundSize: `${seekPercentage}% 100%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Player;
