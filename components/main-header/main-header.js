'use client';

import Link from "next/link";
import Image from "next/image";

import MainHeaderBackground from './main-header-background';
import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import { usePathname } from "next/navigation";

export default function MainHeader() {
  const path = usePathname();  // ce hook retourne le chemin de l'URL actuelle apres le nom de domaine

  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          {/* <img src={logoImg.src} alt="A plate with food on it" /> */}
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              {/* rendre le lien actif en fonction de l'URL actuelle si oui, activer la classe css '.active' */}
              <Link href="/meals" className={path.startsWith('/meals') ? classes.active : undefined }>Browse Meals</Link>
            </li>
            <li>
              {/* rendre le lien actif en fonction de l'URL actuelle si oui, activer la classe css '.active' */}
              <Link href="/community" className={path === '/community' ? classes.active : undefined }>Foodies Community</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
