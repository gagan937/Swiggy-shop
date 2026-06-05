"use client";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-logo">
              <div className="footer-logo-box">
                <img src="/image/swiggylogo.png" alt="Swiggy" />
              </div>
              <span className="footer-brand-name">SWIGGY</span>
            </div>
            <p className="footer-brand-desc">
              India&apos;s leading food and grocery delivery platform. Order food, groceries, and more — delivered in minutes.
            </p>
            <div className="footer-socials">
              <div className="footer-social-btn"><img src="/image/500px-Facebook_f_logo__2019_.svg-removebg-preview.png" alt="Facebook" /></div>
              <div className="footer-social-btn"><img src="/image/_89663605_instagram_logo_976-removebg-preview.png" alt="Instagram" /></div>
              <div className="footer-social-btn"><img src="/image/twitter-vector-logo-logotype-vector-social-media_901408-396-removebg-preview.png" alt="Twitter" /></div>
              <div className="footer-social-btn"><img src="/image/hd-round-beautiful-vector-linkedin-icon-png-701751695046279cxdjibhzv7-removebg-preview.png" alt="LinkedIn" /></div>
            </div>
          </div>
          <div>
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links">
              <li>About Us</li><li>Careers</li><li>Blog</li><li>Press</li><li>Investor Relations</li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">For Customers</h4>
            <ul className="footer-links">
              <li>Help &amp; Support</li><li>Track Order</li><li>My Account</li><li>Coupons</li><li>Swiggy One</li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">For Partners</h4>
            <ul className="footer-links">
              <li>Add Restaurant</li><li>Become Delivery Partner</li><li>Advertise</li><li>Partner Portal</li>
            </ul>
          </div>
        </div>
        <div className="footer-divider" />
        <div className="footer-bottom">
          <p className="footer-copy">© 2025 <span>SWIGGY</span>. All rights reserved.</p>
          <div className="footer-badges">
            <span className="footer-badge">Privacy Policy</span>
            <span className="footer-badge">Terms of Service</span>
            <span className="footer-badge">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
