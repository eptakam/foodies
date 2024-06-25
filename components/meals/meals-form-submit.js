'use client';

import { useFormStatus } from 'react-dom';

export default function MealsFormSubmit() {
  const { pending } = useFormStatus(); 
  /* 
    Note:
        ce hook permet de gérer l'état de la soumission du formulaire et de par exemple changer le texte du bouton de soumission pour indiquer que le formulaire est en cours de soumission

        il a une proproete pending qui permet de savoir si le formulaire est en cours de soumission (true) ou non (false)
  */

  return (
    <button disabled={pending}>
      {pending ? 'Submitting...' : 'Share Meal'}
    </button>
  );

}