import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Menu, X, Github } from 'preact-feather';

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
        <a href="/how-it-works">How it works</a>
        <a href="https://hotcoder.in">
          Our Host
        </a>
        <a href="https://hotcoder.in/index.html#contact-info">
          Contact Us
        </a>
      </nav>
    </header>
  );
}

export default Header;