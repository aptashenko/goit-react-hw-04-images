import React from "react";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGallery/ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import { Watch } from 'react-loader-spinner';
import Modal from './Modal/Modal'
import PropTypes from 'prop-types'; // ES6
import '../styles.css';
import { fetchUrl } from '../services/fetchApi';
import { useState, useEffect } from "react";

export default function App() {
  const [modal, setModal] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loadButton, setLoadButton] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(e.target.elements.query.value);
    setPage(1);
    setImages([]);
    setLoadButton(false);
    setSpinner(false);
    setModalImage('');
    e.target.reset();
  }

  const nextPage = () => {
    setPage(s => s + 1)
  }

  const handleLargeImage = (e) => {
      setModalImage(e.target.dataset.large)
  }

  const toggleModal = (e) => {
    setModal(s => !s)
  }

    const fetchImages = async () => {
      setSpinner(true);

      const perPage = 12;
      const {hits, total} = await fetchUrl(query, page, perPage);

      setImages(s => s.concat(hits));
      setLoadButton(total - images.length > perPage);
      setSpinner(false);
    }

  useEffect(() => {
     query && fetchImages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page])
  
  const showLoadButton = images.length > 0 && loadButton;
  
    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery>
          <ImageGalleryItem openModal={toggleModal} getLargeImage={handleLargeImage} images={images} />
        </ImageGallery>
        {showLoadButton && <Button nextPage={nextPage} />}
        {spinner && <Watch
          height="80"
          width="80"
          radius="48"
          color="#4fa94d"
          ariaLabel="watch-loading"
          wrapperStyle={{'margin': '0 auto'}}
          wrapperClassName=""
          visible={true}
        />}
        {modal && <Modal modalImage={modalImage} toggleModal={toggleModal} />}
      </div>
  )
};

App.propTypes = {
  modal: PropTypes.bool,
  images: PropTypes.array,
  currentPage: PropTypes.number,
  query: PropTypes.string
}
