import React, { createContext, useState, useContext } from 'react';

const CurrentSongContext = createContext();

export const CurrentSongProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <CurrentSongContext.Provider value={{ currentSong, setCurrentSong, isPlaying, setIsPlaying }}>
      {children}
    </CurrentSongContext.Provider>
  );
};

export const useCurrentSong = () => {
  return useContext(CurrentSongContext);
};
