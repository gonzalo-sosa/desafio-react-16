import { Component } from 'react';
import { motion } from 'motion/react';

class Modal extends Component {
  render() {
    const { title, onClose } = this.props;

    const [FigureContent, AsideContent] = this.props.children;

    return (
      <motion.div initial={{ opacity: 0, scale: 0.8}} animate={{ opacity: 1, scale: 1 }}
         className="modal" tabIndex="-1">
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
            <aside className='modal-aside'>
              {AsideContent}
            </aside>
            <figure>
              {FigureContent}
            </figure>
          </div>
        </div>
      </motion.div>
    );
  }
}

export default Modal;
