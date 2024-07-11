import React, { useState, useEffect } from 'react';
import { fetchSongs } from './services/api';
import Header from './components/Header/';
import Player from './components/Player/';
import SongList from './components/SongList/';
import SearchBar from './components/SearchBar/';
import TabSwitcher from './components/TabSwitcher/';
import { useCurrentSong } from './contexts/currentSongContext';
import './style.css';

const App = () => {
  const { currentSong, setCurrentSong, isPlaying, setIsPlaying } = useCurrentSong();
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentTab, setCurrentTab] = useState('forYou');
  const [searchQuery, setSearchQuery] = useState('');

  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  useEffect(() => {
    const fetchAndSetSongs = async () => {
      const songsData = await fetchSongs();
      setSongs(songsData);
      setFilteredSongs(songsData);
      setCurrentSong(songsData[0]);
    };
    fetchAndSetSongs();
  }, [setCurrentSong]);

  useEffect(() => {
    if (currentSong) {
      document.querySelector('.app').classList.add('transition');
    } else {
      document.querySelector('.app').classList.remove('transition');
    }
  }, [currentSong]);

  useEffect(() => {
    const filterSongs = () => {
      let filtered = songs;

      if (currentTab === 'topTracks') {
        filtered = filtered.filter(song => song.top_track);
      }

      if (searchQuery) {
        filtered = filtered.filter(song =>
          song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
 
      setFilteredSongs(filtered);
    };

    filterSongs();
  }, [currentTab, songs, searchQuery]);

  const handleSearch = (query) => {
    if (query === "") {
      const filtered = songs.filter(song => song.top_track === (currentTab === 'topTracks'));
      setFilteredSongs(filtered);
    } else {
      setSearchQuery(query);
    }
  };


  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSelectSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };


  const handleNext = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[previousIndex]);
  };

  const backgroundStyle = currentSong
    ? {
      background: `linear-gradient(108.18deg, ${currentSong.accent} 2.46%, #000000 99.84%)`,
    }
    : {
      background: 'linear-gradient(0deg, #000000, #000000)',
    };

  return (
    <div className="app" style={backgroundStyle}>

      <Header />

      <div className='center-div section-padding'>
        <TabSwitcher currentTab={currentTab} onTabChange={setCurrentTab} />
        <SearchBar onSearch={handleSearch} />
        <SongList songs={filteredSongs} onSelectSong={handleSelectSong} currentSong={currentSong} />
      </div>

      <div className='player-container' >
        {currentSong && (
          <Player
            currentSong={currentSong}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isPlaying={isPlaying} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
