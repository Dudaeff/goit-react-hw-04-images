import { useState } from "react";
import PropTypes from 'prop-types';
import { Modal } from "components/Modal/Modal";
import { GalleryItem, GalleryItemImage } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({ largeImageURL, webformatURL, tags }) => {
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(prev => !prev);
    const handleImageClick = () => toggleModal();

    return (
        <GalleryItem>
            <GalleryItemImage src={webformatURL} alt={tags} onClick={handleImageClick} />
      
            {showModal &&
                <Modal onClose={toggleModal}>
                    <img src={largeImageURL} alt={tags} />
                </Modal>}
        </GalleryItem>
    );
};

export { ImageGalleryItem };

ImageGalleryItem.propTypes = {
    largeImageURL: PropTypes.string,
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
};