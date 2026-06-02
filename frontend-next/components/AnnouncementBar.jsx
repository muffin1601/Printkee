import Link from "next/link";
import "../styles/AnnouncementBar.css";

const AnnouncementBar = () => (
  <div className="ann-bar" role="banner" aria-label="Site announcements">
    <div className="ann-bar__inner">
      <div className="ann-bar__items">
        <span className="ann-bar__item">
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
          Bulk Order Support
        </span>
        <span className="ann-bar__item">
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" /></svg>
          Custom Branding
        </span>
        <span className="ann-bar__item">
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3a1 1 0 00.99-.858l.99-7A1 1 0 0015 5H3z" /></svg>
          Pan India Delivery
        </span>
        <span className="ann-bar__item">
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
          Lowest Prices Guaranteed
        </span>
      </div>

      <div className="ann-bar__actions">
        <Link href="/contact" className="ann-bar__link">Track Order</Link>
        <Link href="/login" className="ann-bar__link">Login / Register</Link>
        <Link href="/contact" className="ann-bar__cart" aria-label="Cart">
          <svg viewBox="0 0 20 20" fill="currentColor"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" /><path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
          <span className="ann-bar__cart-badge">0</span>
        </Link>
      </div>
    </div>
  </div>
);

export default AnnouncementBar;
