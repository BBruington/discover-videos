import { useRouter } from 'next/router';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

const Video = () => {

  const router = useRouter();

  return (
    <div>Video Page {router.query.videoId}
      <Modal 
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='example modal'>
        <div>Modal body</div>
      </Modal>
    </div>
  )
}

export default Video;