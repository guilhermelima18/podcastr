import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { api } from '../../services/api';
import convertDurationToTimeString from '../../utils/convertDurationToTimeString';

import styles from './styles.module.scss';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
  description: string;
}

type EpisodeProps = {
  episode: Episode;
}

export default function Episode({ episode }: EpisodeProps) {
  return (
    <div className={styles.podcastContainer}>
      <div className={styles.imgPodcast}>
        <Image
          width={192}
          height={192}
          src={episode.thumbnail}
          alt={episode.title}

        />
        <Link href="/">
          <a className={styles.previous}>
            <img src="/arrow-left.svg" alt="Voltar" />
          </a>
        </Link>
        <Link href="">
          <a className={styles.play}>
            <img src="/play.svg" alt="Tocar agora" />
          </a>
        </Link>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <div className={styles.description}>
          <span>Participantes: {episode.members}</span>
          <span>Data: {episode.publishedAt}</span>
          <span>Duração: {episode.durationAsString}</span>
        </div>
      </header>

      <div
        className={styles.about}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const paths = data.map(episode => {
    return {
      params: {
        slug: episode.id
      }
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;

  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  };

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24 //Salvar páginas estáticas a cada 24hs
  }
}