import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Menu, X, Github } from 'preact-feather';
import { Link } from 'preact-router/match';

import Pill from '../../../../components/Pill/Pill';
import { useOnHistoryPush } from '../../../../hooks';

import './Header.scss';
import pkg from '../../../../../package.json';

function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useOnHistoryPush(() => setMenuOpen(false));

  return (
    <header class="page-header">
      <a class="brand" href="/">
        <img src="../../../../assets/images/svg/logo.svg"></img>
        <p>FileDrop</p>
        <Pill>v{pkg.version}</Pill>
      </a>
      
      <button class="thin icon mobile-menu" onClick={toggleMenu} aria-label="Toggle Menu">
         {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
      <nav style={{ display: isMenuOpen ? 'flex' : 'none' }}>
        <Link activeClassName="active" href="/how-it-works">How it works</Link>
        <a href="https://hotcoder.in">
          Our Host
        </a>
        <a href="https://hotcoder.in/index.html#contact-info">
          Contact Us
        </a>
        <a href="https://www.buymeacoffee.com/chaitanyap">Donate</a>
      </nav>
    </header>
  );
}

export default Header;