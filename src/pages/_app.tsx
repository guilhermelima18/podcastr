import '../styles/global.scss';
import Header from '../components/Header';
import Player from '../components/Player';

import styles from '../styles/app.module.scss';
import Head from 'next/head';
import { PlayerContext } from '../contexts/PlayerContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  };

  function togglePlay() {
    setIsPlaying(!isPlaying);
  };

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    <>
      <Head>
        <title>PodcastR - Sua plataforma de Podcasts</title>
      </Head>
      <PlayerContext.Provider
        value={{
          episodeList,
          currentEpisodeIndex,
          play,
          isPlaying,
          togglePlay,
          setPlayingState
        }}>
        <div className={styles.appContainer}>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
        </div>
      </PlayerContext.Provider>
    </>
  );
}

export default MyApp;