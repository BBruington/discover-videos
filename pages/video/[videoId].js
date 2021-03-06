import { useRouter } from 'next/router';
import Modal from 'react-modal';

import NavBar from '../../components/nav/navbar';
import { getYoutubeVideoById } from '../../lib/videos';

import clsx from 'classnames';
import styles from '../../styles/Video.module.css';
import Like from '../../components/icons/like-icon';
import DisLike from '../../components/icons/dislike-icon';
import { useState } from 'react';

Modal.setAppElement('#__next');

export async function getStaticProps(context) {

  const videoId = context.params.videoId;

  const videoArray = await getYoutubeVideoById(videoId);

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10,
  };
};

export async function getStaticPaths() {
  const listOfVideos = ['mYfJxlgR2jw', '4zH5iYM4wJo', 'KCPEHsAViiQ'];

  const paths = listOfVideos.map((videoId) => ({
    params: {videoId},
  }));

  return {paths, fallback: 'blocking'}
}

const Video = ({video}) => {
  const router = useRouter();

  const [toggleLike, setToggleLike] = useState(false)
  const [toggleDislike, setToggledisLike] = useState(false)

  const {title, publishTime, description, channelTitle, 
    statistics: {viewCount} = {viewCount: 0}} = video;

    const handleToggleDislike = () => {
      setToggledisLike(!toggleDislike)
      setToggleLike(toggleLike = false)
    };

    const handleToggleLike = () => {      
      setToggleLike(!toggleLike)
      setToggledisLike(toggleDislike = false)
    };

  return (
    <div className={styles.container}>

      <NavBar />
      <Modal 
      isOpen={true}
      contentLabel='Watch the video'
      onRequestClose={() => router.push('/')}
      className={styles.modal}
      overlayClassName={styles.overlay}
      >
        <iframe 
        id="player" 
        className={styles.videoPlayer}
        type="text/html" 
        width="100%" height="390"
        src={`http://www.youtube.com/embed/${router.query.videoId}?enablejsapi=1&origin=http://example.com&controls=0&rel=0`}
        frameborder="0">
        </iframe>
        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={handleToggleLike} >
              <div className={styles.btnWrapper}>
                <Like selected={toggleLike} />
              </div>
            </button>
          </div>
          <button onClick={handleToggleDislike} >
            <div className={styles.btnWrapper}>
              <DisLike selected={toggleDislike} />
            </div>
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Video;