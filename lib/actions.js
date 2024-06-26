'use server';

import { redirect } from 'next/navigation'
// import { redirect } from "next/dist/server/api-utils";
import { saveMeal } from "./meals";
import { revalidatePath } from 'next/cache';

// fonction permettant de valider les données du formulaire
function isInvalidText(text) {
  // Ensure text is a string before calling trim()
  return text.trim() === '';
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

    // debogguer les données du formulaire
    console.log('Type of title:', typeof formData.get('title'));
    console.log('Type of summary:', typeof formData.get('summary'));
    console.log('Type of instructions:', typeof formData.get('instructions'));
    console.log('Type of image:', typeof formData.get('image'));
    console.log('Type of creator:', typeof formData.get('name'));
    console.log('Type of creator_email:', typeof formData.get('email'));


    // valider les données du formulaire
    if (
      isInvalidText(meal.title) ||
      isInvalidText(meal.summary) ||
      isInvalidText(meal.instructions) ||
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
    /*
      Note:
          il faut garder a l'esprit que lorsqu'on preparera notre application pour la production, NextJs va mettre en cache les pages et les API routes. ce qui fera en sorte que lorsqu'on ajoutera un repas, on ne verra pas le repas ajoute sur la page des repas. 

          pour resoudre ce probleme, il faudra dire a NextJs de recharger la page des repas apres avoir ajoute un repas. 

          pour ce faire, on utilisera la fonction revalidatePath() de next/cache avant de rediriger l'utilisateur vers la page des repas.
    */
   
    // revalidatePath('/', 'layout');  // revalider toutes les pages de notre application
    // revalidatePath('/meals', 'layout'); // revalider toutes les pages qui ont un rapport avec les repas (meals)
    revalidatePath('/meals')  // revalider uniquement la page des repas

    // rediriger l'utilisateur vers la page des repas. 
    // Attention: ne pas oublier d'importer la fonction redirect de next/navigation
    redirect('/meals');
  }