'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const navLinks = [
  { label: 'Our Story', href: '/#our-story' },
  { label: 'Events', href: '/#events' },
  { label: 'Travel', href: '/#travel' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`wedding-nav ${scrolled ? 'scrolled' : 'transparent'}`}>
      <div className="container d-flex align-items-center justify-content-between">
        <Link href="/" className="nav-brand">
          J &amp; A
        </Link>

        {/* Desktop links */}
        <div className="d-none d-md-flex align-items-center gap-1">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="nav-link-wedding">
              {l.label}
            </a>
          ))}
          {session?.user?.role === 'ADMIN' && (
            <a href="/admin" className="nav-link-wedding">
              Admin
            </a>
          )}
          <Link href="/rsvp" className="nav-rsvp-btn ms-3">
            RSVP
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="d-md-none"
          style={{ background: 'none', border: 'none', color: 'var(--color-gold)', fontSize: '1.5rem' }}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="d-md-none"
          style={{
            background: 'rgba(13,27,42,0.98)',
            borderTop: '1px solid rgba(201,168,76,0.2)',
            padding: '1.5rem',
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link-wedding d-block mb-2"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          {session?.user?.role === 'ADMIN' && (
            <a href="/admin" className="nav-link-wedding d-block mb-2" onClick={() => setOpen(false)}>
              Admin
            </a>
          )}
          <Link href="/rsvp" className="nav-rsvp-btn mt-3 text-center d-block" onClick={() => setOpen(false)}>
            RSVP
          </Link>
        </div>
      )}
    </nav>
  );
}
