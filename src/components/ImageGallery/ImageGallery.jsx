import { ImageGalleryItem } from 'components/ImageGallery/ImageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';

export default function ImageGallery({ data, toggleModal }) {
  if (data) {
    return (
      <div>
        {data && (
          <ul className={css.imageGallery}>
            <ImageGalleryItem data={data} toggleModal={toggleModal} />
          </ul>
        )}
      </div>
    );
  }
}
