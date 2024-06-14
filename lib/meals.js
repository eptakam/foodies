import sql from 'better-sqlite3';

const db = sql('meals.db'); // me connecter à la base de données meals.db

export async function getAllMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // simuler une requête lente
  // note:
  //     .run() : pour les requêtes INSERT, UPDATE, DELETE
  //     .all() : pour les requêtes SELECT (fecth). Retourne un tableau d'enregistrements(objets)
  //     .get() : pour les requêtes SELECT (fecth). Retourne un objet(1 seul enregistrement)
  const meals = db.prepare('SELECT * FROM meals').all();
  return meals;
}

