'use server';

import { redirect } from 'next/navigation'
// import { redirect } from "next/dist/server/api-utils";
import { saveMeal } from "./meals";

// fonction permettant la soummission du formulaire
  // formData est un objet FormData qui contient les données du formulaire via les attributs name
  export async function shareMeal(formData) {  
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

    await saveMeal(meal);

    // rediriger l'utilisateur vers la page des repas. 
    // Attention: ne pas oublier d'importer la fonction redirect de next/navigation
    redirect('/meals');
  }