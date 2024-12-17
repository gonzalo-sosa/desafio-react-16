import { Component } from 'react';
import Modal from './modal';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import LikeIcon from './like-icon';

class Gallery extends Component {
  state = {
    showModal: false,
    selectedImage: null,
  };

  createImg = ({ id, src, alt, width, ...rest }) => {
    return (
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        key={id}
        src={src}
        alt={alt}
        width={width}
        {...rest}
      />
    );
  };

  handleShowModal = (image) => {
    this.setState({
      showModal: true,
      selectedImage: image,
    });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: null });
  };

  render() {
    const { isLoading, images } = this.props;
    const { showModal, selectedImage } = this.state;
    const showImages = images && Array.isArray(images) && images.length > 0;
    const loading = (index) => (index < images.length / 2 ? 'eager' : 'lazy');

    return (
      <section className="gallery">
        {isLoading && this.props.children}

        {!isLoading &&
          showImages &&
          images.map((image, index) =>
            this.createImg({
              ...image,
              loading: loading(index),
              onClick: () => this.handleShowModal(image),
            }),
        )}

        {showModal &&
          selectedImage &&
          createPortal(
            <Modal
              title={'Descripción de imagen'}
              onClose={this.handleCloseModal}
            >
              <figure>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={400}
                  height={400}
                />
                <figcaption>{selectedImage.alt}</figcaption>
              </figure>
              <>
                <div className="row">
                  <div className="col-md-auto">
                    <img
                      className="rounded-circle"
                      src={selectedImage.user.image}
                      alt={`Profile image of ${selectedImage.user.username}`}
                    />
                  </div>
                  <div className="col">
                    <h6>{`@${selectedImage.user.username}`}</h6>
                    <time dateTime={selectedImage.created_At}>
                      {new Date(selectedImage.created_at).toLocaleDateString()}
                    </time>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-auto">
                    <div
                      className="d-flex align-items-center border rounded py-2 px-3"
                      style={{ gap: '10px' }}
                    >
                      <LikeIcon isLiked={false} />
                      <span className="d-inline-block mx-auto">
                        {selectedImage.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            </Modal>,
            document.getElementById('modal-root'),
          )}
      </section>
    );
  }
}

export default Gallery;
