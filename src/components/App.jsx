import { useState } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';

export default function App() {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [modalHidden, setModalHidden] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const updateNewImagesArray = data => {
    setData(data.hits);
  };

  const updateImagesArray = data => {
    setData(state => [...state, ...data.hits]);
  };

  const updatePage = page => {
    setPage(page);
  };

  const toggleModal = image => {
    setModalHidden(state => !state);
    setLargeImage(image);
  };

  const toggleLoader = () => {
    setShowLoader(state => !state);
  };

  return (
    <div>
      <Searchbar
        handleImages={updateImagesArray}
        handleNewImages={updateNewImagesArray}
        page={page}
        toggleLoader={toggleLoader}
      />

      <ImageGallery data={data} toggleModal={toggleModal} />
      {data.length >= 12 && (
        <Button handlePage={updatePage} toggleLoader={toggleLoader} />
      )}
      {modalHidden && <Modal image={largeImage} toggleModal={toggleModal} />}
      {showLoader && <Loader />}
    </div>
  );
}
