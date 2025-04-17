import { assets } from '../../assets/assets/frontend_assets/assets';
import './Footer.css';

const Footer = () => {
  return (
    <div
      className="footer"
      id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <div className="logo-company-name">
            <img
              src={assets.logo_BW}
              alt="company logo"
            />
            <p>KitchenConnect.com</p>
          </div>
          <p>
            Kitchen Connect is a smart food ordering platform connecting
            students and local kitchens across KWASU. From favorite meals to new
            flavors, we make it easy to discover, order, and enjoy food from
            verified vendors with secure payments and fast delivery. Powered by
            convenience, built for student life.
          </p>
          <div className="footer-content-social-icon">
            <img
              src={assets.linkedin_icon}
              alt="social media photos"
            />
            <img
              src={assets.twitter_icon}
              alt="social media photos"
            />
            <img
              src={assets.facebook_icon}
              alt="social media photos"
            />
          </div>
        </div>
        <div className="footer-content-right">
          <div className="footer-content-right-left">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/order">Orders</a>
              </li>
              <li>
                <a href="/cart">Cart</a>
              </li>
            </ul>
          </div>
          <div className="footer-content-right-right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>+234-7083-484-603</li>
              <li>michaelnwode023@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <p className="copyright">
        Copyright 2025 @ KitchenConnect.com - All Rights Reserved.
      </p>
      <span className="copyright">The Dev Teams</span>
    </div>
  );
};

export default Footer;
