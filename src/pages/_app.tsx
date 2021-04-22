import '../styles/global.scss';
import Header from '../components/Header';
import Player from '../components/Player';

import styles from '../styles/app.module.scss';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>PodcastR - Sua plataforma de Podcasts</title>
      </Head>
      <div className={styles.appContainer}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </>
  );
}

export default MyApp;