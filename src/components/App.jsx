import 'modern-normalize';
import SearchBar from './SearchBar/SearchBar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ErrorMessage from './ErrorMessage/ErrorMessage.jsx';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn.jsx';
import Loader from './Loader/Loader.jsx';

async function fetchArticles(query, page, setImageList, setLoading, setError) {
  console.log(page);

  try {
    setLoading(true);
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        client_id: 'fAybjthjUpXgAiQRgc05ZoRjv6Q4t5ldGkTZ1S9E_oo',
        query,
        page,
        per_page: 3,
        orientation: 'landscape',
      },
    });
    // console.log(response);
    setError(false);
    setImageList(response.data.results);
  } catch (error) {
    setError(true);
    console.log(error);
  } finally {
    setLoading(false);
  }
}

function App() {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState('1');

  const handleSubmit = (evt, query) => {
    evt.preventDefault();
    const form = evt.target;
    query = evt.target.search.value.trim();

    if (query === '') {
      toast.error('Please enter search term!', {
        style: { padding: '5px 20px' },
      });
      return;
    } else {
      fetchArticles(query, page, setImageList, setLoading, setError);
    }
    form.reset();
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <SearchBar handleSubmit={handleSubmit} />
      {imageList.length > 0 && <ImageGallery imageList={imageList} />}
      {imageList.length > 0 && <LoadMoreBtn handleLoadMore={handleLoadMore} />}

      {loading && <Loader />}
      {error && <ErrorMessage />}
      <Toaster position="top-right" />
    </>
  );
}

export default App;
