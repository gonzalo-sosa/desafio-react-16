import { Component } from 'react';
import Modal from './modal';
import { createPortal } from 'react-dom';

class Gallery extends Component {
  state = {
    showModal: false,
    selectedImage: null,
    swappingImages: false,
  };

  constructor(props) {
    super(props);
  }

  createImg = ({ id, src, alt, width, ...rest }) => {
    const { swappingImages } = this.state;
    const animationClass = swappingImages ? "" : "active";
    return <img key={id} src={src} alt={alt} width={width} className={animationClass} {...rest} />;
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

  componentDidUpdate(prevProps) {
    if (prevProps.images !== this.props.images) {
      this.setState({ swappingImages: true })
    }
  }

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
              title={selectedImage.alt}
              content={selectedImage.created_at}
              onClose={this.handleCloseModal}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={400}
                height={400}
              />
            </Modal>,
            document.getElementById('modal-root'),
          )}
      </section>
    );
  }
}

export default Gallery;
