'use client';

/* Important:
          ce composant permet une utilisation efficiente de 'use client', car en l'utilisant directement dans le main-header.js, on rendait tous les composants 'client component' d'ou on perdait l'avantage d'avoir les 'server components' qui sont plus performants car ils sont rendus du coté serveur sans que le client ait besoin de les télécharger ou de les demander.
*/

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './nav-link.module.css';

export default function NavLink({ href, children}) {
  const path = usePathname();  // ce hook retourne le chemin de l'URL actuelle apres le nom de domaine
  return (
    // rendre le lien actif en fonction de l'URL actuelle si oui, activer la classe css '.active' 
    <Link 
      href={href} 
      className={path.startsWith(href) ? `${classes.link} ${classes.active}` : classes.link }
      >
        {children}
    </Link>
  );
}