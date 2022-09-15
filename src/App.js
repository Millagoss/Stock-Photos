import React, { useRef, useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Photo from './Photo';

const clientId = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [newImages, setNewImages] = useState(false);

  const checkInitValue = useRef(true);

  const fetchPhotos = async () => {
    setIsLoading(true);
    let url;
    const urlPage = `&page=${page}`;

    if (searchTerm) {
      url = `${searchUrl}${clientId}${urlPage}&query=${searchTerm}`;
    } else {
      url = `${mainUrl}${clientId}${urlPage}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      setPhotos((oldPhotos) => {
        if (searchTerm && page === 1) {
          return data.results;
        } else if (searchTerm) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setNewImages(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setNewImages(false);
      alert(error.code);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [page]);

  useEffect(() => {
    if (!checkInitValue.current) {
      checkInitValue.current = true;
      return;
    }
    if (!newImages) return;
    if (isLoading) return;

    setPage((oldPage) => oldPage + 1);
  }, [newImages]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 2) {
      setNewImages(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    if (searchTerm && page === 1) {
      fetchPhotos();
      return;
    }
    setPage(1);
  };

  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input
            type='text'
            placeholder='search'
            className='form-input'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type='submit' className='submit-btn' onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className='photos'>
        <div className='photos-center'>
          {photos.map((photo) => {
            return <Photo key={photo.id} photo={photo} />;
          })}
        </div>
        {isLoading && <h2 className='loading'>loading...</h2>}
      </section>
    </main>
  );
}

export default App;
