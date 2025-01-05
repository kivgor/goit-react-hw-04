import 'modern-normalize';
import SearchBar from './SearchBar/SearchBar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';

async function fetchArticles(query, setImageList, setLoading) {
  try {
    setLoading(true);
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        client_id: 'fAybjthjUpXgAiQRgc05ZoRjv6Q4t5ldGkTZ1S9E_oo',
        query,
        per_page: 3,
        orientation: 'landscape',
      },
    });
    console.log(response);
    setImageList(response.data.results);
  } catch (error) {
    console.log(error);

    toast.error('Something goes wrong. Please try again!', {
      style: {
        padding: '5px 20px',
      },
    });
  } finally {
    setLoading(false);
  }
}

function App() {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (evt, query) => {
    evt.preventDefault();
    const form = evt.target;
    query = evt.target.search.value.trim();
    if (query === '') {
      toast.error('Please enter search term!', {
        style: {
          padding: '5px 20px',
        },
      });
      return;
    } else {
      fetchArticles(query, setImageList, setLoading);
    }
    form.reset();
  };

  return (
    <>
      <SearchBar handleSubmit={handleSubmit} />
      {imageList.length > 0 && <ImageGallery imageList={imageList} />}
      {loading && (
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{ justifyContent: 'center' }}
        />
      )}
      <Toaster position="top-right" />
    </>
  );
}

export default App;
