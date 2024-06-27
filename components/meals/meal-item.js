import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';

export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          {/* fill : permet de setter le width et height à 100%. c'est une bonne alternative lorsqu'on ne connait pas les dimensions de l'image (uploader par un utilisateur par exemple) */}
          {/* <Image src={image} alt={title} fill /> */} {/* utilisation du fichier image dans le dossier public(public/images) */}

          {/* note:
              garder a l'esprit que par defaut, Nextjs ne permet pas l'utilisation des urls externes lorsqu'on utilise le composant <Image />. Pour permettre cela, il faut explicitement autoriser les urls externes dans le fichier next.config.js sinon, il y aura une erreur */}

          <Image
            src={`https://emmataks-nextjs-demo-users-image.s3.ca-central-1.amazonaws.com/${image}`}
            alt={title}
            fill
          /> {/* utilisation d'une image stockée dans S3 bucket d'AWS de facon dynamique */} 
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}