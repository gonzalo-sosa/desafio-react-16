import { Component } from 'react';

class Modal extends Component {
  render() {
    const { title, content, onClose } = this.props;

    return (
      <div className="modal" tabIndex="-1">
        <div className="modal-content">
          <header className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => onClose()}
            >
              X
            </button>
          </header>
          <div className="modal-body">
            <article>
              {content}
              <figure>{this.props.children}</figure>
            </article>
          </div>
          <footer className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => onClose()}
            >
              Close
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

export default Modal;
