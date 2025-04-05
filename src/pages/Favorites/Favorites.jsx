import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Favorites.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDotCircle,
  faHeart,
  faNairaSign,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import BackNav from '../../components/BackNav/BackNav';
import Loader from '../../components/Loader/Loader';
import InfoModal from '../../components/InfoModal/InfoModal';

const Favorites = () => {
  const { token, getFavorites, favorites, url, addToCart, isAdded } =
    useContext(StoreContext);
  // useState
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function loadData() {
      if (token === null) return;
      await getFavorites(localStorage.getItem('token'));
    }
    if (token !== null) {
      loadData();
    }
  }, [token]);
  const info = {
    title: 'Proceed to Cart',
    contentsDescription: {
      titleDes: 'Do you want to proceed to cart?',
    },
    optionBtnA: 'No',
    optionBtnB: 'Yes',
  };
  function goToCart() {
    if (isAdded) {
      window.location.href = '/cart';
    }
  }
  function btnClick(id) {
    if (id === id) setLoading(true);

    addToCart(id);
  }
  return (
    <>
      <BackNav />
      <div className="fav-container">
        <div className="fav-top">
          <FontAwesomeIcon
            className="icon"
            icon={faHeart}
          />
          <p>
            <span className="title">Favorites</span>
            <FontAwesomeIcon
              className="icon o"
              icon={faDotCircle}
            />{' '}
            <span className="length flex-center">
              {favorites === undefined ? 0 : favorites.length}
            </span>
          </p>
          <div>
            <FontAwesomeIcon
              className="icon"
              icon={faSearch}
            />
          </div>
        </div>
        <div className="fav-lists">
          {favorites === undefined ? (
            <p>Nothing here</p>
          ) : (
            favorites.map((fav) => (
              <div
                className="fav-list"
                key={fav._id}>
                <div className="fav-image">
                  <img
                    src={url + '/images/' + fav.image}
                    alt="fav-img"
                  />
                </div>
                <div className="fav-middle">
                  <p className="fav-name">{fav.name}</p>
                  <p>From {fav.kitchenName}</p>
                </div>
                <div className="fav-right flex">
                  <b className="fav-price">
                    <FontAwesomeIcon icon={faNairaSign} />
                    {fav.price}
                  </b>
                  <InfoModal
                    modalContents={info}
                    stateHandler={loading}
                    functionHandler={goToCart}
                  />
                  <button onClick={() => btnClick(fav._id)}>
                    Buy
                    {loading && fav._id === fav._id && (
                      <span>
                        <Loader
                          color_primary={'black'}
                          color_secondary={'transparent'}
                          borderWidth={'2px'}
                          width={'15px'}
                          height={'15px'}
                        />
                      </span>
                    )}
                  </button>
                  <p>{isAdded.toString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
        {/* <button onClick={() => console.log(favorites)}>test me</button> */}
      </div>
    </>
  );
};

export default Favorites;
