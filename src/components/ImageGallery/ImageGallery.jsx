import { Component } from "react";
import PropTypes from 'prop-types';

import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "components/Button/Button";
import { getImagesByQuery } from "services/imagesApi";
import { Vortex } from "react-loader-spinner";
import { ImageGalleryList } from "components/ImageGallery/ImageGallery.styled";

class ImageGallery extends Component {
    state = {
        images: [],
        page: 1,
        searchValue: '',
        status: 'idle',
    };

    async componentDidUpdate(prevProps, prevState) {
        const searchValue = this.props.query.trim();

        if (searchValue === '') return alert('Write your search query..');
   
        if (prevProps.query !== searchValue) return this.setState({ searchValue, images: [], page: 1 , status: 'pending' });
        
        if (prevState.searchValue !== this.state.searchValue || prevState.page !== this.state.page) {
            try {
                const response = await getImagesByQuery(searchValue, this.state.page);

                if (!response.ok) return Promise.reject('Error');

                const newImages = await response.json();

                this.setState(prev => ({ images: [...prev.images, ...newImages.hits], status: 'resolved' }));

                } catch (error) {
                    console.error(error.message);
            };
        };
    };

    onMoreBtnClick = () => this.setState(prev => ({ page: prev.page + 1, status: 'pending' }));

    render(){
        const { images, status } = this.state;

        if (images.length > 0) return (
            <>
                <ImageGalleryList>
                    {images.map(({ id, webformatURL, largeImageURL, tags }) => (
                        <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} tags={tags} />
                        ))}
                </ImageGalleryList>

                { status === 'pending' && <Vortex
                visible={true}
                height="80"
                width="80"
                ariaLabel="vortex-loading"
                wrapperStyle={{ marginLeft: 'calc(100% / 2.2)' }}
                wrapperClass="vortex-wrapper"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                />}
                
                {status === 'resolved' && <Button type="button" onClick={this.onMoreBtnClick}>Load more...</Button>}
            </>
        );
        
        if (status === 'pending') return (
            <Vortex
                visible={true}
                height="80"
                width="80"
                ariaLabel="vortex-loading"
                wrapperStyle={{ marginLeft: 'calc(100% / 2.2)' }}
                wrapperClass="vortex-wrapper"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            />
        );
    };
};

export { ImageGallery };

ImageGallery.propTypes = {
    searchValue: PropTypes.string,
};