/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from 'framer-motion';
import './InfoModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faO } from '@fortawesome/free-solid-svg-icons';

const InfoModal = ({
  modalContents,
  clickHandler,
  stateHandler,
  functionHandler,
}) => {
  // const array={nam:[]}
  return (
    <AnimatePresence>
      {stateHandler && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="info-modal-container">
          <div className="info-modal">
            <h2>{modalContents.title}</h2>
            <hr />
            <p className="sub-title">
              {modalContents.contentsDescription &&
                modalContents.contentsDescription.title}
            </p>
            <p className="sub-title-contents">
              {modalContents.contentsDescription &&
                modalContents.contentsDescription.titleDes}
            </p>
            <hr />
            {modalContents.contents ? (
              modalContents.contents.map((details, index) => (
                <div key={index}>
                  <p className="sub-title">
                    <FontAwesomeIcon
                      className="icon"
                      icon={faO}
                    />
                    {details.title}
                  </p>
                  <p className="sub-title-contents">{details.info}</p>
                  <hr />
                </div>
              ))
            ) : (
              <></>
            )}
            {modalContents.button === 'Close' ? (
              <input
                onClick={() => clickHandler(false)}
                type="button"
                value={modalContents.button}
              />
            ) : (
              <>
                <input
                  onClick={() => clickHandler(false)}
                  type="button"
                  value={modalContents.optionBtnA}
                />
                <input
                  onClick={() => functionHandler(false)}
                  type="button"
                  value={modalContents.optionBtnB}
                />
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoModal;
