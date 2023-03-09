import PropTypes, { arrayOf } from 'prop-types';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { ImageGalleryList } from "components/ImageGallery/ImageGallery.styled";

const ImageGallery = ({ images }) => {
    return (
        <ImageGalleryList>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} tags={tags} />
            ))}
        </ImageGalleryList>
    );
};

export { ImageGallery };

ImageGallery.propTypes = {
    images: arrayOf(PropTypes.shape({
        id: PropTypes.number,
        webformatURL: PropTypes.string,
        largeImageURL: PropTypes.string,
        tags:PropTypes.string,
    })),
};