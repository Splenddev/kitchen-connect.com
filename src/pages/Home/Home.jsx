import { useContext } from 'react';
import Header from '../../components/Header/Header';
import KitchenMenu from '../../components/KitchenMenu/KitchenMenu';
import UserDetails from '../../components/UserDetails/UserDetails';
import { StoreContext } from '../../context/StoreContext';
import './Home.css';

const Home = () => {
  const { userInfo, token } = useContext(StoreContext);
  return (
    <div className="home">
      {userInfo && token ? <UserDetails /> : <></>}
      <Header />
      <KitchenMenu />
    </div>
  );
};

export default Home;
