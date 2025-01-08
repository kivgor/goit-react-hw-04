import 'modern-normalize';
import SearchBar from './SearchBar/SearchBar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import ErrorMessage from './ErrorMessage/ErrorMessage.jsx';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn.jsx';
import Loader from './Loader/Loader.jsx';
import { useEffect, useState } from 'react';
import { fetchImagesByQuery } from '../services/api.js';
import toast from 'react-hot-toast';

function App() {
  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }

    const getImagesData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const { results } = await fetchImagesByQuery(query, page);
        setImageList(prev => [...prev, ...results]);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getImagesData();
  }, [query, page]);

  const handleChangeQuery = evt => {
    evt.preventDefault();
    if (evt.target.search.value.trim() === '') {
      toast.error('Please enter query!');
      return;
    }
    if (query === evt.target.search.value.trim()) {
      toast.error('Please change query!');
      return;
    }
    setQuery(evt.target.search.value.trim());
    setImageList([]);
    setPage(1);
    evt.target.reset();
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      {imageList.length > 0 && <ImageGallery imageList={imageList} />}
      {imageList.length > 0 && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
    </>
  );
}

export default App;
