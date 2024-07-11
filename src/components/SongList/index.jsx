import React, { useState, useEffect, useRef } from 'react';
import './song-list.css';

const formatDuration = (durationInSeconds) => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const SongList = ({ songs, onSelectSong, currentSong, searchTriggered }) => {
  const [songDurations, setSongDurations] = useState({});
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const loadDurations = async () => {
      const durations = {};
      for (const song of songs) {
        audioRef.current.src = song.url;
        await new Promise(resolve => {
          audioRef.current.onloadedmetadata = () => { 
            durations[song.id] = audioRef.current.duration;
            resolve();
          };
        });
      }
      setSongDurations(durations);
      setLoading(false);
    };

    if (songs && songs.length > 0) {
      loadDurations();
    } else {
      setLoading(false);
    }

    return () => {
      audioRef.current.onloadedmetadata = null;
    };
  }, [songs]);

  if (loading) {
    return <div className="song-list-loading">Loading...</div>;
  }

  if (searchTriggered && (!songs || songs.length === 0)) {
    return <div className="song-list-empty">No songs available 🥲</div>;
  }

  if (!songs || songs.length === 0) {
    return null;
  }

  return (
    <div className="song-list">
      {songs.map(song => (
        <div className={`song-item ${currentSong && currentSong.id === song.id ? 'active' : ''}`} key={song.id} onClick={() => onSelectSong(song)}>
          <div className='song-item--left'>
            <div className='song-item__cover'>
              <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.title} />
            </div>
            <div>
              <h4 className='song-item__name'>{song.name}</h4>
              <p className='song-item__artist'>{song.artist}</p>
            </div>
          </div>
          <div className='song-item--right'>
            {songDurations[song.id] && (
              <span className="song-item__duration">{formatDuration(songDurations[song.id])}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;