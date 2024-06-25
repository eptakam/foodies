import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db'); // me connecter à la base de données meals.db

// fonction permettant de récupérer tous les repas de la BD
export async function getAllMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000)); // simuler une requête lente
  // note:
  //     .run() : pour les requêtes INSERT, UPDATE, DELETE
  //     .all() : pour les requêtes SELECT (fecth). Retourne un tableau d'enregistrements(objets)
  //     .get() : pour les requêtes SELECT (fecth). Retourne un objet(1 seul enregistrement)

  const meals = db.prepare('SELECT * FROM meals').all();

  // throw new Error('Loading meals failed!');
  
  return meals;
}

// fonction permettant de récupérer un seul repas de la BD (pour afficher ses détails)
export function getMeal(slug) {
  // il ne faut pas faire : db.prepare('SELECT * FROM meals WHERE slug = ' + slug); car cela expose à des attaques par injection SQL d'ou l'utilisation de ? pour les valeurs dynamiques

  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

// fonction permettant de sauvegarder un repas dans la BD
export async function saveMeal(meal) {
  // generer un slug pour le repas
  meal.slug = slugify(meal.title, { lower: true });

  // nettoyer la chaîne de caractères meal.instructions de toute injection de code malveillant, notamment des attaques par Cross-Site Scripting (XSS).
  meal.instructions = xss(meal.instructions);

  // extraire l'extension du fichier image
  const extension = meal.image.name.split('.').pop();

  // generer un nom de fichier unique pour l'image (pas celui entre par l'utilisateur)
  const fileName = `${meal.slug}.${extension}`;

  // sauvegarder ce fichier dans le dossier public/images. pour le faire, nous allons utiliser un api de node.js appelé fs (file system)
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  /*
    Note:
        stream.write() : permet d'écrire des données dans un fichier

        le premier argument de stream.write() doit être un Buffer ou une chaîne de caractères qu'on desire ecrire.

        Pour convertir un ArrayBuffer en Buffer, on peut utiliser Buffer.from() comme ci-dessous:

        le deuxième argument de stream.write() est la fonction qui sera exécutée une fois que l'écriture est terminée.

  */
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving the image failed!');
    }
  });

  meal.image = `/images/${fileName}`;

  // inserer les informations (donnees) du repas dans la BD. L'image n'est pas sauvegardée dans la BD, mais dans le dossier public/images
  
  // note: on utilise @ pour les paramètres nommés pour éviter les attaques par injection SQL
  db.prepare(`
    INSERT INTO meals 
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title, 
      @summary, 
      @instructions, 
      @creator, 
      @creator_email, 
      @image, 
      @slug
    )
  `).run(meal);
}

