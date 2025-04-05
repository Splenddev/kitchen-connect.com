/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Extras.css';
import {
  faMinus,
  faNairaSign,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Extras = ({ extras }) => {
  const [qty, setQty] = useState(0);
  const price = 200;
  const total = price * qty;
  return (
    <div className="extras-body">
      <div className="extra">
        <div className="extra-top flex-sb">
          <div className="text-checkbox flex">
            <input type="checkbox" />
            <p>Extra cheese</p>
          </div>
          <p>
            <FontAwesomeIcon icon={faNairaSign} />
            {price}
          </p>
        </div>
        <div className="extra-bottom flex-sb">
          <div className="qty flex-center">
            <div className="icon-wrap">
              <FontAwesomeIcon
                icon={faMinus}
                className="icon"
                onClick={() => qty > 0 && setQty((prev) => (prev -= 1))}
              />
            </div>
            <p>{qty}</p>
            <div className="icon-wrap">
              <FontAwesomeIcon
                icon={faPlus}
                className="icon"
                onClick={() => qty < 5 && setQty((prev) => (prev += 1))}
              />
            </div>
          </div>
          <p>
            Total: <FontAwesomeIcon icon={faNairaSign} />
            {total}
          </p>
        </div>
      </div>
      {extras === undefined || extras.length === 0
        ? 'Nothing here'
        : extras.map((extra, index) => (
            <div
              key={index}
              className="extra">
              <div className="extra-top flex-sb">
                <div className="text-checkbox flex">
                  <input type="checkbox" />
                  <p>{extra.name}</p>
                </div>
                <p>
                  <FontAwesomeIcon icon={faNairaSign} />
                  {extra.price}
                </p>
              </div>
              <div className="extra-bottom flex-sb">
                <div className="qty flex-center">
                  <div className="icon-wrap">
                    <FontAwesomeIcon
                      icon={faMinus}
                      className="icon"
                      onClick={() => qty > 0 && setQty((prev) => (prev -= 1))}
                    />
                  </div>
                  <p>{qty}</p>
                  <div className="icon-wrap">
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="icon"
                      onClick={() => qty < 5 && setQty((prev) => (prev += 1))}
                    />
                  </div>
                </div>
                <p>
                  Total: <FontAwesomeIcon icon={faNairaSign} />
                  {qty * extra.price}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Extras;
