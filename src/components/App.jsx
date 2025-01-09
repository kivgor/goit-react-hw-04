import 'modern-normalize';
import SearchBar from './SearchBar/SearchBar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import ErrorMessage from './ErrorMessage/ErrorMessage.jsx';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn.jsx';
import Loader from './Loader/Loader.jsx';
import { useEffect, useState } from 'react';
import { fetchImagesByQuery } from '../services/api.js';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import ImageModal from './ImageModal/ImageModal.jsx';
Modal.setAppElement('#root');

function App() {
  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [urlForModal, setUrlForModal] = useState('');
  const [altForModal, setAltForModal] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }

    const getImagesData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const { results, total_pages } = await fetchImagesByQuery(query, page);
        setImageList(prev => [...prev, ...results]);
        setTotalPages(total_pages);
        if (total_pages === 0) {
          toast.error('No images by query: ' + query);
          return;
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getImagesData();
  }, [query, page]);

  const handleChangeQuery = newQuery => {
    if (newQuery === '') {
      toast.error('Please enter query!');
      return;
    }
    if (newQuery === query) {
      toast.error('Please change query!');
      return;
    }
    setQuery(newQuery);
    setImageList([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  function openModal(url, alt) {
    setUrlForModal(url);
    setAltForModal(alt);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      padding: '10px',
    },
  };

  return (
    <>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      {imageList.length > 0 && (
        <ImageGallery imageList={imageList} openModal={openModal} />
      )}
      {imageList.length > 0 && page < totalPages && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} />
      )}

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ImageModal urlForModal={urlForModal} altForModal={altForModal} />
      </Modal>
    </>
  );
}

export default App;
