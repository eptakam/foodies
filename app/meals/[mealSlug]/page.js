import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getMeal } from '@/lib/meals';
import classes from './page.module.css';

export default function MealDetailsPage({params}) {
  // mealSlug : est le nom du dossier dans lequel se trouve le fichier page.js ([mealSlug]) et represente la cle de l'objet params. la valeur de cet objet est l'url actuelle
  const meal = getMeal(params.mealSlug);

  // appeler la fonction notFound() de 'next/navigation' si le meal desire n'est pas trouvé. elle appelera le composant NotFound de notre page not-found.js
  if (!meal) {
    notFound();
  }

  // bien formater les instructions pour les afficher dans le composant
  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
      {/* dangerouslySetInnerHTML : permet d'insérer du code HTML dans un composant React et nous expose à des attaques XSS (Cross-Site Scripting). */}
        <p className={classes.instructions} dangerouslySetInnerHTML={{__html: meal.instructions,}}></p>
      </main>
    </>
  );
}