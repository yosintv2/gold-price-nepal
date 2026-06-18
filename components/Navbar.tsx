'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const NAV_LINKS = [
  { href: '/', label: "Today's Rate" },
  { href: '/history/', label: 'History' },
  { href: '/gold-price-nepal/', label: 'Gold Price Nepal' },
  { href: '/silver-price-nepal/', label: 'Silver Price' },
];

const QUICK_LINKS = [
  { href: '/hallmark-gold-price-nepal/', label: 'Hallmark Gold' },
  { href: '/fine-gold-9999-price-nepal/', label: 'Fine Gold 9999' },
  { href: '/24k-gold-price-nepal/', label: '24K Gold' },
  { href: '/tajabi-gold-price-nepal/', label: 'Tajabi Gold' },
  { href: '/gold-price-nepal-per-tola/', label: 'Per Tola' },
  { href: '/gold-price-nepal-per-10gm/', label: 'Per 10g' },
  { href: '/silver-price-nepal/', label: 'Silver' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">

      {/* Row 1: Logo + site name + hamburger */}
      <div className="nav-top">
        <div className="nav-top-inner">
          <Link href="/" className="nav-logo" aria-label="GoldNepal home">
            <Logo size={40} />
            <span className="nav-brand">Gold<span>Nepal</span></span>
          </Link>

          <div className="nav-top-tagline">
            Live Gold &amp; Silver Prices in Nepal
          </div>

          <button
            className={`nav-hamburger${open ? ' open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            type="button"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Row 2: Dark nav links */}
      <div className="nav-main">
        <div className="nav-main-inner">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-main-link${pathname === href ? ' active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Row 3: Gold type quick links */}
      <div className="nav-leagues" aria-label="Gold types">
        <div className="nav-leagues-inner">
          {QUICK_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-league-link${pathname === href ? ' active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="nav-mobile-menu" role="menu">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-mobile-link${pathname === href ? ' active' : ''}`}
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="nav-mobile-divider" />
          {QUICK_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-mobile-link nav-mobile-link-sub"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
