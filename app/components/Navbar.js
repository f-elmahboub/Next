import React, { useState } from 'react';
import Link from 'next/link'; 
import styles from '../page.module.css';

export default function Navbar() {
  const [activeLink, setActiveLink] = useState(null);
  const handleClick = (index) => {
    setActiveLink(index);
  };

  return (
    <ul className={styles.navLinks}>
      <li className={activeLink === 0 ? styles.active : ''}>
        <Link href="/home" onClick={() => handleClick(0)}>ALL</Link>
      </li>
      <li className={activeLink === 1 ? styles.active : ''}>
        <Link href="/animation" onClick={() => handleClick(1)}>Animation</Link>
      </li>
      <li className={activeLink === 2 ? styles.active : ''}>
        <Link href="/branding" onClick={() => handleClick(2)}>Branding</Link>
      </li>
      <li className={activeLink === 2 ? styles.active : ''}>
        <Link href="/mobile" onClick={() => handleClick(3)}>Mobile</Link>
      </li>
      <li className={activeLink === 2 ? styles.active : ''}>
        <Link href="/productDesign" onClick={() => handleClick(4)}>Product Design</Link>
      </li>
      <li className={activeLink === 2 ? styles.active : ''}>
        <Link href="/typography" onClick={() => handleClick(5)}>Typography</Link>
      </li>
      <li className={activeLink === 2 ? styles.active : ''}>
        <Link href="/webDesign" onClick={() => handleClick(6)}>Web Design</Link>
      </li>
    </ul>
  );
};



