import { useContext } from 'react';
import Header from '../../components/Header/Header';
import KitchenMenu from '../../components/KitchenMenu/KitchenMenu';
import { StoreContext } from '../../context/StoreContext';
import './Home.css';

const Home = () => {
  const { userInfo } = useContext(StoreContext);
  return (
    <div className="home">
      <p>
        Welcome <b>{userInfo.name}</b>
      </p>
      <Header />
      <KitchenMenu />
    </div>
  );
};

export default Home;
