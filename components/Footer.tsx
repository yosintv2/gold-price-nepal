import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-logo-row">
              <Logo size={30} />
              <span className="footer-brand-name">GoldNepal</span>
            </div>
            <p className="footer-desc">
              Your daily source for live gold and silver prices in Nepal. Updated every day
              from the official Nepal Gold &amp; Silver Dealers&apos; Association rates.
            </p>
            <p className="footer-disclaimer">
              Prices shown are for reference only. Always verify with your local jeweller or bank.
            </p>
          </div>

          <div>
            <div className="footer-col-title">Gold Prices</div>
            <div className="footer-links">
              <Link href="/gold-price-nepal/" className="footer-link">Gold Price Nepal Today</Link>
              <Link href="/hallmark-gold-price-nepal/" className="footer-link">Hallmark Gold Price</Link>
              <Link href="/fine-gold-9999-price-nepal/" className="footer-link">Fine Gold 9999 Price</Link>
              <Link href="/24k-gold-price-nepal/" className="footer-link">24K Gold Price</Link>
              <Link href="/tajabi-gold-price-nepal/" className="footer-link">Tajabi Gold Price</Link>
            </div>
          </div>

          <div>
            <div className="footer-col-title">More</div>
            <div className="footer-links">
              <Link href="/silver-price-nepal/" className="footer-link">Silver Price Nepal</Link>
              <Link href="/gold-price-nepal-per-tola/" className="footer-link">Gold Price Per Tola</Link>
              <Link href="/gold-price-nepal-per-10gm/" className="footer-link">Gold Price Per 10g</Link>
              <Link href="/history/" className="footer-link">Historical Rates</Link>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Info</div>
            <div className="footer-links">
              <Link href="/privacy/" className="footer-link">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-inner" style={{ paddingTop: 0, paddingBottom: 16 }}>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} GoldNepal. For reference only.</span>
          <span>Data: Nepal Gold &amp; Silver Dealers&apos; Association</span>
        </div>
      </div>
    </footer>
  );
}
