import { Component } from "react";
import "./gallery.css"

class Gallery extends Component {
  render() { 
    // recibir los datos como un array de objetos
    const { images } = this.props;
    const showImages = images && Array.isArray(images) && images.length > 0
    const loading = (index) => index < images.length / 2 ? "eager" : "lazy" 

    return (<section className="gallery">
      {showImages && images.map((image, index) =>
        <img key={image.id} src={image.src} alt={image.alt} width={image.width} loading={loading(index)} />
      )}
    </section>);
  }
}
 
export default Gallery;