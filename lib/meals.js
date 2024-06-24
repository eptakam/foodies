import sql from 'better-sqlite3';

const db = sql('meals.db'); // me connecter à la base de données meals.db

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

export function getMeal(slug) {
  // il ne faut pas faire : db.prepare('SELECT * FROM meals WHERE slug = ' + slug); car cela expose à des attaques par injection SQL d'ou l'utilisation de ? pour les valeurs dynamiques

  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

