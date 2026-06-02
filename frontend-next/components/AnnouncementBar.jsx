import Link from "next/link";
import { Package, Palette, Truck, ShieldCheck, User, ShoppingCart } from "lucide-react";
import "../styles/AnnouncementBar.css";

const AnnouncementBar = () => (
  <div className="ann-bar" role="banner" aria-label="Site announcements">
    <div className="ann-bar__inner">
      <div className="ann-bar__items">
        <span className="ann-bar__item"><Package size={13} /> Bulk Order Support</span>
        <span className="ann-bar__item"><Palette size={13} /> Custom Branding</span>
        <span className="ann-bar__item"><Truck size={13} /> Pan India Delivery</span>
        <span className="ann-bar__item"><ShieldCheck size={13} /> Lowest Prices Guaranteed</span>
      </div>
      <div className="ann-bar__actions">
        <Link href="/contact" className="ann-bar__link">Track Order</Link>
        <Link href="/login" className="ann-bar__link"><User size={12} /> Login / Register</Link>
        <Link href="/contact" className="ann-bar__cart" aria-label="Cart">
          <ShoppingCart size={15} />
          <span className="ann-bar__cart-badge">0</span>
        </Link>
      </div>
    </div>
  </div>
);

export default AnnouncementBar;
