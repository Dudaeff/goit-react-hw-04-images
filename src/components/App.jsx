import { useState, useEffect } from "react";
import { Vortex } from "react-loader-spinner";
import { getImagesByQuery } from "services/imagesApi";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Layout } from "./Layout/Layout";
import { Searchbar } from "./Searchbar/Searchbar";
import { Button } from "./Button/Button";

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (searchValue === '') {
      return;
    }

    setStatus('pending');

    getImagesByQuery(searchValue, page)
      .then(response => {
        if (!response.ok) return Promise.reject('Error');
        return response.json()
      })
      .then(newImages => {
        setImages(prev => [...prev, ...newImages.hits])
      })
      .catch(error => console.error(error.message))
      .finally(() => {
        setStatus('resolved')
      });

  }, [searchValue, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const newSearchValue = e.target.elements[1].value;
    
    if (newSearchValue === '') return alert('Write your search query..');
    if (newSearchValue !== searchValue) {
      setImages([]);
      setPage(1);
    };

    setSearchValue(newSearchValue)
  };

  const onMoreBtnClick = () => {
    setPage(prev => prev + 1);
    setStatus('pending');
  };

  return (
    <Layout>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} />
      {status === 'pending' && <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{ marginLeft: 'calc(100% / 2.2)' }}
        wrapperClass="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />}
      {status === 'resolved' && <Button type="button" onClick={onMoreBtnClick}>Load more...</Button>}
    </Layout>
  );
};

export { App };