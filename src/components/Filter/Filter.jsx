import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Filter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faFilter } from '@fortawesome/free-solid-svg-icons';

const Filter = () => {
  const {
    kitchen,
    setFilterKitchen,
    setKitchen,
    filterKitchen,
    filterIcon,
    setFilterIcon,
  } = useContext(StoreContext);
  function showFilter() {
    !filterIcon ? setFilterIcon(true) : setFilterIcon(false);
  }
  return (
    <div className="filter-handler">
      <div className="content">
        <div
          className="icon__title"
          onClick={showFilter}>
          <FontAwesomeIcon
            className="filter-kitchen-icon"
            icon={faFilter}
          />
          <span className="filter-kitchen-title">
            <span>{filterKitchen}</span>
            <FontAwesomeIcon
              icon={faAngleDown}
              className={
                filterIcon ? 'arrow-down-icon rotate' : 'arrow-down-icon'
              }
            />
          </span>
        </div>
      </div>
      <ul
        className={
          filterIcon ? 'kitchen-category-ul ' : 'kitchen-category-ul hide'
        }>
        <li
          className={kitchen === 'all' ? 'active' : ''}
          onClick={() => {
            setKitchen('all');
            showFilter();
            setFilterKitchen('All Foods');
          }}>
          All Foods
        </li>
        <li
          className={kitchen === 'arena' ? 'active' : ''}
          onClick={() => {
            setKitchen('arena');
            setFilterKitchen('Arena');
            showFilter();
          }}>
          Arena
        </li>
        <li
          className={kitchen === 'iya afusat' ? 'active' : ''}
          onClick={() => {
            setKitchen('iya afusat');
            showFilter();
            setFilterKitchen('Iya Afusat');
          }}>
          Iya Afusat
        </li>
        <li
          className={kitchen === 'tasty munch' ? 'active' : ''}
          onClick={() => {
            setKitchen('tasty munch');
            showFilter();
            setFilterKitchen('Tasty Munch');
          }}>
          Tasty Munch
        </li>
        <li
          className={kitchen === 'krafty' ? 'active' : ''}
          onClick={() => {
            setKitchen('krafty');
            showFilter();
            setFilterKitchen('Krafty');
          }}>
          Krafty
        </li>
        <li
          className={kitchen === 'bissy joy' ? 'active' : ''}
          onClick={() => {
            setKitchen('bissy joy');
            showFilter();
            setFilterKitchen('Bissy Joy');
          }}>
          Bissy Joy
        </li>
      </ul>
    </div>
  );
};

export default Filter;
