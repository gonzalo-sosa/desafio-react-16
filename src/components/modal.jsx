import { Component } from 'react';
import { motion } from 'motion/react';

class Modal extends Component {
  render() {
    const { title, onClose } = this.props;

    const [PrimaryContent, SecondaryContent] = this.props.children;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="modal"
        style={{ display: 'block' }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => onClose()}
              ></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col">{PrimaryContent}</div>
                </div>
                <div className="row">
                  <div className="col">{SecondaryContent}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
}

export default Modal;
