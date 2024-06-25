'use server';

import { redirect } from 'next/navigation'
// import { redirect } from "next/dist/server/api-utils";
import { saveMeal } from "./meals";

// fonction permettant de valider les données du formulaire
function isInvalidText(text) {
  return !text.trim() === '';
}

// fonction permettant la soummission du formulaire
  // formData est un objet FormData qui contient les données du formulaire via les attributs name
  export async function shareMeal(prevState, formData) {  
    /*
      Note: 
          il n'est pas possible d'avoir un 'sever action' sur un 'client component'
          c'est pourquoi il faut mettre le code pour le 'server action' dans un fichier .js a part  et par la suite l'importer dans le fichier .js du formulaire.

          cette fonction sera passee a l'attribut action du formulaire

    */

    const meal = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creator: formData.get('name'),
      creator_email: formData.get('email')
    }

    // valider les données du formulaire
    if (
      isInvalidText(meal.title) ||
      isInvalidText(meal.summary) ||
      isInvalidText(meal.instructions) ||
      isInvalidText(meal.image) ||
      isInvalidText(meal.creator) ||
      isInvalidText(meal.creator_email) ||
      !meal.creator_email.includes('@') ||
      !meal.image ||
      meal.image.size === 0
    ) {
      // throw new Error('Invalid form input');

      // on peut aussi retourner un objet serialisable avec un message d'erreur
      // pour se faire, nous aurons besoin du hook useFormState
      return {
        message: 'Invalid form input.'
      };
    }

    await saveMeal(meal);

    // rediriger l'utilisateur vers la page des repas. 
    // Attention: ne pas oublier d'importer la fonction redirect de next/navigation
    redirect('/meals');
  }